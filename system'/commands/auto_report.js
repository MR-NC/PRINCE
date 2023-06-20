module.exports = {
    commands: ["autoreport"],
    cooldown: 13,
    isSewa: true,
    isOwner: true,
    callback: async ({ m }) => {
        if (m.args[0] == "on" || m.args[0] == "1") {
        if (m.autoReport == true) return m.reply("Sudah active")
        db.settings[m.botNumber].autoreport = true
        m.reply("Mode auto report telah active")
        } else if (m.args[0] == "off" || m.args[0] == "0") {
        if (m.autoReport == false) return m.reply("Sudah non active")
        db.settings[m.botNumber].autoreport = false
        m.reply("Mode auto report telah non active")
        } else {
        m.reply("\`\`\`「 MODE AUTO REPORT 」\`\`\`\n\n0. off\n1. on")
        }
    }
}
