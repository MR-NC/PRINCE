module.exports = {
    commands: ["setmenu"],
    cooldown: 13,
    isSewa: true,
    isOwner: true,
    callback: async ({ m }) => {
        if (m.args[0] == "viewonce" || m.args[0] == "1") {
        if (m.setMenu == "viewonce") return m.reply("Sudah active")
        db.settings[m.botNumber].setmenu = "viewonce"
        m.reply("Success mengganti menu bot ke viewonce")
        } else if (m.args[0] == "image" || m.args[0] == "2") {
        if (m.setMenu == "image") return m.reply("Sudah active")
        db.settings[m.botNumber].setmenu = "image"
        m.reply("Success mengganti menu bot ke image")
        } else if (m.args[0] == "gif" || m.args[0] == "3") {
        if (m.setMenu == "gif") return m.reply("Sudah active")
        db.settings[m.botNumber].setmenu = "gif"
        m.reply("Success mengganti menu bot ke gif")
        } else if (m.args[0] == "video" || m.args[0] == "4") {
        if (m.setMenu == "video") return m.reply("Sudah active")
        db.settings[m.botNumber].setmenu = "video"
        m.reply("Success mengganti menu bot ke video")
        } else if (m.args[0] == "document" || m.args[0] == "5") {
        if (m.setMenu == "document") return m.reply("Sudah active")
        db.settings[m.botNumber].setmenu = "document"
        m.reply("Success mengganti menu bot ke document")
        } else if (m.args[0] == "context" || m.args[0] == "6") {
        if (m.setMenu == "context") return m.reply("Sudah active")
        db.settings[m.botNumber].setmenu = "context"
        m.reply("Success mengganti menu bot ke context")
        } else {
        m.reply("\`\`\`「 SETTINGS MENU BOT 」\`\`\`\n\n1. viewonce\n2. image\n3. gif\n4. video\n5. document\n6. context") 
        }
    }
}
