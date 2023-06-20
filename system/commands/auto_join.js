module.exports = {
    commands: ["autojoin"],
    cooldown: 13,
    isSewa: true,
    isOwner: true,
    callback: async ({ m }) => {
        if (m.args[0] == "on" || m.args[0] == "1") {
        if (m.autoJoin == true) return m.reply("Sudah active")
        db.settings[m.botNumber].autojoin = true
        m.reply("Mode auto join telah active")
        } else if (m.args[0] == "off" || m.args[0] == "0") {
        if (m.autoJoin == false) return m.reply("Sudah non active")
        db.settings[m.botNumber].autojoin = false
        m.reply("Mode auto join telah non active")
        } else {
        m.reply("\`\`\`「 MODE AUTO JOIN 」\`\`\`\n\n0. off\n1. on")
        }
    }
}
