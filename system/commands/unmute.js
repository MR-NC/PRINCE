module.exports = {
    commands: ["unmute"],
    cooldown: 13,
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    callback: async ({ m }) => {
        if (!m.isBanChat) return m.reply("Sudah non active")
        db.chats[m.chat].banchat = false
        m.reply("Success unmute group")
    }
}