const store = require("@store")
const { getContentType } = require("baileys")
const { sleep } = require("@libs/function")
module.exports = {
    commands: ["bcpc"],
    cooldown: 13,
    isSewa: true,
    isOwner: true,
    callback: async ({ sock, m, isImage, isVideo, isViewOnce, isDocument, isAllMedia, isQuotedAllMedia, isQuotedDocument, isQuotedLocation, isQuotedViewOnce, isQuotedImage, isQuotedSticker, isQuotedVideo, isQuotedAudio, isQuotedContact }) => {
        const data = Object.keys(store).includes(m.botNumber)? store[m.botNumber].chats.filter((x) => x.includes("@s.whatsapp.net")) : []
        if (isImage || isQuotedImage) {
        let teks = m.text? "\`\`\`「  BROADCAST MESSAGE  」\`\`\`\n\n" + m.text : "\`\`\`「  BROADCAST MESSAGE  」\`\`\`"
        const media = await sock.downloadMediaMessage(isQuotedImage? m.quoted : m)
        for (let x of data) {        
        await sock.sendMessage(x, { contextInfo: { forwardingScore: 10, isForwarded: true }, image: media, caption: teks })
        await sleep(2000)
        } 
        } else if (isVideo || isQuotedVideo) {
        const teks = m.text? "\`\`\`「  BROADCAST MESSAGE  」\`\`\`\n\n" + m.text : "\`\`\`「  BROADCAST MESSAGE  」\`\`\`"
        const media = await sock.downloadMediaMessage(isQuotedVideo? m.quoted : m)
        for (let x of data) {
        await sock.sendMessage(x, { contextInfo: { forwardingScore: 10, isForwarded: true }, video: media, caption: teks })
        await sleep(2000)
        }
        } else if (isViewOnce || isQuotedViewOnce) {
        const teks = m.text? "\`\`\`「  BROADCAST MESSAGE  」\`\`\`\n\n" + m.text : "\`\`\`「  BROADCAST MESSAGE  」\`\`\`"
        const media = await sock.downloadMediaMessage(isQuotedViewOnce? m.quoted : m)
        for (let x of data) {
        if (getContentType(m.message) == "videoMessage") {
        await sock.sendMessage(x, { contextInfo: { forwardingScore: 10, isForwarded: true }, video: media, caption: teks, viewOnce: true })
        await sleep(2000)
        } else if (getContentType(m.message) == "imageMessage") {
        await sock.sendMessage(x, { contextInfo: { forwardingScore: 10, isForwarded: true }, image: media, caption: teks, viewOnce: true })
        await sleep(2000)
        }}
        } else if (isDocument || isQuotedDocument) {
        const teks = m.text? "\`\`\`「  BROADCAST MESSAGE  」\`\`\`\n\n" + m.text : "\`\`\`「  BROADCAST MESSAGE  」\`\`\`"
        const media = await sock.downloadMediaMessage(isQuotedDocument? m.quoted : m)
        const fileName = isQuotedDocument? m.quoted.message["documentMessage"].fileName : m.message["documentMessage"].fileName
        for (let x of data) {
        await sock.sendMessage(x, { contextInfo: { forwardingScore: 10, isForwarded: true }, document: media, mimetype: "application/bin", fileName }) 
        await sleep(2000)              
        }
        } else if (isQuotedSticker || isQuotedAudio || isQuotedContact || isQuotedLocation) {
        for (let x of data) {
        await sock.copyNForward(x, m.quoted)
        await sleep(2000)
        }
        } else if (!isAllMedia && !isQuotedAllMedia) {
        if (!m.text) return m.reply("Text?")
        let teks = "\`\`\`「  BROADCAST MESSAGE  」\`\`\`\n\n" + m.text
        for (let x of data) {
        await sock.sendMessage(x, { contextInfo: { forwardingScore: 10, isForwarded: true }, text: teks })
        await sleep(2000)
        }
        }
        m.reply(`Success send broadcast message to ${data.length} chats`)
    }
}