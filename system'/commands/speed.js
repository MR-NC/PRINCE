const moment = require("moment-timezone")
module.exports = {
    commands: ["speed"],
    cooldown: 13,
    isSewa: true,
    callback: async ({ m }) => {
        m.reply(`*_${moment.duration(Date.now() - parseInt(m.messageTimestamp.toString()) * 1000).asSeconds()} second_*`)
    }
}