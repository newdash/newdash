const p = require("path")
const fs = require("fs")

module.exports = function (babel) {
  const { types: t } = babel

  const isUnitTestFile = (filename = '') => filename.endsWith("test.js") || filename.endsWith("test.ts")

  const functionExpression = (path, { file: { opts: { filename } } }) => {
    // only unit test files
    if (!isUnitTestFile(filename)) {
      return
    }
    // describe("suite", () => { })
    if (path.parent.type == "CallExpression" && path.parent.callee.name == "describe") {
      path.node.params.push(t.identifier("it"))
    }
  }

  return {
    visitor: {

      Program(path, { file: { opts: { filename } } }) {
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

        if (isUnitTestFile(filename)) {
          if (path.node.source.value == "assert") {
            path.node.source.value = "../../../deno/test/assert.ts"
          }
        }

        const dir = p.dirname(filename)
        const mName = path.node.source.value

        if (!mName.startsWith(".")) {
          return // no transform for npm modules
        }

        if (mName.endsWith(".ts") || mName.endsWith(".js")) {
          return // no transform explicit module extension
        }

        const mPath = p.join(`${dir}/`, mName)

        if (fs.existsSync(mPath + ".js")) {
          path.node.source.value = `${path.node.source.value}.js`;
        } else if (fs.existsSync(mPath + ".ts")) {
          path.node.source.value = `${path.node.source.value}.ts`;
        } else {
          console.info(`can not find module '${mName}' from ${filename}, no transform.`)
        }

      },

      ArrowFunctionExpression: functionExpression,
      FunctionExpression: functionExpression,
    }
  };
}
