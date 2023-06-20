module.exports = {
    commands: ["block"],
    cooldown: 13,
    isSewa: true,
    isOwner: true,
    callback: async ({ sock, m }) => {
        const listBlock = await sock.fetchBlocklist()
        if (!m.input) return m.reply("Input nomer")
        if (m.input.startsWith("08")) return m.reply("Gunakan code negara kak")
        if (listBlock.includes(m.input)) return m.reply("Sudah di block")
        sock.updateBlockStatus(m.input, "block")
        await m.reply(`Success block @${m.input.split("@")[0]}`)
    }
}