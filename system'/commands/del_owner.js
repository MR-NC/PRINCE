module.exports = {
    commands: ["delowner"],
    cooldown: 13,
    isSewa: true,
    isVip: true,
    callback: async ({ m }) => {
        if (!m.input) return m.reply("Input nomer")
        if (m.input.startsWith("08")) return m.reply("Gunakan code negara kak")
        if (!Object.keys(db.expired[m.botNumber].vip).includes(m.input) && !Object.keys(db.expired[m.botNumber].owner).includes(m.input)) return m.reply("User bukan owner kak")
        if (Object.keys(db.expired[m.botNumber].vip).includes(m.input)) {
        delete db.expired[m.botNumber].vip[m.input]
        } else if (Object.keys(db.expired[m.botNumber].owner).includes(m.input)) {
        delete db.expired[m.botNumber].owner[m.input]
        }
        await m.reply("Success delete owner @" + m.input.split("@")[0])
    }
}