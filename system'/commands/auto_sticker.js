module.exports = {
    commands: ["autosticker"],
    cooldown: 13,
    isSewa: true,
    isOwner: true,
    callback: async ({ m }) => {
        if (m.args[0] == "on" || m.args[0] == "1") {
        if (m.autoSticker == true) return m.reply("Sudah active")
        db.settings[m.botNumber].autosticker = true
        m.reply("Mode auto sticker telah active")
        } else if (m.args[0] == "off" || m.args[0] == "0") {
        if (m.autoSticker == false) return m.reply("Sudah non active")
        db.settings[m.botNumber].autosticker = false
        m.reply("Mode auto sticker telah non active")
        } else {
        m.reply("\`\`\`「 MODE AUTO STICKER 」\`\`\`\n\n0. off\n1. on")
        }
    }
}
