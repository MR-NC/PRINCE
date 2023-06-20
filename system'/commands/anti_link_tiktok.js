module.exports = {
    commands: ["antilinktiktok"],
    cooldown: 13,
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    isBotAdmin: true,
    callback: async ({ m }) => {
        if (m.args[0] == "on" || m.args[0] == "1") {
        if (m.isAntiLinkTiktok == true) return m.reply("Sudah active")
        db.chats[m.chat].antilinktiktok = true
        m.reply("Mode anti link tiktok telah active")
        } else if (m.args[0] == "off" || m.args[0] == "0") {
        if (m.isAntiLinkTiktok == false) return m.reply("Sudah non active")
        db.chats[m.chat].antilinktiktok = false
        m.reply("Mode anti link tiktok telah non active")
        } else {
        m.reply("\`\`\`「 MODE ANTI LINK TIKTOK 」\`\`\`\n\n0. off\n1. on")
        }
    }
}