const fs = require("fs").promises;
const path = require("path");


(async () => {
  let content = ''
  const files = await fs.readdir(path.join(__dirname, "../src"))
  const names = []
  files.forEach(file => {
    if (file.startsWith(".")) {
      return
    }
    if (file == "test") {
      return
    }
    const name = file.substr(0, file.length - 3)
    names.push(name)
    content += `import ${name} from './${file}';\n`

  })
  content += `export {\n${names.join(",\n")}\n}; \n`

  await fs.writeFile(path.join(__dirname, "../src/index.js"), content)
})()


