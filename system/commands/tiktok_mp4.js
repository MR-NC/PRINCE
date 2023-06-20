const axios = require("axios")
const { getBuffer } = require("@libs/function")
module.exports = {
    commands: ["tiktokmp4","ttmp4"],
    cooldown: 13,
    minArgs: 1,
    expectedArgs: "<link>",
    example: "{prefix}{command} https://vt.tiktok.com/ZSwWCk5o/",
    isSewa: true,
    isLimit: true,
    callback: async ({ sock, m }) => {
        if (m.text.includes("https://vt.tiktok.com/") && m.text.split(".com/")[0] == "https://vt.tiktok") {
        var link = m.args[0]
        } else if (m.text.includes("https://vm.tiktok.com/") && m.text.split(".com/")[0] == "https://vm.tiktok") {
        var link = m.args[0]
        } else if (m.text.includes("https://www.tiktok.com/") && m.text.split(".com/")[0] == "https://www.tiktok") {
        var link = m.args[0]
        } else return m.reply("Error link")
        let { data } = await axios.get("https://api.tiklydown.me/api/download?url=" + link)
        let buffer = await getBuffer(data.video.noWatermark)
        sock.sendMessage(m.chat, { video: buffer, mimetype: "video/mp4" }, { quoted: (m.autoQuoted? m : "") })        
    }
}
