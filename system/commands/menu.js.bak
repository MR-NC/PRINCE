const { ownerNumber, botName, logonya, thumbnailDok, thumbnailVid } = require("@config")
const { menu, fitur } = require("@message/helps")
const { pickRandom, randomNomor, getBuffer } = require("@libs/function")
const fs = require("fs")
module.exports = {
    commands: ["menu"],
    cooldown: 13,
    isSewa: true,
    callback: async ({ sock, m, prefix, thePrefix }) => {
        const menunya = menu(m, thePrefix)
        const fiturnya = fitur(prefix)
        const thumbnail = await getBuffer(logonya.isLogo? logonya.url : "https://raw.githubusercontent.com/Aztecs444/Elaina/Zeck/" + randomNomor(10) + ".jpg")
        let options = {
        externalAdReply: {
        showAdAttribution: true,
        title: `hallo kak👋 ${m.pushName}`,
        body: "DONT CLICK HERE",
        mediaType: 1,
        renderLargerThumbnail: m.setMenu == "document" || m.setMenu == "context"? true : false,
        thumbnail,
        sourceUrl: `https://wa.me/${ownerNumber}`,
        }}
        if (m.setMenu == "document") {
        const thumbnaildoc = await getBuffer(thumbnailDok.url)
        const docType = pickRandom(["pptx","xlsx","zip","pdf","docx"])
        if (docType == "pptx") {
        var AppType = "application/vnd.openxmlformats-officedocument.presentationml.presentation"
        } else if (docType == "xlsx") {
        var AppType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        } else if (docType == "zip") {
        var AppType = "application/zip"
        } else if (docType == "pdf") {
        var AppType = "application/pdf"
        } else if (docType == "docx") {
        var AppType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        } 
        sock.sendMessage(m.chat, { contextInfo: options, document: fs.readFileSync("./temp/Zzzzzzzzzz@4.0.4"), mimetype: AppType, title : "Footer text", fileLength : 999999999999, pageCount: 100, fileName : botName, caption: menunya + "\n" + fiturnya, headerType: "DOCUMENT", jpegThumbnail: thumbnaildoc }, { quoted: (m.autoQuoted? m : "") })
        } else if (m.setMenu == "context") {
        sock.sendMessage(m.chat, { text: menunya + "\n" + fiturnya, contextInfo: options }, { quoted: setQuoted })
        } else if (m.setMenu == "viewonce") {
        sock.sendMessage(m.chat, { image: thumbnail, caption: menunya + "\n" + fiturnya, viewOnce: true, contextInfo: options }, { quoted: (m.autoQuoted? m : "") })
        } else if (m.setMenu == "image") {
        sock.sendMessage(m.chat, { image: thumbnail, caption: menunya + "\n" + fiturnya, contextInfo: options }, { quoted: (m.autoQuoted? m : "") })
        } else if (m.setMenu == "gif") {
        const buffer = await getBuffer(thumbnailVid.url)
        sock.sendMessage(m.chat, { video: buffer, contextInfo: options, jpegThumbnail: thumbnail, caption: menunya + "\n" + fiturnya, gifPlayback: true }, { quoted: (m.autoQuoted? m : "") })
        } else if (m.setMenu == "video") {
        const buffer = await getBuffer(thumbnailVid.url)
        sock.sendMessage(m.chat, { video: buffer, contextInfo: options, jpegThumbnail: thumbnail, caption: menunya + "\n" + fiturnya, gifPlayback: false }, { quoted: (m.autoQuoted? m : "") })
        }
    }
}