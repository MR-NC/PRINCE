module.exports = {
    commands: ["antidelete"],
    cooldown: 13,
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    callback: async ({ m }) => {
        if (m.args[0] == "on" || m.args[0] == "1") {
        if (m.isAntiDelete == true) return m.reply("Sudah active")
        db.chats[m.chat].antidelete = true
        m.reply("Mode anti delete telah active")
        } else if (m.args[0] == "off" || m.args[0] == "0") {
        if (m.isAntiDelete == false) return m.reply("Sudah non active")
        db.chats[m.chat].antidelete = false
        m.reply("Mode anti delete telah non active")
        } else {
        m.reply("\`\`\`「 MODE ANTI DELETE 」\`\`\`\n\n0. off\n1. on")
        }
    }
}