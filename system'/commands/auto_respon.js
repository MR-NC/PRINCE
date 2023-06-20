module.exports = {
    commands: ["autorespon"],
    cooldown: 13,
    isSewa: true,
    isOwner: true,
    callback: async ({ m }) => {
        if (m.args[0] == "on" || m.args[0] == "1") {
        if (m.autoRespon == true) return m.reply("Sudah active")
        db.settings[m.botNumber].autorespon = true
        m.reply("Mode auto respon telah active")
        } else if (m.args[0] == "off" || m.args[0] == "0") {
        if (m.autoRespon == false) return m.reply("Sudah non active")
        db.settings[m.botNumber].autorespon = false
        m.reply("Mode auto respon telah non active")
        } else {
        m.reply("\`\`\`「 MODE AUTO RESPON 」\`\`\`\n\n0. off\n1. on")
        }
    }
}
