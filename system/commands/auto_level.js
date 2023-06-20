module.exports = {
    commands: ["autolevel"],
    cooldown: 13,
    isSewa: true,
    isOwner: true,
    callback: async ({ m }) => {
        if (m.args[0] == "on" || m.args[0] == "1") {
        if (m.autoLevel == true) return m.reply("Sudah active")
        db.settings[m.botNumber].autolevel = true
        m.reply("Mode auto level telah active")
        } else if (m.args[0] == "off" || m.args[0] == "0") {
        if (m.autoLevel == false) return m.reply("Sudah non active")
        db.settings[m.botNumber].autolevel = false
        m.reply("Mode auto level telah non active")
        } else {
        m.reply("\`\`\`「 MODE AUTO LEVEL 」\`\`\`\n\n0. off\n1. on")
        }
    }
}
