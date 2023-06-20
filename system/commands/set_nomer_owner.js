const fs = require("fs")
const config = require("@config")
module.exports = {
    commands: ["setnoown"],
    cooldown: 13,
    isSewa: true,
    isVip: true,
    callback: async ({ m }) => {
        if (!m.input) return m.reply("Input nomer")
        if (m.input.startsWith("08")) return m.reply("Gunakan code negara kak")
        if (m.input.split("@")[0] == config.ownerNumber) return m.reply("User tersebut sudah menjadi owner")
        config.ownerNumber = m.input.split("@")[0]
        m.reply(`Success mengganti nomer owner ke ${m.input.split("@")[0]}`)
        setTimeout(() => {
        fs.writeFileSync("./settings.json", JSON.stringify(config, null, 2))
        }, 1000)
        setTimeout(() => {
        process.send("reset")
        }, 2000)
    }
}
