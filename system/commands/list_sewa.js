const ms = require("parse-ms")
const moment = require("moment-timezone")
module.exports = {
    commands: ["listsewa"],
    cooldown: 13,
    isSewa: true,
    callback: async ({ sock, m }) => {
        let teks = "\`\`\`「 LIST SEWA 」\`\`\`\n\n"
        let data = Object.keys(db.expired[m.botNumber].sewa)
        for (let x of data) {
        try{
        var groupMetadata = await sock.groupMetadata(x)
        } catch {
        var groupMetadata = { subject: "Tidak diketahui", owner: undefined, creation: 999999999, participants: [{ id: "", admin: null }] }
        }
        if (groupMetadata.participants.filter((x) => x.admin !== null).map((x) => x.id).includes(m.botNumber)) {
        var url = "https://chat.whatsapp.com/" + await sock.groupInviteCode(x)
        } else {
        var url = "Botz Is Not Admin"
        }
        let cekvip = db.expired[m.botNumber].sewa[x].expired == "INFINITY"? "PERMANENT" : `${ms(db.expired[m.botNumber].sewa[x].expired - Date.now()).days} days ${ms(db.expired[m.botNumber].sewa[x].expired - Date.now()).hours} hours ${ms(db.expired[m.botNumber].sewa[x].expired - Date.now()).minutes} minutes ${ms(db.expired[m.botNumber].sewa[x].expired - Date.now()).seconds} seconds`
        teks += ` *•* Name Group : ${groupMetadata.subject}\n *•* Owner : ${groupMetadata.owner !== undefined ? "@" + groupMetadata.owner.split("@")[0] : "Tidak diketahui"}\n *•* Creation : ${moment(groupMetadata.creation * 1000).tz("Asia/Jakarta").format("DD/MM/YYYY HH:mm:ss")}\n *•* Total Members : ${groupMetadata.participants.length}\n *•* Date : ${db.expired[m.botNumber].sewa[x].date}\n *•* Expired : ${cekvip}\n *•* Link : ${url}\n\n────────────────────────\n\n`
        }
        teks += `\n*Total ada : ${data.length}*`
        m.reply(teks)
    }
}