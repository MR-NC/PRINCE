const ms = require("parse-ms")
module.exports = {
    commands: ["listowner"],
    cooldown: 13,
    isSewa: true,
    callback: async ({ m }) => {
        let teks = "\`\`\`「 LIST OWNER 」\`\`\`\n\n"
        let data = [...Object.keys(db.expired[m.botNumber].owner), ...Object.keys(db.expired[m.botNumber].vip)]
        for (let x of data) {
        if (Object.keys(db.expired[m.botNumber].vip).includes(x)) {
        var cekvip = db.expired[m.botNumber].vip[x].expired == "INFINITY"? "PERMANENT" : `${ms(db.expired[m.botNumber].vip[x].expired - Date.now()).days} days ${ms(db.expired[m.botNumber].vip[x].expired - Date.now()).hours} hours ${ms(db.expired[m.botNumber].vip[x].expired - Date.now()).minutes} minutes ${ms(db.expired[m.botNumber].vip[x].expired - Date.now()).seconds} seconds`
        var date = db.expired[m.botNumber].vip[x].date
        } else if (Object.keys(db.expired[m.botNumber].owner).includes(x)) {
        var cekvip = db.expired[m.botNumber].owner[x].expired == "INFINITY"? "PERMANENT" : `${ms(db.expired[m.botNumber].owner[x].expired - Date.now()).days} days ${ms(db.expired[m.botNumber].owner[x].expired - Date.now()).hours} hours ${ms(db.expired[m.botNumber].owner[x].expired - Date.now()).minutes} minutes ${ms(db.expired[m.botNumber].owner[x].expired - Date.now()).seconds} seconds`
        var date = db.expired[m.botNumber].owner[x].date
        }
        teks += ` *•* Nomer : @${x.split("@")[0]}\n *•* Date : ${date}\n *•* Expired : ${cekvip}\n\n────────────────────────\n\n`
        }
        teks += `\n\n*Total ada : ${data.length}*`
        m.reply(teks)
    }
}