const ms = require("parse-ms")
module.exports = {
    commands: ["listpremium"],
    cooldown: 13,
    isSewa: true,
    callback: async ({ m }) => {
        let teks = "\`\`\`「 LIST PREMIUM 」\`\`\`\n\n"
        let data = Object.keys(db.expired[m.botNumber].premium)
        for (let x of data) {
        let cekvip = db.expired[m.botNumber].premium[x].expired == "INFINITY"? "PERMANENT" : `${ms(db.expired[m.botNumber].premium[x].expired - Date.now()).days} days ${ms(db.expired[m.botNumber].premium[x].expired - Date.now()).hours} hours ${ms(db.expired[m.botNumber].premium[x].expired - Date.now()).minutes} minutes ${ms(db.expired[m.botNumber].premium[x].expired - Date.now()).seconds} seconds`
        teks += ` *•* Nomer : @${x.split("@")[0]}\n *•* Date : ${db.expired[m.botNumber].premium[x].date}\n *•* Expired : ${cekvip}\n\n────────────────────────\n\n`
        }
        teks += `\n\n*Total ada : ${data.length}*`
        m.reply(teks)
    }
}