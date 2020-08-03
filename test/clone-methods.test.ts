// @ts-nocheck
import * as assert from 'assert';
import root from '../src/.internal/root';
import camelCase from '../src/camelCase';
import capitalize from '../src/capitalize';
import clone from '../src/clone';
import cloneDeep from '../src/cloneDeep';
import cloneDeepWith from '../src/cloneDeepWith';
import cloneWith from '../src/cloneWith';
import each from '../src/each';
import forOwn from '../src/forOwn';
import isArguments from '../src/isArguments';
import isElement from '../src/isElement';
import isEqual from '../src/isEqual';
import isFunction from '../src/isFunction';
import isObject from '../src/isObject';
import isPlainObject from '../src/isPlainObject';
import last from '../src/last';
import map from '../src/map';
import startsWith from '../src/startsWith';
import times from '../src/times';
import transform from '../src/transform';
import {
  arrayBuffer,
  arrayViews, asyncFunc, body,
  defineProperty,
  document, errors, genFunc,
  getSymbols, isNpm, LARGE_ARRAY_SIZE,
  mapCaches,
  noop, objectProto, realm,
  slice, stubTrue,
  symbol
} from './utils';


describe('clone methods', function () {
  function Foo() {
    this.a = 1;
  }
  Foo.prototype.b = 1;
  Foo.c = function () { };

  if (Map) {
    var iMap = new Map;
    iMap.set('a', 1);
    iMap.set('b', 2);
  }
  if (Set) {
    var set = new Set;
    set.add(1);
    set.add(2);
  }
  const objects = {
    '`arguments` objects': arguments,
    'arrays': ['a', ''],
    'array-like objects': { '0': 'a', 'length': 1 },
    'booleans': false,
    'boolean objects': Object(false),
    'date objects': new Date,
    'Foo instances': new Foo,
    'objects': { 'a': 0, 'b': 1, 'c': 2 },
    'objects with object values': { 'a': /a/, 'b': ['B'], 'c': { 'C': 1 } },
    'objects from another document': realm.object || {},
    'maps': iMap,
    'null values': null,
    'numbers': 0,
    'number objects': Object(0),
    'regexes': /a/gim,
    'sets': set,
    'strings': 'a',
    'string objects': Object('a'),
    'undefined values': undefined
  };

  objects.arrays.length = 3;

  const uncloneable = {
    'DOM elements': body,
    'functions': Foo,
    'async functions': asyncFunc,
    'generator functions': genFunc,
    'the `Proxy` constructor': Proxy
  };

  each(errors, (error) => {
    uncloneable[`${error.name}s`] = error;
  });

  it('`clone` should perform a shallow clone', () => {
    const array = [{ 'a': 0 }, { 'b': 1 }],
      actual = clone(array);

    assert.deepStrictEqual(actual, array);
    assert.ok(actual !== array && actual[0] === array[0]);
  });

  it('`cloneDeep` should deep clone objects with circular references', () => {
    const object = {
      'foo': { 'b': { 'c': { 'd': {} } } },
      'bar': {}
    };

    object.foo.b.c.d = object;
    object.bar.b = object.foo.b;

    const actual = cloneDeep(object);
    assert.ok(actual.bar.b === actual.foo.b && actual === actual.foo.b.c.d && actual !== object);
  });

  it('`cloneDeep` should deep clone objects with lots of circular references', () => {
    const cyclical = {};
    times(LARGE_ARRAY_SIZE + 1, (index) => {
      cyclical[`v${index}`] = [index ? cyclical[`v${index - 1}`] : cyclical];
    });

    const clone = cloneDeep(cyclical),
      actual = clone[`v${LARGE_ARRAY_SIZE}`][0];

    assert.strictEqual(actual, clone[`v${LARGE_ARRAY_SIZE - 1}`]);
    assert.notStrictEqual(actual, cyclical[`v${LARGE_ARRAY_SIZE - 1}`]);
  });

  it('`cloneDeepWith` should provide `stack` to `customizer`', () => {
    let actual;

    cloneDeepWith({ 'a': 1 }, function () {
      actual = last(arguments);
    });

    assert.ok(isNpm
      ? actual.constructor.name == 'Stack'
      : actual instanceof mapCaches.Stack
    );
  });

  each([[clone, 'clone'], [cloneDeep, 'cloneDeep']], ([func, methodName]) => {
    const isDeep = methodName == 'cloneDeep';

    forOwn(objects, (object, kind) => {
      it(`\`${methodName}\` should clone ${kind}`, () => {
        const actual = func(object);
        assert.ok(isEqual(actual, object));

        if (isObject(object)) {
          assert.notStrictEqual(actual, object);
        } else {
          assert.strictEqual(actual, object);
        }
      });
    });

    it(`\`${methodName}\` should clone array buffers`, () => {
      if (typeof ArrayBuffer == 'object') {
        const actual = func(arrayBuffer);
        assert.strictEqual(actual.byteLength, arrayBuffer.byteLength);
        assert.notStrictEqual(actual, arrayBuffer);
      }
    });

    it(`\`${methodName}\` should clone buffers`, () => {
      if (typeof Buffer == 'object') {
        const buffer = Buffer.from([1, 2]),
          actual = func(buffer);

        assert.strictEqual(actual.byteLength, buffer.byteLength);
        assert.strictEqual(actual.inspect(), buffer.inspect());
        assert.notStrictEqual(actual, buffer);

        buffer[0] = 2;
        assert.strictEqual(actual[0], isDeep ? 2 : 1);
      }
    });

    it(`\`${methodName}\` should clone \`index\` and \`input\` array properties`, () => {
      const array = /c/.exec('abcde'),
        actual = func(array);

      assert.strictEqual(actual.index, 2);
      assert.strictEqual(actual.input, 'abcde');
    });

    it(`\`${methodName}\` should clone \`lastIndex\` regexp property`, () => {
      const regexp = /c/g;
      regexp.exec('abcde');

      assert.strictEqual(func(regexp).lastIndex, 3);
    });

    it(`\`${methodName}\` should clone expando properties`, () => {
      const values = map([false, true, 1, 'a'], (value) => {
        const object = Object(value);
        object.a = 1;
        return object;
      });

      const expected = map(values, stubTrue);

      const actual = map(values, (value) => func(value).a === 1);

      assert.deepStrictEqual(actual, expected);
    });

    it(`\`${methodName}\` should clone prototype objects`, () => {
      const actual = func(Foo.prototype);

      assert.ok(!(actual instanceof Foo));
      assert.deepStrictEqual(actual, { 'b': 1 });
    });

    it(`\`${methodName}\` should set the \`[[Prototype]]\` of a clone`, () => {
      assert.ok(func(new Foo) instanceof Foo);
    });

    it(`\`${methodName}\` should set the \`[[Prototype]]\` of a clone even when the \`constructor\` is incorrect`, () => {
      Foo.prototype.constructor = Object;
      assert.ok(func(new Foo) instanceof Foo);
      Foo.prototype.constructor = Foo;
    });

    it(`\`${methodName}\` should ensure \`value\` constructor is a function before using its \`[[Prototype]]\``, () => {
      Foo.prototype.constructor = null;
      assert.ok(!(func(new Foo) instanceof Foo));
      Foo.prototype.constructor = Foo;
    });

    it(`\`${methodName}\` should clone properties that shadow those on \`Object.prototype\``, () => {
      const object = {
        'constructor': objectProto.constructor,
        'hasOwnProperty': objectProto.hasOwnProperty,
        'isPrototypeOf': objectProto.isPrototypeOf,
        'propertyIsEnumerable': objectProto.propertyIsEnumerable,
        'toLocaleString': objectProto.toLocaleString,
        'toString': objectProto.toString,
        'valueOf': objectProto.valueOf
      };

      const actual = func(object);

      assert.deepStrictEqual(actual, object);
      assert.notStrictEqual(actual, object);
    });

    it(`\`${methodName}\` should clone symbol properties`, () => {
      function Foo() {
        this[symbol] = { 'c': 1 };
      }

      if (Symbol) {
        const symbol2 = Symbol('b');
        Foo.prototype[symbol2] = 2;

        const symbol3 = Symbol('c');
        defineProperty(Foo.prototype, symbol3, {
          'configurable': true,
          'enumerable': false,
          'writable': true,
          'value': 3
        });

        const object = { 'a': { 'b': new Foo } };
        object[symbol] = { 'b': 1 };

        const actual = func(object);
        if (isDeep) {
          assert.notStrictEqual(actual[symbol], object[symbol]);
          assert.notStrictEqual(actual.a, object.a);
        } else {
          assert.strictEqual(actual[symbol], object[symbol]);
          assert.strictEqual(actual.a, object.a);
        }
        assert.deepStrictEqual(actual[symbol], object[symbol]);
        assert.deepStrictEqual(getSymbols(actual.a.b), [symbol]);
        assert.deepStrictEqual(actual.a.b[symbol], object.a.b[symbol]);
        assert.deepStrictEqual(actual.a.b[symbol2], object.a.b[symbol2]);
        assert.deepStrictEqual(actual.a.b[symbol3], object.a.b[symbol3]);
      }
    });

    it(`\`${methodName}\` should clone symbol objects`, () => {
      if (Symbol) {
        assert.strictEqual(func(symbol), symbol);

        const object = Object(symbol),
          actual = func(object);

        assert.strictEqual(typeof actual, 'object');
        assert.strictEqual(typeof actual.valueOf(), 'symbol');
        assert.notStrictEqual(actual, object);
      }
    });

    it(`\`${methodName}\` should not clone symbol primitives`, () => {
      if (Symbol) {
        assert.strictEqual(func(symbol), symbol);
      }
    });

    it(`\`${methodName}\` should not error on DOM elements`, () => {
      if (document) {
        const element = document.createElement('div');

        try {
          assert.deepStrictEqual(func(element), {});
        } catch (e) {
          assert.ok(false, e.message);
        }
      }
    });

    it(`\`${methodName}\` should create an object from the same realm as \`value\``, () => {
      const props = [];

      const objects = transform(_, (result, value, key) => {
        if (startsWith(key, '_') && isObject(value) &&
          !isArguments(value) && !isElement(value) &&
          !isFunction(value)) {
          props.push(capitalize(camelCase(key)));
          result.push(value);
        }
      }, []);

      const expected = map(objects, stubTrue);

      const actual = map(objects, (object) => {
        const Ctor = object.constructor,
          result = func(object);

        return result !== object && ((result instanceof Ctor) || !(new Ctor instanceof Ctor));
      });

      assert.deepStrictEqual(actual, expected, props.join(', '));
    });

    it(`\`${methodName}\` should perform a ${isDeep ? 'deep' : 'shallow'} clone when used as an iteratee for methods like \`map\``, () => {
      const expected = [{ 'a': [0] }, { 'b': [1] }],
        actual = map(expected, func);

      assert.deepStrictEqual(actual, expected);

      if (isDeep) {
        assert.ok(actual[0] !== expected[0] && actual[0].a !== expected[0].a && actual[1].b !== expected[1].b);
      } else {
        assert.ok(actual[0] !== expected[0] && actual[0].a === expected[0].a && actual[1].b === expected[1].b);
      }
    });


    each(arrayViews, (type) => {
      it(`\`${methodName}\` should clone ${type} values`, () => {
        const Ctor = root[type];

        times(2, (index) => {
          if (Ctor) {
            const buffer = new ArrayBuffer(24),
              view = index ? new Ctor(buffer, 8, 1) : new Ctor(buffer),
              actual = func(view);

            assert.deepStrictEqual(actual, view);
            assert.notStrictEqual(actual, view);
            assert.strictEqual(actual.buffer === view.buffer, !isDeep);
            assert.strictEqual(actual.byteOffset, view.byteOffset);
            assert.strictEqual(actual.length, view.length);
          }
        });
      });
    });

    forOwn(uncloneable, (value, key) => {
      it(`\`${methodName}\` should not clone ${key}`, () => {
        if (value) {
          const object = { 'a': value, 'b': { 'c': value } },
            actual = func(object),
            expected = value === Foo ? { 'c': Foo.c } : {};

          assert.deepStrictEqual(actual, object);
          assert.notStrictEqual(actual, object);
          assert.deepStrictEqual(func(value), expected);
        }
      });
    });
  });

  each([[cloneWith, 'cloneWith'], [cloneDeepWith, 'cloneDeepWith']], ([func, methodName]) => {
    const isDeep = methodName == 'cloneDeepWith';

    it(`\`${methodName}\` should provide correct \`customizer\` arguments`, () => {
      const argsList = [],
        object = new Foo;

      func(object, function () {
        const length = arguments.length,
          args = slice.call(arguments, 0, length - (length > 1 ? 1 : 0));

        argsList.push(args);
      });

      assert.deepStrictEqual(argsList, isDeep ? [[object], [1, 'a', object]] : [[object]]);
    });

    it(`\`${methodName}\` should handle cloning when \`customizer\` returns \`undefined\``, () => {
      const actual = func({ 'a': { 'b': 'c' } }, noop);
      assert.deepStrictEqual(actual, { 'a': { 'b': 'c' } });
    });

    forOwn(uncloneable, (value, key) => {
      it(`\`${methodName}\` should work with a \`customizer\` callback and ${key}`, () => {
        const customizer = function (value) {
          return isPlainObject(value) ? undefined : value;
        };

        let actual = func(value, customizer);
        assert.strictEqual(actual, value);

        const object = { 'a': value, 'b': { 'c': value } };
        actual = func(object, customizer);

        assert.deepStrictEqual(actual, object);
        assert.notStrictEqual(actual, object);
      });
    });
  });
});
