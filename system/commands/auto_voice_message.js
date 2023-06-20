module.exports = {
    commands: ["autovn"],
    cooldown: 13,
    isSewa: true,
    isOwner: true,
    callback: async ({ m }) => {
        if (m.args[0] == "on" || m.args[0] == "1") {
        if (m.autoVn == true) return m.reply("Sudah active")
        db.settings[m.botNumber].autovn = true
        m.reply("Mode auto vn telah active")
        } else if (m.args[0] == "off" || m.args[0] == "0") {
        if (m.autoVn == false) return m.reply("Sudah non active")
        db.settings[m.botNumber].autovn = false
        m.reply("Mode auto vn telah non active")
        } else {
        m.reply("\`\`\`「 MODE AUTO VN 」\`\`\`\n\n0. off\n1. on")
        }
    }
}
