const fs = require("fs")
const chalk = require("chalk") 
const data = JSON.parse(fs.readFileSync("./settings.json"))

const options = {
    ...(data)
}

module.exports = data



let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
    delete require.cache[file]
    process.send("reset")
})