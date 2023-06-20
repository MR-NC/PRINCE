const { runtime } = require("@libs/function")
module.exports = {
    commands: ["runtime"],
    cooldown: 13,
    isSewa: true,
    callback: async ({ m }) => {
        m.reply(`${runtime(process.uptime())}`)
    }
}