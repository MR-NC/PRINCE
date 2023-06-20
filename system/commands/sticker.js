const axios = require("axios").default
const { ownerNumber, ownerName } = require("@config")
module.exports = {
    commands: ["s","sticker","tostick"],
    cooldown: 13,
    isSewa: true,
    isMedia: {
        isImage: true, 
        isVideo: true, 
        isQuotedMedia: {
		       	  isQuotedImage: true, 
		       	  isQuotedVideo: true
                  }
    }, 
    callback: async ({ sock, m, isQuotedImage, isQuotedVideo, isImage, isVideo }) => {
        if (isImage || isQuotedImage) {
        const media = await sock.downloadMediaMessage(isQuotedImage? m.quoted : m)
        const options = {
            image: `data:image/jpeg;base64,${media.toString("base64")}`,
            stickerMetadata: {
                  pack: m.isPremium? m.senderNumber : ownerNumber,
                  author: m.isPremium? m.pushName : ownerName,
                  keepScale: true,
                  circle: false,
                  removebg: false,
            }
        }
        axios.create({ baseURL: "https://sticker-api-tpe3wet7da-uc.a.run.app" }).post("/prepareWebp", options).then(({ data }) => {
            sock.sendMessage(m.chat, { sticker: Buffer.from(data.webpBase64, "base64") }, { quoted: (m.autoQuoted? m : "") })
        })
        } else if (isVideo || isQuotedVideo) {
        if ((isQuotedVideo? m.quoted.message[m.type].seconds : m.message[m.type].seconds) > 10) return m.reply("Hanya dapat mendownload video sampai 10 detik kak")
        const media = await sock.downloadMediaMessage(isQuotedVideo? m.quoted : m)
        const options = {
            file: `data:video/mp4;base64,${media.toString("base64")}`,
            stickerMetadata: {
                  pack: m.isPremium? m.senderNumber : ownerNumber,
                  author: m.isPremium? m.pushName : ownerName,
                  keepScale: true,
            },
            processOptions: {
                  crop: false,
                  fps: 10,
                  startTime: "00:00:00.0",
                  endTime: "00:00:7.0",
                  loop: 0,
            }
        }
        axios.create({ baseURL: "https://sticker-api-tpe3wet7da-uc.a.run.app" }).post("/convertMp4BufferToWebpDataUrl", options).then(({ data }) => {
            sock.sendMessage(m.chat, { sticker: Buffer.from(data.webpBase64, "base64") }, { quoted: (m.autoQuoted? m : "") })
        })
        }
    }
}