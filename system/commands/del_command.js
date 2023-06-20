module.exports = {
    commands: ["delcmd"],
    cooldown: 13,
    isSewa: true,
    isOwner: true,
    isMedia: {
        isQuotedMedia: {
		       	  isQuotedSticker: true
                  }
    }, 
    callback: async ({ m }) => {
        const fileSha256 = m.quoted.message.stickerMessage.fileSha256.toString("base64")
        if (!Object.keys(db.listcmd).includes(fileSha256)) return m.reply("Sticker not found!")
        delete db.listcmd[fileSha256] 
        await m.reply("Success delete command")
    }
}