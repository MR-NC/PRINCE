const { ownerNumber, logonya } = require("@config")
const { randomNomor } = require("@libs/function")
module.exports = {
    commands: ["autoquoted"],
    cooldown: 13,
    isSewa: true,
    isOwner: true,
    callback: async ({ m }) => {
        if (m.args[0] == "on" || m.args[0] == "1") {
        if (m.autoQuoted == true) return m.reply("Sudah active")
        db.settings[m.botNumber].autoquoted = true
        if (m.replyType == "mess1") {
        sock.sendMessage(m.chat, { text: "Mode auto quoted telah active", contextInfo: { externalAdReply: { showAdAttribution: true, title: `hallo kak👋 ${m.pushName}`, body: "DONT CLICK HERE", previewType: "PHOTO", thumbnailUrl: (logonya.isLogo? logonya.url : "https://raw.githubusercontent.com/Aztecs444/Elaina/Zeck/" + randomNomor(10) + ".jpg"), sourceUrl: "https://wa.me/" + ownerNumber }}}, { quoted: m })
        } else if (m.replyType == "mess2") {
        sock.sendMessage(m.chat, { text: "Mode auto quoted telah active", contextInfo: { forwardingScore: 999, isForwarded: true, showAdAttribution: true, externalAdReply: { title: `hallo kak👋 ${m.pushName}`, body: "DONT CLICK HERE", previewType: "PHOTO", thumbnailUrl: (logonya.isLogo? logonya.url : "https://raw.githubusercontent.com/Aztecs444/Elaina/Zeck/" + randomNomor(10) + ".jpg"), sourceUrl: "https://wa.me/" + ownerNumber }}}, { quoted: m })
        } else if (m.replyType == "mess3") {
        sock.sendMessage(m.chat, { text: "Mode auto quoted telah active", contextInfo: { forwardingScore: 10, isForwarded: true, externalAdReply: { showAdAttribution: true, title: `hallo kak👋 ${m.pushName}`, body: "DONT CLICK HERE", previewType: "PHOTO", thumbnailUrl: (logonya.isLogo? logonya.url : "https://raw.githubusercontent.com/Aztecs444/Elaina/Zeck/" + randomNomor(10) + ".jpg"), sourceUrl: "https://wa.me/" + ownerNumber }}}, { quoted: m })
        } else if (m.replyType == "mess4") {
        sock.sendMessage(m.chat, { text: "Mode auto quoted telah active", contextInfo: { forwardingScore: 999, isForwarded: true }}, { quoted: m })
        } else if (m.replyType == "mess5") {
        sock.sendMessage(m.chat, { text: "Mode auto quoted telah active", contextInfo: { forwardingScore: 10, isForwarded: true }}, { quoted: m })
        } else if (m.replyType == "mess6") {
        sock.sendMessage(m.chat, { text: "Mode auto quoted telah active" }, { quoted: m })
        }} else if (m.args[0] == "off" || m.args[0] == "0") {
        if (m.autoQuoted == false) return m.reply("Sudah non active")
        db.settings[m.botNumber].autoquoted = false
        if (m.replyType == "mess1") {
        sock.sendMessage(m.chat, { text: "Mode auto quoted telah non active", contextInfo: { externalAdReply: { showAdAttribution: true, title: `hallo kak👋 ${m.pushName}`, body: "DONT CLICK HERE", previewType: "PHOTO", thumbnailUrl: (logonya.isLogo? logonya.url : "https://raw.githubusercontent.com/Aztecs444/Elaina/Zeck/" + randomNomor(10) + ".jpg"), sourceUrl: "https://wa.me/" + ownerNumber }}})
        } else if (m.replyType == "mess2") {
        sock.sendMessage(m.chat, { text: "Mode auto quoted telah non active", contextInfo: { forwardingScore: 999, isForwarded: true, showAdAttribution: true, externalAdReply: { title: `hallo kak👋 ${m.pushName}`, body: "DONT CLICK HERE", previewType: "PHOTO", thumbnailUrl: (logonya.isLogo? logonya.url : "https://raw.githubusercontent.com/Aztecs444/Elaina/Zeck/" + randomNomor(10) + ".jpg"), sourceUrl: "https://wa.me/" + ownerNumber }}})
        } else if (m.replyType == "mess3") {
        sock.sendMessage(m.chat, { text: "Mode auto quoted telah non active", contextInfo: { forwardingScore: 10, isForwarded: true, externalAdReply: { showAdAttribution: true, title: `hallo kak👋 ${m.pushName}`, body: "DONT CLICK HERE", previewType: "PHOTO", thumbnailUrl: (logonya.isLogo? logonya.url : "https://raw.githubusercontent.com/Aztecs444/Elaina/Zeck/" + randomNomor(10) + ".jpg"), sourceUrl: "https://wa.me/" + ownerNumber }}})
        } else if (m.replyType == "mess4") {
        sock.sendMessage(m.chat, { text: "Mode auto quoted telah non active", contextInfo: { forwardingScore: 999, isForwarded: true }})
        } else if (m.replyType == "mess5") {
        sock.sendMessage(m.chat, { text: "Mode auto quoted telah non active", contextInfo: { forwardingScore: 10, isForwarded: true }})
        } else if (m.replyType == "mess6") {
        sock.sendMessage(m.chat, { text: "Mode auto quoted telah non active" })
        }} else {
        m.reply("\`\`\`「 MODE AUTO QUOTED 」\`\`\`\n\n0. off\n1. on")
        }
    }
}
