const fs = require("fs")
module.exports = {
    commands: ["listvn"],
    cooldown: 13,
    isSewa: true,
    callback: async ({ m }) => {
        let teks = "┌──⭓「 *LIST VN* 」\n│\n"
        let data = fs.readdirSync("./temp").filter((x) => x.includes(".mp3")).map((x) => x.split(".mp3")[0])
        for (let x of data) {
        teks += `│⭔ ${x}\n`
        }
        teks += `│\n└────────────⭓\n\n*Total ada : ${data.length}*`
        m.reply(teks)
    }
}