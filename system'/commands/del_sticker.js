const fs = require("fs")
module.exports = {
    commands: ["delstick"],
    cooldown: 13,
    minArgs: 1,
    expectedArgs: "<text>",
    example: "{prefix}{command} oii",
    isSewa: true,
    isOwner: true,
    callback: async ({ m }) => {
        if (!fs.readdirSync("./temp").filter((x) => x.includes(".webp")).map((x) => x.split(".webp")[0]).includes(m.text)) return m.reply("Nama tersebut tidak ada kak")
        fs.unlinkSync(`./temp/${m.text}.webp`)
        await m.reply("Success delete sticker " + m.text)
    }
}