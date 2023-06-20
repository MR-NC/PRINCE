const { ownerNumber, logonya } = require("@config")
const { randomNomor } = require("@libs/function")
module.exports = {
    commands: ["hidetag"],
    cooldown: 13,
    minArgs: 1,
    expectedArgs: "<teks>",
    example: "{prefix}{command} Paok",
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    callback: async ({ sock, m, groupMembers }) => {
        if (m.replyType == "mess1") {
        sock.sendMessage(m.chat, { text: m.text, contextInfo: { mentionedJid: groupMembers, externalAdReply: { showAdAttribution: true, title: `hallo kak👋 ${m.pushName}`, body: "DONT CLICK HERE", previewType: "PHOTO", thumbnailUrl: (logonya.isLogo? logonya.url : "https://raw.githubusercontent.com/Aztecs444/Elaina/Zeck/" + randomNomor(10) + ".jpg"), sourceUrl: "https://wa.me/" + ownerNumber }}}, { quoted: (m.autoQuoted? m : "") })
        } else if (m.replyType == "mess2") {
        sock.sendMessage(m.chat, { text: m.text, contextInfo: { mentionedJid: groupMembers, forwardingScore: 999, isForwarded: true, showAdAttribution: true, externalAdReply: { title: `hallo kak👋 ${m.pushName}`, body: "DONT CLICK HERE", previewType: "PHOTO", thumbnailUrl: (logonya.isLogo? logonya.url : "https://raw.githubusercontent.com/Aztecs444/Elaina/Zeck/" + randomNomor(10) + ".jpg"), sourceUrl: "https://wa.me/" + ownerNumber }}}, { quoted: (m.autoQuoted? m : "") })
        } else if (m.replyType == "mess3") {
        sock.sendMessage(m.chat, { text: m.text, contextInfo: { mentionedJid: groupMembers, forwardingScore: 10, isForwarded: true, externalAdReply: { showAdAttribution: true, title: `hallo kak👋 ${m.pushName}`, body: "DONT CLICK HERE", previewType: "PHOTO", thumbnailUrl: (logonya.isLogo? logonya.url : "https://raw.githubusercontent.com/Aztecs444/Elaina/Zeck/" + randomNomor(10) + ".jpg"), sourceUrl: "https://wa.me/" + ownerNumber }}}, { quoted: (m.autoQuoted? m : "") })
        } else if (m.replyType == "mess4") {
        sock.sendMessage(m.chat, { text: m.text, contextInfo: { mentionedJid: groupMembers, forwardingScore: 999, isForwarded: true }}, { quoted: (m.autoQuoted? m : "") })
        } else if (m.replyType == "mess5") {
        sock.sendMessage(m.chat, { text: m.text, contextInfo: { mentionedJid: groupMembers, forwardingScore: 10, isForwarded: true }}, { quoted: (m.autoQuoted? m : "") })
        } else if (m.replyType == "mess6") {
        sock.sendMessage(m.chat, { text: m.text, mentions: groupMembers }, { quoted: (m.autoQuoted? m : "") })
        }
    }
}