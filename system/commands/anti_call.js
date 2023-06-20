module.exports = {
    commands: ["anticall"],
    cooldown: 13,
    isSewa: true,
    isOwner: true,
    callback: async ({ m }) => {
        if (m.args[0] == "on" || m.args[0] == "1") {
        if (m.antiCall == true) return m.reply("Sudah active")
        db.settings[m.botNumber].anticall = true
        m.reply("Mode anti call telah active")
        } else if (m.args[0] == "off" || m.args[0] == "0") {
        if (m.antiCall == false) return m.reply("Sudah non active")
        db.settings[m.botNumber].anticall = false
        m.reply("Mode anti call telah non active")
        } else {
        m.reply("\`\`\`「 MODE ANTI CALL 」\`\`\`\n\n0. off\n1. on")
        }
    }
}
