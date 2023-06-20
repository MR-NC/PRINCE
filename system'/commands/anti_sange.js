module.exports = {
    commands: ["antisange"],
    cooldown: 13,
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    isBotAdmin: true,
    callback: async ({ m }) => {
        if (m.args[0] == "on" || m.args[0] == "1") {
        if (m.isAntiSange == true) return m.reply("Sudah active")
        db.chats[m.chat].antisange = true
        m.reply("Mode anti sange telah active")
        } else if (m.args[0] == "off" || m.args[0] == "0") {
        if (m.isAntiSange == false) return m.reply("Sudah non active")
        db.chats[m.chat].antisange = false
        m.reply("Mode anti sange telah non active")
        } else {
        m.reply("\`\`\`「 MODE ANTI SANGE 」\`\`\`\n\n0. off\n1. on")
        }
    }
}