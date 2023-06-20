module.exports = {
    commands: ["setprefix"],
    cooldown: 13,
    isSewa: true,
    isOwner: true,
    callback: async ({ m }) => {
        if (m.args[0] == "yes" || m.args[0] == "1") {
        if (m.setPrefix == "yes") return m.reply("Sudah active")
        db.settings[m.botNumber].setprefix = "yes"
        await m.reply("Success mengganti prefix ke yes")
        } else if (m.args[0] == "noo" || m.args[0] == "2") {
        if (m.setPrefix == "noo") return m.reply("Sudah active")
        db.settings[m.botNumber].setprefix = "noo"
        await m.reply("Success mengganti prefix ke noo")
        } else if (m.args[0] == "all" || m.args[0] == "3") {
        if (m.setPrefix == "all") return m.reply("Sudah active")
        db.settings[m.botNumber].setprefix = "all"
        await m.reply("Success mengganti prefix ke all")
        } else {
        m.reply("\`\`\`「 SETTINGS PREFIX BOT 」\`\`\`\n\n1. yes\n2. noo\n3. all")
        }
    }
}
