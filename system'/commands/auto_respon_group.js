module.exports = {
    commands: ["autorespongc"],
    cooldown: 13,
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    callback: async ({ m }) => {
        if (m.args[0] == "on" || m.args[0] == "1") {
        if (m.isAutoResponGroup == true) return m.reply("Sudah active")
        db.chats[m.chat].autorespongc = true
        m.reply("Mode auto respon group telah active")
        } else if (m.args[0] == "off" || m.args[0] == "0") {
        if (m.isAutoResponGroup == false) return m.reply("Sudah non active")
        db.chats[m.chat].autorespongc = false
        m.reply("Mode auto respon group telah non active")
        } else {
        m.reply("\`\`\`「 MODE AUTO RESPON GROUP 」\`\`\`\n\n0. off\n1. on")
        }
    }
}