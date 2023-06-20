module.exports = {
    commands: ["antilinkfb"],
    cooldown: 13,
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    isBotAdmin: true,
    callback: async ({ m }) => {
        if (m.args[0] == "on" || m.args[0] == "1") {
        if (m.isAntiLinkFacebook == true) return m.reply("Sudah active")
        db.chats[m.chat].antilinkfb = true
        m.reply("Mode anti link facebook telah active")
        } else if (m.args[0] == "off" || m.args[0] == "0") {
        if (m.isAntiLinkFacebook == false) return m.reply("Sudah non active")
        db.chats[m.chat].antilinkfb = false
        m.reply("Mode anti link facebook telah non active")
        } else {
        m.reply("\`\`\`「 MODE ANTI LINK FACEBOOK 」\`\`\`\n\n0. off\n1. on")
        }
    }
}