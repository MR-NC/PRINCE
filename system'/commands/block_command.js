module.exports = {
    commands: ["blockcmd"],
    cooldown: 13,
    minArgs: 1,
    expectedArgs: "<command>",
    example: "{prefix}{command} menu",
    isSewa: true,
    isOwner: true,
    callback: async ({ m }) => {
        if (!Object.keys(db.allcommand).includes(m.text)) return m.reply("Commands not found!")        
        if (db.blockcmd.includes(m.text)) return m.reply("Command sudah di block")
        db.blockcmd.push(m.text)
        await m.reply(`Success block command ${m.text}`)
    }
}
