const { ownerNumber, logonya } = require("@config")
const { randomNomor } = require("@libs/function")
module.exports = {
    commands: ["setreply"],
    cooldown: 13,
    isSewa: true,
    isOwner: true,
    callback: async ({ sock, m }) => {
        if (m.args[0] == "mess1" || m.args[0] == "1") {
        if (m.replyType == "mess1") return m.reply("Sudah active")
        db.settings[m.botNumber].replytype = "mess1"
        sock.sendMessage(m.chat, { text: "Success mengganti reply ke mess1", contextInfo: { externalAdReply: { showAdAttribution: true, title: `hallo kak👋 ${m.pushName}`, body: "DONT CLICK HERE", previewType: "PHOTO", thumbnailUrl: (logonya.isLogo? logonya.url : "https://raw.githubusercontent.com/Aztecs444/Elaina/Zeck/" + randomNomor(10) + ".jpg"), sourceUrl: "https://wa.me/" + ownerNumber }}}, { quoted: (m.autoQuoted? m : "") })
        } else if (m.args[0] == "mess2" || m.args[0] == "2") {
        if (m.replyType == "mess2") return m.reply("Sudah active")
        db.settings[m.botNumber].replytype = "mess2"
        sock.sendMessage(m.chat, { text: "Success mengganti reply ke mess2", contextInfo: { forwardingScore: 999, isForwarded: true, showAdAttribution: true, externalAdReply: { title: `hallo kak👋 ${m.pushName}`, body: "DONT CLICK HERE", previewType: "PHOTO", thumbnailUrl: (logonya.isLogo? logonya.url : "https://raw.githubusercontent.com/Aztecs444/Elaina/Zeck/" + randomNomor(10) + ".jpg"), sourceUrl: "https://wa.me/" + ownerNumber }}}, { quoted: (m.autoQuoted? m : "") })
        } else if (m.args[0] == "mess3" || m.args[0] == "3") {
        if (m.replyType == "mess3") return m.reply("Sudah active")
        db.settings[m.botNumber].replytype = "mess3"
        sock.sendMessage(m.chat, { text: "Success mengganti reply ke mess3", contextInfo: { forwardingScore: 10, isForwarded: true, externalAdReply: { showAdAttribution: true, title: `hallo kak👋 ${m.pushName}`, body: "DONT CLICK HERE", previewType: "PHOTO", thumbnailUrl: (logonya.isLogo? logonya.url : "https://raw.githubusercontent.com/Aztecs444/Elaina/Zeck/" + randomNomor(10) + ".jpg"), sourceUrl: "https://wa.me/" + ownerNumber }}}, { quoted: (m.autoQuoted? m : "") })
        } else if (m.args[0] == "mess4" || m.args[0] == "4") {
        if (m.replyType == "mess4") return m.reply("Sudah active")
        db.settings[m.botNumber].replytype = "mess4"
        sock.sendMessage(m.chat, { text: "Success mengganti reply ke mess4", contextInfo: { forwardingScore: 999, isForwarded: true }}, { quoted: (m.autoQuoted? m : "") })
        } else if (m.args[0] == "mess5" || m.args[0] == "5") {
        if (m.replyType == "mess5") return m.reply("Sudah active")
        db.settings[m.botNumber].replytype = "mess5"
        sock.sendMessage(m.chat, { text: "Success mengganti reply ke mess5", contextInfo: { forwardingScore: 10, isForwarded: true }}, { quoted: (m.autoQuoted? m : "") })
        } else if (m.args[0] == "mess6" || m.args[0] == "6") {
        if (m.replyType == "mess6") return m.reply("Sudah active")
        db.settings[m.botNumber].replytype = "mess6"
        sock.sendMessage(m.chat, { text: "Success mengganti reply ke mess6" }, { quoted: (m.autoQuoted? m : "") })
        } else {
        m.reply("\`\`\`「 SETTINGS REPLY BOT 」\`\`\`\n\n1. mess1\n2. mess2\n3. mess3\n4. mess4\n5. mess5\n6. mess6")
        }
    }
}