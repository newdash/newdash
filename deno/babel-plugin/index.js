const p = require("path")
const fs = require("fs")

/**
 *
 * @param {import("@babel/core")} babel
 * @returns {import("@babel/core").Visitor}
 */
module.exports = function (babel) {
  const { types: t } = babel

  const isUnitTestFile = (filename = '') => filename.endsWith("test.js") || filename.endsWith("test.ts")

  const functionExpression = (path, { file: { opts: { filename } } }) => {
    // only unit test files
    if (!isUnitTestFile(filename)) {
      return
    }
    // describe("suite", () => { })
    if (path.parent.type == "CallExpression" && (path.parent.callee.name == "describe" || path.parent.callee.name == "describe2")) {
      path.node.params.push(t.identifier("it"))
    }

    // it('', (done) => {})
    if (path?.parent?.callee?.name == "it" && path.node.params[0]?.name == "done") {
      path.node.params = []
      path.node.body = t.newExpression(t.identifier("Promise"), [t.arrowFunctionExpression([t.identifier("done")], path.node.body)])
    }

  }

  return {
    visitor: {

      /**
       * @param {import("@babel/core").NodePath} path
       */
      Program(path, { file: { opts: { filename } } }) {

        path.addComment('leading', '@ts-nocheck', true)

        if (isUnitTestFile(filename)) {

          path.node.body.unshift(
            t.importDeclaration(
              [
                // t.importSpecifier(t.identifier("it"), t.identifier("it")),
                t.importSpecifier(t.identifier("describe"), t.identifier("describe"))
              ],
              t.stringLiteral("../../../deno/test/describe.ts")
            )
          )


        }
      },

      ImportDeclaration(path, { file: { opts: { filename } } }) {
        const dir = p.dirname(filename)
        const prefix = "../../../deno/test"
        const mName = path.node.source.value
        const mPath = p.join(`${dir}/`, mName)

        if (mName == "assert") {
          path.node.source.value = `${prefix}/assert.ts`
          return
        }
        if (mName == "os") {
          path.node.source.value = `${prefix}/os.ts`
          return
        }

        if (mName == "path") {
          path.node.source.value = `${prefix}/path.ts`
          return
        }

        if (mName == "lodash") {
          path.node.source.value = "../index.ts"
          return // no transform for npm modules
        }

        if (mName.endsWith(".ts") || mName.endsWith(".js")) {
          return // no transform explicit module extension
        }

        if (fs.existsSync(mPath + ".js")) {
          path.node.source.value = `${path.node.source.value}.js`;
        } else if (fs.existsSync(mPath + ".ts")) {
          path.node.source.value = `${path.node.source.value}.ts`;
        } else {
          console.info(`can not find module '${mName}' from ${filename}, no transform.`)
        }

      },

      /**
       * @param {import("@babel/core").NodePath} path
       */
      Identifier(path, { file: { opts: { filename } } }) {
        // add `any` for all un-typed parameters
        if (filename.endsWith(".ts")) {
          // is typescript
          if (path.parent.type == "FunctionDeclaration" || path.parent.type == "ArrowFunctionExpression") {
            if (!path.node.typeAnnotation) {
              path.node.typeAnnotation = t.typeAnnotation(t.anyTypeAnnotation())
            }
          }
        }
        // replace nodejs global '__dirname'
        // only for test
        if (path.node.name == "__dirname") {
          path.replaceWith(t.stringLiteral(filename))
        }
      },

      ArrowFunctionExpression: functionExpression,
      FunctionExpression: functionExpression,
    }
  };
}
