module.exports = {
    commands: ["antispam"],
    cooldown: 13,
    isSewa: true,
    isOwner: true,
    callback: async ({ m }) => {
        if (m.args[0] == "on" || m.args[0] == "1") {
        if (m.antiSpam == true) return m.reply("Sudah active")
        db.settings[m.botNumber].antispam = true
        m.reply("Mode anti spam telah active")
        } else if (m.args[0] == "off" || m.args[0] == "0") {
        if (m.antiSpam == false) return m.reply("Sudah non active")
        db.settings[m.botNumber].antispam = false
        m.reply("Mode anti spam telah non active")
        } else {
        m.reply("\`\`\`「 MODE ANTI SPAM 」\`\`\`\n\n0. off\n1. on")
        }
    }
}
