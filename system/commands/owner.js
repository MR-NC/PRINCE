const { ownerNumber } = require("@config")
module.exports = {
    commands: ["owner"],
    cooldown: 13,        
    callback: async ({ sock, m }) => {
        if (m.isOwner) {
        sock.sendKontak(m.chat, [ownerNumber + "@s.whatsapp.net", ...Object.keys(db.expired[m.botNumber].owner), ...Object.keys(db.expired[m.botNumber].vip)], m.autoQuoted? m : "") 
        } else sock.sendKontak(m.chat, [ownerNumber + "@s.whatsapp.net", ...Object.keys(db.expired[m.botNumber].vip)], m.autoQuoted? m : "")
    }
}