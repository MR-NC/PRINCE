const fs = require("fs")
const { basename } = require("path")
module.exports = {
    commands: ["getfitur"],
    cooldown: 13,
    isSewa: true,
    isVip: true,
    callback: async ({ sock, m }) => {
        if (!Object.keys(db.allcommand).includes(m.text)) return m.reply("Commands not found!")
        if (db.allcommand[m.text].tempFile !== "case") {
        sock.sendMessage(m.chat, { document: fs.readFileSync(db.allcommand[m.text].tempFile), mimetype: "application/bin", fileName: basename(db.allcommand[m.text].tempFile) }, { quoted: (m.autoQuoted? m : "") })
        } else {
        m.reply("case " + `"${m.text}"` + fs.readFileSync("./message/msg.js").toString().split("case \"" + m.text + "\"")[1].split("break")[0] + "break") 
        }
    }
}
