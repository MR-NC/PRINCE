require("module-alias/register")
const chalk = require("chalk")
const fs = require("fs") 
const path = require("path")
const i18n = require("i18n")

i18n.configure({
    locales: ["mess"],
    defaultLocale: "mess",
    autoReload: true,
    directory: path.join(__dirname, "config", "locales"),
    objectNotation: true,
})

const { connectToWhatsApp } = require("./system/connect")


connectToWhatsApp()

process.on("uncaughtException", function (err) {
    let e = String(err)
    if (e.includes("this.isZero")) return
    if (e.includes("rate-overlimit")) return
    if (e.includes("Connection Closed")) return
    if (e.includes("Timed Out")) return
    if (e.includes("Value not found")) return
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ ERROR ]"), `${err}`)
})



let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
    delete require.cache[file]
    process.send("reset")
})