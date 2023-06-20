const fs = require("fs")
module.exports = {
    commands: ["addstick"],
    cooldown: 13,
    minArgs: 1,
    expectedArgs: "<text>",
    example: "{prefix}{command} oii",
    isSewa: true,
    isOwner: true,
    isMedia: {
        isQuotedMedia: {
		       	  isQuotedSticker: true
                  }
    }, 
    callback: async ({ sock, m }) => {
        if (fs.readdirSync("./temp").filter((x) => x.includes(".webp")).map((x) => x.split(".webp")[0]).includes(m.text)) return m.reply("Coba pakai nama lain")
        await sock.downloadAndSaveMediaMessage(m.quoted, "./temp/" + m.text)
        await m.reply("Success add sticker " + m.text)
    }
}