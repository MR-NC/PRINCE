module.exports = {
    commands: ["autoblockcmd"],
    cooldown: 13,
    isSewa: true,
    isOwner: true,
    callback: async ({ m }) => {
        if (m.args[0] == "on" || m.args[0] == "1") {
        if (m.autoBlockCmd == true) return m.reply("Sudah active")
        db.settings[m.botNumber].autoblockcmd = true
        m.reply("Mode auto block command telah active")
        } else if (m.args[0] == "off" || m.args[0] == "0") {
        if (m.autoBlockCmd == false) return m.reply("Sudah non active")
        db.settings[m.botNumber].autoblockcmd = false
        m.reply("Mode auto block command telah non active")
        } else {
        m.reply("\`\`\`「 MODE AUTO BLOCK COMMAND 」\`\`\`\n\n0. off\n1. on")
        }
    }
}
