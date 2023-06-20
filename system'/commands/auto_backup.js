module.exports = {
    commands: ["autobackup"],
    cooldown: 13,
    isSewa: true,
    isOwner: true,
    callback: async ({ m }) => {
        if (m.args[0] == "on" || m.args[0] == "1") {
        if (m.autoBackup == true) return m.reply("Sudah active")
        db.settings[m.botNumber].autobackup = true
        m.reply("Mode auto backup telah active")
        } else if (m.args[0] == "off" || m.args[0] == "0") {
        if (m.autoBackup == false) return m.reply("Sudah non active")
        db.settings[m.botNumber].autobackup = false
        m.reply("Mode auto backup telah non active")
        } else {
        m.reply("\`\`\`「 MODE AUTO BACKUP 」\`\`\`\n\n0. off\n1. on")
        }
    }
}
