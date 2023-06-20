module.exports = {
    commands: ["delpremium"],
    cooldown: 13,
    isSewa: true,
    isVip: true,
    callback: async ({ m }) => {
        if (!m.input) return m.reply("Input nomer")
        if (m.input.startsWith("08")) return m.reply("Gunakan code negara kak")
        if (!Object.keys(db.expired[m.botNumber].premium).includes(m.input)) return m.reply("User bukan premium kak")
        delete db.expired[m.botNumber].premium[m.input]
        await m.reply("Success delete premium @" + m.input.split("@")[0])
    }
}