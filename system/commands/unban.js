module.exports = {
    commands: ["unban"],
    cooldown: 13,
    isSewa: true,
    isOwner: true,
    callback: async ({ m }) => {
        if (!m.input) return m.reply("Input nomer")
        if (m.input.startsWith("08")) return m.reply("Gunakan code negara kak")
        if (!Object.keys(db.banned).includes(m.input)) return m.reply("Sudah di unban")
        delete db.banned[m.input]
        await m.reply(`Success unbanned @${m.input.split("@")[0]}`)
    }
}