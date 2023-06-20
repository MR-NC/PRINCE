const fs = require("fs")
const config = require("@config")
module.exports = {
    commands: ["setnamabot"],
    cooldown: 13,
    minArgs: 1,
    expectedArgs: "<teks>",
    example: "{prefix}{command} Gura Botz",
    isSewa: true,
    isVip: true,
    callback: async ({ m }) => {
        if (m.text == config.botName) return m.reply("Nama tersebut sudah di pakai")
        config.botName = m.text
        m.reply(`Success mengganti nama bot ke ${m.text}`)
        setTimeout(() => {
        fs.writeFileSync("./settings.json", JSON.stringify(config, null, 2))
        }, 1000)
        setTimeout(() => {
        process.send("reset")
        }, 2000)
    }
}
