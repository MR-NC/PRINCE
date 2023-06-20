module.exports = {
    commands: ["autobio"],
    cooldown: 13,
    isSewa: true,
    isOwner: true,
    callback: async ({ m }) => {
        if (m.args[0] == "on" || m.args[0] == "1") {
        if (m.autoBio == true) return m.reply("Sudah active")
        db.settings[m.botNumber].autobio = true
        m.reply("Mode auto bio telah active")
        } else if (m.args[0] == "off" || m.args[0] == "0") {
        if (m.autoBio == false) return m.reply("Sudah non active")
        db.settings[m.botNumber].autobio = false
        m.reply("Mode auto bio telah non active")
        } else {
        m.reply("\`\`\`「 MODE AUTO BIO 」\`\`\`\n\n0. off\n1. on")
        }
    }
}
