module.exports = {
    commands: ["mute"],
    cooldown: 13,
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    callback: async ({ m }) => {
        if (m.isBanChat) return m.reply("Sudah active")
        db.chats[m.chat].banchat = true
        m.reply("Success mute group")
    }
}