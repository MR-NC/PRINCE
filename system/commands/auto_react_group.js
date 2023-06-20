module.exports = {
    commands: ["autoreactgc"],
    cooldown: 13,
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    callback: async ({ m }) => {
        if (m.args[0] == "on" || m.args[0] == "1") {
        if (m.isAutoReactGroup == true) return m.reply("Sudah active")
        db.chats[m.chat].autoreactgc = true
        m.reply("Mode auto react group telah active")
        } else if (m.args[0] == "off" || m.args[0] == "0") {
        if (m.isAutoReactGroup == false) return m.reply("Sudah non active")
        db.chats[m.chat].autoreactgc = false
        m.reply("Mode auto react group telah non active")
        } else {
        m.reply("\`\`\`「 MODE AUTO REACT GROUP 」\`\`\`\n\n0. off\n1. on")
        }
    }
}