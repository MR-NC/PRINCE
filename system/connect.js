const { DisconnectReason, useMultiFileAuthState, fetchLatestBaileysVersion } = require("baileys")
const fs = require("fs")
const chalk = require("chalk")
const pino = require("pino")
const { githubEmail, githubUser, linkGroup, ownerNumber } = require("@config")
const { exec } = require("child_process")
const { Boom } = require("@hapi/boom")
const { Message, readCommands } = require("@message/msg") 
const { decodeJid } = require("@libs/function")
const { serialize, makeWASocket } = require("@libs/serialize")
const loadDatabase = require("@message/database")
const callingMessage = require("@message/anticall")
const groupMessage = require("@message/group")
//=================================================//
global.db = JSON.parse(fs.readFileSync("./database/database.json"))
global.db = {
    allcommand: {},
    anonymous: [],
    antispam: {},
    banned: {},
    blockcmd: [],
    chats: {},
    cooldown: {},
    createcode: {},
    dashboard: {},
    database: {},
    expired: {},
    listcmd: {},
    listerror: {},
    menfes: [],
    message: {},
    settings: {},
    users: {},
    ...(global.db || {})
}
setInterval(() => {
fs.writeFileSync("./database/database.json", JSON.stringify(global.db, null, 2))
}, 30 * 1000)
//=================================================//
const connectToWhatsApp = async() => {
const { state, saveCreds } = await useMultiFileAuthState("./connections/session")
const { version } = await fetchLatestBaileysVersion()
//=================================================//
const sock = makeWASocket({
printQRInTerminal: true,
generateHighQualityLinkPreview: true, 
logger: pino({ level: "fatal" }),
auth: state,
browser: ["Whatsapp-Botz", "IOS", "4.1.0"],
version
}) 
//=================================================//
try{
var autoJoin = db.settings[decodeJid(sock.user.id)].autojoin
} catch {
var autoJoin = false
}
//=================================================//
try{
var autoRead = db.settings[decodeJid(sock.user.id)].autoread
} catch {
var autoRead = false
}
//=================================================//
try{
var autoBackup = db.settings[decodeJid(sock.user.id)].autobackup
} catch {
var autoBackup = false
}
//=================================================//
setInterval(() => {
if (autoBackup) {
exec(`git config --global user.email "${githubEmail}" && git config --global user.name "${githubUser}" && git add . && git commit -m "Updating" && git push`, (stdout, err) => {
if (stdout) sock.sendMessage(ownerNumber + "@s.whatsapp.net", { text: "Backup source code success....." })
if (err) console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ ERROR ]"), `${err}`)
})
}}, 60000 * 30)
//=================================================//
setInterval(() => {
if (Object.keys(db.cooldown).length > 0) {
for (let x of Object.keys(db.cooldown)) {
try{ 
var cooldown = db.cooldown[x].expired
} catch {
var cooldown = 0
}
if (Date.now() >= cooldown) {
delete db.cooldown[x]
}}}
}, 1000)
//=================================================//
setInterval(() => {
if (Object.keys(db.antispam).length > 0) {
for (let x of Object.keys(db.antispam)) {
try{ 
var cooldown = db.antispam[x].expired
} catch {
var cooldown = 0
}
if (Date.now() >= cooldown) {
delete db.antispam[x]
}}}
}, 1000)
//=================================================//
sock.ev.on("connection.update", async (update) => {
const { connection, lastDisconnect } = update
if (connection == "close") {
const reason = new Boom(lastDisconnect?.error)?.output.statusCode
if (lastDisconnect.error == "Error: Stream Errored (unknown)") {
process.exit()
} else if (reason == DisconnectReason.badSession) {
console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ ERROR ]"), "Bad Session File, Please Delete Session and Scan Again")
process.exit()
} else if (reason == DisconnectReason.connectionClosed) {
console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ ERROR ]"), "Connection closed, reconnecting....")
process.exit()
} else if (reason == DisconnectReason.connectionLost) {
console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ ERROR ]"), "Connection Lost from Server, reconnecting....")
process.exit()
} else if (reason == DisconnectReason.connectionReplaced) {
console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ ERROR ]"), "Connection Replaced, Another New Session Opened, Please Close Current Session First")
sock.logout()
} else if (reason == DisconnectReason.loggedOut) {
console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ ERROR ]"), "Device Logged Out, Please Scan Again And Run.")
sock.logout()
} else if (reason == DisconnectReason.restartRequired) {
console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ ERROR ]"), "Restart Required, Restarting....")
connectToWhatsApp()
} else if (reason == DisconnectReason.timedOut) {
console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ ERROR ]"), "Connection TimedOut, Reconnecting....")
connectToWhatsApp()
}
} else if (connection == "connecting") {
console.log("Connecting...")
} else if (connection == "open") {
readCommands()
console.log(chalk.whiteBright("├"), chalk.keyword("aqua")("[ CONNECT ]"), "Connecting to the WhatsApp bot....")
if (autoJoin && linkGroup.includes("https://chat.whatsapp.com/")) {
try{
sock.groupAcceptInvite(linkGroup.split("https://chat.whatsapp.com/")[1])
} catch { console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ ERROR ]"), "link group invalid!") }
}}
})
//=================================================//
sock.ev.on("messages.upsert", async ({messages, type}) => {
try{
if (type !== "notify") return
const msg = messages[0] || messages[messages.length - 1]
if (msg.key && msg.key.remoteJid == "status@broadcast") {
if (autoRead) { sock.readMessages([msg.key]) }
return
}
if (msg.key.id.startsWith("BAE5") && msg.key.id.length == 16) return
const m = serialize(sock, msg)
loadDatabase(m)
Message(sock, m) 
} catch (e) {
console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ ERROR ]"), `${e}`)
}
})
//=================================================//
sock.ws.on("CB:call", async (json) => {
callingMessage(sock, json)
})
//=================================================//
sock.ev.on("group-participants.update", async (anu) => {
groupMessage(sock, anu)
})
//=================================================//
sock.ev.on("creds.update", saveCreds)
return sock
}
//=================================================//
module.exports = { connectToWhatsApp }




let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
    delete require.cache[file]
    process.send("reset")
})