module.exports = {
    commands: ["afk"],
    cooldown: 13,
    isSewa: true,
    isGroup: true,
    callback: async ({ m }) => {
        db.chats[m.chat].afk_group.push(m.sender)
        m.reply("Afk........") 
    }
}