const fs = require("fs")
const chalk = require("chalk") 
const data = JSON.parse(fs.readFileSync("./store/store.json"))
const store = {
    ...(data)
}

module.exports = store


let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
    delete require.cache[file]
    process.send("reset")
})