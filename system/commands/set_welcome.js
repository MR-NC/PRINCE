module.exports = {
    commands: ["setwelcome"],
    cooldown: 13,
    isSewa: true,
    isOwner: true,
    callback: async ({ m }) => {
        if (m.args[0] == "viewonce" || m.args[0] == "1") {
        if (m.setWelcome == "viewonce") return m.reply("Sudah active")
        db.settings[m.botNumber].setwelcome = "viewonce"
        m.reply("Success mengganti welcome bot ke viewonce")
        } else if (m.args[0] == "image" || m.args[0] == "2") {
        if (m.setWelcome == "image") return m.reply("Sudah active")
        db.settings[m.botNumber].setwelcome = "image"
        m.reply("Success mengganti welcome bot ke image")
        } else if (m.args[0] == "gif" || m.args[0] == "3") {
        if (m.setWelcome == "gif") return m.reply("Sudah active")
        db.settings[m.botNumber].setwelcome = "gif"
        m.reply("Success mengganti welcome bot ke gif")
        } else if (m.args[0] == "video" || m.args[0] == "4") {
        if (m.setWelcome == "video") return m.reply("Sudah active")
        db.settings[m.botNumber].setwelcome = "video"
        m.reply("Success mengganti welcome bot ke video")
        } else if (m.args[0] == "document" || m.args[0] == "5") {
        if (m.setWelcome == "document") return m.reply("Sudah active")
        db.settings[m.botNumber].setwelcome = "document"
        m.reply("Success mengganti welcome bot ke document")
        } else if (m.args[0] == "context" || m.args[0] == "6") {
        if (m.setWelcome == "context") return m.reply("Sudah active")
        db.settings[m.botNumber].setwelcome = "context"
        m.reply("Success mengganti welcome bot ke context")
        } else {
        m.reply("\`\`\`「 SETTINGS WELCOME BOT 」\`\`\`\n\n1. viewonce\n2. image\n3. gif\n4. video\n5. document\n6. context") 
        }
    }
}
