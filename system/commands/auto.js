module.exports = {
    commands: ["auto"],
    cooldown: 13,
    isSewa: true,
    isOwner: true,
    callback: async ({ m }) => {
        if (m.args[0] == "recording" || m.args[0] == "1") {
        if (m.auto == "recording") return m.reply("Sudah active")
        db.settings[m.botNumber].auto = "recording"
        m.reply("Mode auto recording telah active")
        } else if (m.args[0] == "typing" || m.args[0] == "2") {
        if (m.auto == "typing") return m.reply("Sudah active")
        db.settings[m.botNumber].auto = "typing"
        m.reply("Mode auto typing telah active")
        } else if (m.args[0] == "available" || m.args[0] == "3") {
        if (m.auto == "available") return m.reply("Sudah active")
        db.settings[m.botNumber].auto = "available"
        m.reply("Mode auto available telah active")
        } else if (m.args[0] == "unavailable" || m.args[0] == "4") {
        if (m.auto == "unavailable") return m.reply("Sudah active")
        db.settings[m.botNumber].auto = "available"
        m.reply("Mode auto unavailable telah active")
        } else {
        m.reply("\`\`\`「 MODE AUTO 」\`\`\`\n\n1. recording\n2. typing\n3. available\n4. unavailable")
        }
    }
}