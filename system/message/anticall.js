const fs = require("fs")
const chalk = require("chalk")
const { ownerNumber, logonya } = require("@config")
const { decodeJid, randomNomor } = require("@libs/function")

module.exports = async(sock, json) => {
const botNumber = decodeJid(sock.user.id)
const callerId = json.content[0].attrs['call-creator']
const replyType = Object.keys(db.settings).includes(botNumber)? db.settings[botNumber].replytype : "web1"
const antiCall = Object.keys(db.settings).includes(botNumber)? db.settings[botNumber].anticall : false

const setReply = (chatId, teks) => {
if (replyType == "mess1") {
sock.sendMessage(chatId, { text: teks, contextInfo: { mentionedJid: [...teks.matchAll(/@(\d{0,16})/g)].map((x) => x[1] + "@s.whatsapp.net"), externalAdReply: { showAdAttribution: true, title: "CALLING BOT", body: "DONT CLICK HERE", previewType: "PHOTO", thumbnailUrl: (logonya.isLogo? logonya.url : "https://github.com/MR-NC/P/blob/09ddad34c1acd4bbe498f8e239f8655daf5ce6c0/FB_IMG_1687239587669.jpg" + randomNomor(10) + ".jpg"), sourceUrl: "https://wa.me/" + ownerNumber }}})
} else if (replyType == "mess2") {
sock.sendMessage(chatId, { text: teks, contextInfo: { mentionedJid: [...teks.matchAll(/@(\d{0,16})/g)].map((x) => x[1] + "@s.whatsapp.net"), forwardingScore: 999, isForwarded: true, showAdAttribution: true, externalAdReply: { title: "CALLING BOT", body: "DONT CLICK HERE", previewType: "PHOTO", thumbnailUrl: (logonya.isLogo? logonya.url : "https://github.com/MR-NC/P/blob/09ddad34c1acd4bbe498f8e239f8655daf5ce6c0/FB_IMG_1687239587669.jpg" + randomNomor(10) + ".jpg"), sourceUrl: "https://wa.me/" + ownerNumber }}})
} else if (replyType == "mess3") {
sock.sendMessage(chatId, { text: teks, contextInfo: { mentionedJid: [...teks.matchAll(/@(\d{0,16})/g)].map((x) => x[1] + "@s.whatsapp.net"), forwardingScore: 10, isForwarded: true, externalAdReply: { showAdAttribution: true, title: "CALLING BOT", body: "DONT CLICK HERE", previewType: "PHOTO", thumbnailUrl: (logonya.isLogo? logonya.url : "https://github.com/MR-NC/P/blob/09ddad34c1acd4bbe498f8e239f8655daf5ce6c0/FB_IMG_1687239587669.jpg" + randomNomor(10) + ".jpg"), sourceUrl: "https://wa.me/" + ownerNumber }}})
} else if (replyType == "mess4") {
sock.sendMessage(chatId, { text: teks, contextInfo: { mentionedJid: [...teks.matchAll(/@(\d{0,16})/g)].map((x) => x[1] + "@s.whatsapp.net"), forwardingScore: 999, isForwarded: true }})
} else if (replyType == "mess5") {
sock.sendMessage(chatId, { text: teks, contextInfo: { mentionedJid: [...teks.matchAll(/@(\d{0,16})/g)].map((x) => x[1] + "@s.whatsapp.net"), forwardingScore: 10, isForwarded: true }})
} else if (replyType == "mess6") {
sock.sendMessage(chatId, { text: teks, mentions: [...teks.matchAll(/@(\d{0,16})/g)].map((x) => x[1] + "@s.whatsapp.net") })
}}




if (antiCall && json.content[0].tag == "offer") {
if (callerId.split("@")[0] == ownerNumber) return
setTimeout(() => {
sock.updateBlockStatus(callerId, "block")
}, 3000)
setTimeout(() => {
setReply(ownerNumber + "@s.whatsapp.net", `Terdeteksi @${callerId.split("@")[0]} telah menelpon bot`)
}, 1000)
setReply(callerId, "Sistem otomatis block!\nJangan menelpon bot!\nSilahkan hubungi https://wa.me/" + ownerNumber)
}}



let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	process.send("reset")
})