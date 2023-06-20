const fs = require("fs")
const config = require("@config")
module.exports = {
    commands: ["setnamaown"],
    cooldown: 13,
    minArgs: 1,
    expectedArgs: "<teks>",
    example: "{prefix}{command} Jasen",
    isSewa: true,
    isVip: true,
    callback: async ({ m }) => {
        if (m.text == config.ownerName) return m.reply("Nama tersebut sudah di pakai")
        config.ownerName = m.text
        m.reply(`Success mengganti nama owner ke ${m.text}`)
        setTimeout(() => {
        fs.writeFileSync("./settings.json", JSON.stringify(config, null, 2))
        }, 1000)
        setTimeout(() => {
        process.send("reset")
        }, 2000)
    }
}
