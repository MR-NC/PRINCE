module.exports = {
    commands: ["autoread"],
    cooldown: 13,
    isSewa: true,
    isOwner: true,
    callback: async ({ m }) => {
        if (m.args[0] == "on" || m.args[0] == "1") {
        if (m.autoRead == true) return m.reply("Sudah active")
        db.settings[m.botNumber].autoread = true
        m.reply("Mode auto read telah active")
        } else if (m.args[0] == "off" || m.args[0] == "0") {
        if (m.autoRead == false) return m.reply("Sudah non active")
        db.settings[m.botNumber].autoread = false
        m.reply("Mode auto read telah non active")
        } else {
        m.reply("\`\`\`「 MODE AUTO READ 」\`\`\`\n\n0. off\n1. on")
        }
    }
}
