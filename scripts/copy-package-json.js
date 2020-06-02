// run with native nodejs > 10
// make sure the building job has been run

const { writeFile, copyFile } = require("fs").promises;
const path = require("path");
const distributions = ["es5", "node", "es6", "dist"];
// TODO: add deno distribution


if (require.main == module) {

  (
    async () => {

      const packageJson = require("../package.json")

      delete packageJson.jest
      delete packageJson.scripts
      delete packageJson.devDependencies
      delete packageJson.engines
      delete packageJson.unpkg

      for (let i = 0; i < distributions.length; i++) {

        const directory = distributions[i];
        const libPackageJson = Object.assign({}, packageJson) // clone

        if (directory == "dist") {
          libPackageJson.name = `${libPackageJson.name}-umd`
          libPackageJson.main = libPackageJson.unpkg = "./newdash.js"
        } else {
          libPackageJson.name = `${libPackageJson.name}-${directory}`
          libPackageJson.main = "./index"
        }

        await writeFile(path.join(__dirname, "..", directory, "package.json"), JSON.stringify(libPackageJson, undefined, 2))
        await copyFile(path.join(__dirname, "../LICENSE"), path.join(__dirname, "..", directory, "LICENSE"))
        await copyFile(path.join(__dirname, "../README.md"), path.join(__dirname, "..", directory, "README.md"))

      }


    }
  )();

}
