const fs = require("fs")
const util = require("util") 
const { generateProfilePicture } = require("@libs/function")
const i18n = require("i18n")
module.exports = {
    commands: ["setpp"],
    cooldown: 13,
    isSewa: true,
    isOwner: true,
    isMedia: {
        isQuotedMedia: {
		       	  isQuotedImage: true
                  }
    }, 
    callback: async ({ sock, m, isQuotedImage, isImage }) => {
        if (isImage && m.args[0] == "full" || isImage && m.args[0] == "/full" || isQuotedImage && m.args[0] == "full" || isQuotedImage && m.args[0] == "/full") {
        const media = await sock.downloadMediaMessage(isQuotedImage? m.quoted : m)
        const { img } = await generateProfilePicture(media)
        await sock.query({ tag: "iq", attrs: { to: m.botNumber, type: "set", xmlns: "w:profile:picture" }, content: [{ tag: "picture", attrs: { type: "image" }, content: img }]})
        m.reply(util.format(i18n.__("success")))
        } else if (isImage || isQuotedImage) {
        const media = await sock.downloadMediaMessage(isQuotedImage? m.quoted : m)
        await sock.updateProfilePicture(m.botNumber, media)
        m.reply(util.format(i18n.__("success")))
        }
    }
}
