const store = require("@store")
module.exports = {
    commands: ["listpc"],
    cooldown: 13,
    isSewa: true,
    callback: async ({ m }) => {
        let data = Object.keys(store).includes(m.botNumber)? store[m.botNumber].chats.filter((x) => x.includes("@s.whatsapp.net")) : []
        let teks = "\`\`\`「 LIST PERSONAL CHAT 」\`\`\`\n\n"
        for (let x of data) {
        let name = Object.keys(db.users).includes(x)? db.users[x].name : x.split("@")[0]
        teks += ` *•* Nama : ${name}\n *•* User : @${x.split("@")[0]}\n *•* Chat : https://wa.me/${x.split("@")[0]}\n\n────────────────────────\n\n`
        }
        teks += `\n\n*Total ada : ${data.length}*`
        m.reply(teks)
    }
}
