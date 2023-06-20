const fs = require("fs")
const chalk = require("chalk")
const moment = require("moment-timezone") 
const { decodeJid, getBuffer, pickRandom } = require("@libs/function")
const { ownerNumber, botName, thumbnailVid } = require("@config")


module.exports = async(sock, anu) => {
try{

const from = anu.id
const botNumber = decodeJid(sock.user.id)
const sender = anu.participants[0]
const senderNumber = sender.split("@")[0]
const groupMetadata = await sock.groupMetadata(from)
const groupName = groupMetadata.subject  
const pushname = Object.keys(db.users).includes(sender)? db.users[sender].name : senderNumber
const setWelcome = Object.keys(db.settings).includes(botNumber)? db.settings[botNumber].setwelcome : "image"
const docType = pickRandom(["pptx","xlsx","zip","pdf","docx"])
const isMe = sender.includes(botNumber)
const isWelcome = Object.keys(db.chats).includes(from)? db.chats[from].welcome : false
const isAdd = anu.action == "add" 
const isRemove = anu.action == "remove"
const isPromote = anu.action == "promote"
const isDemote = anu.action == "demote"
const textWelcome = `「 WELCOME - DETECTED 」\n\nNama : ${pushname}\nNumber : @${senderNumber}\nTime : ${moment().tz("Asia/Jakarta").format("HH:mm:ss")}`
const textLeave = `「 LEAVE - DETECTED 」\n\nNama : ${pushname}\nNumber : @${senderNumber}\nTime : ${moment().tz("Asia/Jakarta").format("HH:mm:ss")}`
const textPormote = `「 PROMOTE - DETECTED 」\n\nNama : ${pushname}\nNumber : @${senderNumber}\nTime : ${moment().tz("Asia/Jakarta").format("HH:mm:ss")}`
const textDemote = `「 DEMOTE - DETECTED 」\n\nNama : ${pushname}\nNumber : @${senderNumber}\nTime : ${moment().tz("Asia/Jakarta").format("HH:mm:ss")}`
try{
let pp_user = await sock.profilePictureUrl(sender, "image")
var profileUser = await getBuffer(pp_user)
} catch {
let pp_user = "https://github.com/MR-NC/P/blob/main/FB_IMG_1687239587669.jpg"
var profileUser = await getBuffer(pp_user)
}
const pfrply = await getBuffer(thumbnailVid.url)
const options = {
externalAdReply: {
showAdAttribution: true,
title: "GROUP UPDATE",
body: "DONT CLICK HERE",
mediaType: 1,
renderLargerThumbnail: setWelcome == "document" || setWelcome == "context"? true : false,
thumbnail: profileUser,
sourceUrl: `https://wa.me/${ownerNumber}`,
}}
if (docType == "pptx") {
var AppType = "application/vnd.openxmlformats-officedocument.presentationml.presentation"
} else if (docType == "xlsx") {
var AppType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
} else if (docType == "zip") {
var AppType = "application/zip"
} else if (docType == "pdf") {
var AppType = "application/pdf"
} else if (docType == "docx") {
var AppType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
} 
if (isWelcome && isAdd && !isMe) {
if (setWelcome == "document") {
sock.sendMessage(from, { contextInfo: options, document: fs.readFileSync("./temp/Zzzzzzzzzz@4.0.4"), mimetype: AppType, title : "Footer text", fileLength : 999999999999, pageCount: 100, fileName : botName, caption: textWelcome, headerType: "DOCUMENT", jpegThumbnail: profileUser })
} else if (setWelcome == "context") {
sock.sendMessage(from, { text: textWelcome, contextInfo: options })
} else if (setWelcome == "viewonce") {
sock.sendMessage(from, { image: profileUser, caption: textWelcome, viewOnce: true, contextInfo: options })
} else if (setWelcome == "image") {
sock.sendMessage(from, { image: profileUser, caption: textWelcome, contextInfo: options })
} else if (setWelcome == "gif") {
sock.sendMessage(from, { video: pfrply, contextInfo: options, jpegThumbnail: profileUser, caption: textWelcome, gifPlayback: true })
} else if (setWelcome == "video") {
sock.sendMessage(from, { video: pfrply, contextInfo: options, jpegThumbnail: profileUser, caption: textWelcome, gifPlayback: false })
}
console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ GROUP UPDATE ]"), `${senderNumber} telah bergabung ke group ${groupName}`)
} else if (isWelcome && isRemove && !isMe) {
if (setWelcome == "document") {
sock.sendMessage(from, { contextInfo: options, document: fs.readFileSync("./temp/Zzzzzzzzzz@4.0.4"), mimetype: AppType, title : "Footer text", fileLength : 999999999999, pageCount: 100, fileName : botName, caption: textLeave, headerType: "DOCUMENT", jpegThumbnail: profileUser })
} else if (setWelcome == "context") {
sock.sendMessage(from, { text: textLeave, contextInfo: options })
} else if (setWelcome == "viewonce") {
sock.sendMessage(from, { image: profileUser, caption: textLeave, viewOnce: true, contextInfo: options })
} else if (setWelcome == "image") {
sock.sendMessage(from, { image: profileUser, caption: textLeave, contextInfo: options })
} else if (setWelcome == "gif") {
sock.sendMessage(from, { video: pfrply, contextInfo: options, jpegThumbnail: profileUser, caption: textLeave, gifPlayback: true })
} else if (setWelcome == "video") {
sock.sendMessage(from, { video: pfrply, contextInfo: options, jpegThumbnail: profileUser, caption: textLeave, gifPlayback: false })
}
console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ GROUP UPDATE ]"), `${senderNumber} telah keluar dari group ${groupName}`)
} else if (isWelcome && isPromote && !NotMe) {
if (setWelcome == "document") {
sock.sendMessage(from, { contextInfo: options, document: fs.readFileSync("./temp/Zzzzzzzzzz@4.0.4"), mimetype: AppType, title : "Footer text", fileLength : 999999999999, pageCount: 100, fileName : botName, caption: textPormote, headerType: "DOCUMENT", jpegThumbnail: profileUser })
} else if (setWelcome == "context") {
sock.sendMessage(from, { text: textPormote, contextInfo: options })
} else if (setWelcome == "viewonce") {
sock.sendMessage(from, { image: profileUser, caption: textPormote, viewOnce: true, contextInfo: options })
} else if (setWelcome == "image") {
sock.sendMessage(from, { image: profileUser, caption: textPormote, contextInfo: options })
} else if (setWelcome == "gif") {
sock.sendMessage(from, { video: pfrply, contextInfo: options, jpegThumbnail: profileUser, caption: textPormote, gifPlayback: true })
} else if (setWelcome == "video") {
sock.sendMessage(from, { video: pfrply, contextInfo: options, jpegThumbnail: profileUser, caption: textPormote, gifPlayback: false })
}
console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ GROUP UPDATE ]"), `${senderNumber} telah di promote`)
} else if (isWelcome && isDemote && !NotMe) {
if (setWelcome == "document") {
sock.sendMessage(from, { contextInfo: options, document: fs.readFileSync("./temp/Zzzzzzzzzz@4.0.4"), mimetype: AppType, title : "Footer text", fileLength : 999999999999, pageCount: 100, fileName : botName, caption: textDemote, headerType: "DOCUMENT", jpegThumbnail: profileUser })
} else if (setWelcome == "context") {
sock.sendMessage(from, { text: textDemote, contextInfo: options })
} else if (setWelcome == "viewonce") {
sock.sendMessage(from, { image: profileUser, caption: textDemote, viewOnce: true, contextInfo: options })
} else if (setWelcome == "image") {
sock.sendMessage(from, { image: profileUser, caption: textDemote, contextInfo: options })
} else if (setWelcome == "gif") {
sock.sendMessage(from, { video: pfrply, contextInfo: options, jpegThumbnail: profileUser, caption: textDemote, gifPlayback: true })
} else if (setWelcome == "video") {
sock.sendMessage(from, { video: pfrply, contextInfo: options, jpegThumbnail: profileUser, caption: textDemote, gifPlayback: false })
}
console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ GROUP UPDATE ]"), `${senderNumber} telah di demote`)
}







  
} catch (err) {
let e = String(err)
if (e.includes("this.isZero")) return
if (e.includes("rate-overlimit")) return
if (e.includes("Connection Closed")) return
if (e.includes("Timed Out")) return
if (e.includes("Value not found")) return
console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ ERROR ]"), `${err}`)
}}







let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	process.send("reset")
})