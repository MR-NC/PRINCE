const { calender } = require("@libs/function")
module.exports = {
    commands: ["ban"],
    cooldown: 13,
    isSewa: true,
    isOwner: true,
    callback: async ({ m }) => {
        if (!m.input) return m.reply("Input nomer")
        if (m.input.startsWith("08")) return m.reply("Gunakan code negara kak")
        if (Object.keys(db.banned).includes(m.input)) return m.reply("Sudah di ban")
        db.banned[m.input] = { date: calender, reason: "" }
        await m.reply(`Success banned @${m.input.split("@")[0]}`)
    }
}