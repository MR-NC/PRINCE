const fs = require("fs")
module.exports = {
    commands: ["liststick"],
    cooldown: 13,
    isSewa: true,
    callback: async ({ m }) => {
        let teks = "┌──⭓「 *LIST STICKER* 」\n│\n"
        let data = fs.readdirSync("./temp").filter((x) => x.includes(".webp")).map((x) => x.split(".webp")[0])
        for (let x of data) {
        teks += `│⭔ ${x}\n`
        }
        teks += `│\n└────────────⭓\n\n*Total ada : ${data.length}*`
        m.reply(teks)
    }
}