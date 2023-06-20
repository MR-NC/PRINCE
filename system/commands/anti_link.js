module.exports = {
    commands: ["antilink"],
    cooldown: 13,
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    isBotAdmin: true,
    callback: async ({ m }) => {
        if (m.args[0] == "on" || m.args[0] == "1") {
        if (m.isAntiLink == true) return m.reply("Sudah active")
        db.chats[m.chat].antilink = true
        m.reply("Mode anti link telah active")
        } else if (m.args[0] == "off" || m.args[0] == "0") {
        if (m.isAntiLink == false) return m.reply("Sudah non active")
        db.chats[m.chat].antilink = false
        m.reply("Mode anti link telah non active")
        } else {
        m.reply("\`\`\`「 MODE ANTI LINK 」\`\`\`\n\n0. off\n1. on")
        }
    }
}