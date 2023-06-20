const { calender } = require("@libs/function")
const { limitAwal } = require("@config")
const fs = require("fs") 
const chalk = require("chalk")
const toMs = require("ms")
const loadDatabase = (m) => {
try{
//================================================================\\
if (db.expired[m.botNumber]) {
if (!("owner" in db.expired[m.botNumber])) db.expired[m.botNumber].owner = {}
if (!("premium" in db.expired[m.botNumber])) db.expired[m.botNumber].premium = {}
if (!("sewa" in db.expired[m.botNumber])) db.expired[m.botNumber].sewa = {}
if (!("vip" in db.expired[m.botNumber])) db.expired[m.botNumber].vip = {}
} else db.expired[m.botNumber] = {
owner: {}, 
premium: {}, 
sewa: {}, 
vip: {}, 
}
//================================================================\\
if (m.isGroup && db.chats[m.chat]) {
if (!("antilink" in db.chats[m.chat])) db.chats[m.chat].antilink = false
if (!("antilinkyt" in db.chats[m.chat])) db.chats[m.chat].antilinkyt = false
if (!("antilinkfb" in db.chats[m.chat])) db.chats[m.chat].antilinkfb = false
if (!("antilinkig" in db.chats[m.chat])) db.chats[m.chat].antilinkig = false
if (!("antilinktele" in db.chats[m.chat])) db.chats[m.chat].antilinktele = false
if (!("antilinkwa" in db.chats[m.chat])) db.chats[m.chat].antilinkwa = false
if (!("antilinktiktok" in db.chats[m.chat])) db.chats[m.chat].antilinktiktok = false
if (!("antilinktwitter" in db.chats[m.chat])) db.chats[m.chat].antilinktwitter = false
if (!("antivirtex" in db.chats[m.chat])) db.chats[m.chat].antivirtex = false
if (!("antiasing" in db.chats[m.chat])) db.chats[m.chat].antiasing = false
if (!("antitag" in db.chats[m.chat])) db.chats[m.chat].antitag = false
if (!("antidelete" in db.chats[m.chat])) db.chats[m.chat].antidelete = false
if (!("antiviewonce" in db.chats[m.chat])) db.chats[m.chat].antiviewonce = false
if (!("antitoxic" in db.chats[m.chat])) db.chats[m.chat].antitoxic = false
if (!("antisange" in db.chats[m.chat])) db.chats[m.chat].antisange = false
if (!("autorespongc" in db.chats[m.chat])) db.chats[m.chat].autorespongc = false
if (!("autoreactgc" in db.chats[m.chat])) db.chats[m.chat].autoreactgc = false
if (!("banchat" in db.chats[m.chat])) db.chats[m.chat].banchat = false
if (!("welcome" in db.chats[m.chat])) db.chats[m.chat].welcome = false
if (!("sewa" in db.chats[m.chat])) db.chats[m.chat].sewa = {
status: true,
date: calender, 
expired: Date.now() + toMs("1days")
}
if (!("afk_group" in db.chats[m.chat])) db.chats[m.chat].afk_group = []
} else if (m.isGroup) db.chats[m.chat] = {
antilink: false,
antilinkyt: false,
antilinkfb: false,
antilinkig: false,
antilinktele: false,
antilinkwa: false,
antilinktiktok: false,
antilinktwitter: false,
antivirtex: false,
antiasing: false,
antitag: false,
antidelete: false,
antiviewonce: false,
antitoxic: false,
antisange: false,
autorespongc: false,
autoreactgc: false,
banchat: false,
welcome: false,
sewa: {
status: true,
date: calender, 
expired: Date.now() + toMs("1days")
},
afk_group: []
}
//================================================================\\
if (db.settings[m.botNumber]) {
if (!("setmenu" in db.settings[m.botNumber])) db.settings[m.botNumber].setmenu = "image"
if (!("setwelcome" in db.settings[m.botNumber])) db.settings[m.botNumber].setwelcome = "image"
if (!("setprefix" in db.settings[m.botNumber])) db.settings[m.botNumber].setprefix = "yes"
if (!("replytype" in db.settings[m.botNumber])) db.settings[m.botNumber].replytype = "mess4"
if (!("mode" in db.settings[m.botNumber])) db.settings[m.botNumber].mode = "public"
if (!("auto" in db.settings[m.botNumber])) db.settings[m.botNumber].auto = "unavailable"
if (!("autoblockcmd" in db.settings[m.botNumber])) db.settings[m.botNumber].autoblockcmd = false
if (!("autoreport" in db.settings[m.botNumber])) db.settings[m.botNumber].autoreport = true
if (!("autobio" in db.settings[m.botNumber])) db.settings[m.botNumber].autobio = false
if (!("autosticker" in db.settings[m.botNumber])) db.settings[m.botNumber].autosticker = false
if (!("autorespon" in db.settings[m.botNumber])) db.settings[m.botNumber].autorespon = false
if (!("autoread" in db.settings[m.botNumber])) db.settings[m.botNumber].autoread = false
if (!("autovn" in db.settings[m.botNumber])) db.settings[m.botNumber].autovn = false
if (!("autoquoted" in db.settings[m.botNumber])) db.settings[m.botNumber].autoquoted = true
if (!("autolevel" in db.settings[m.botNumber])) db.settings[m.botNumber].autolevel = false
if (!("autojoin" in db.settings[m.botNumber])) db.settings[m.botNumber].autojoin = false
if (!("autobackup" in db.settings[m.botNumber])) db.settings[m.botNumber].autobackup = false
if (!("anticall" in db.settings[m.botNumber])) db.settings[m.botNumber].anticall = false
if (!("antispam" in db.settings[m.botNumber])) db.settings[m.botNumber].antispam = false
} else db.settings[m.botNumber] = {
setmenu: "image", 
setwelcome: "image", 
setprefix: "yes",
replytype: "mess4", 
mode: "public",
auto: "unavailable", 
autoblockcmd: false, 
autoreport: true, 
autobio: false, 
autosticker: false, 
autorespon: false, 
autoread: false, 
autovn: false, 
autoquoted: true, 
autolevel: false,
autojoin: false,
autobackup: false,
anticall: false,
antispam: false,
}
//================================================================\\
if (db.users[m.sender]) {
if (!("name" in db.users[m.sender])) db.users[m.sender].name = m.pushName
if (!("date" in db.users[m.sender])) db.users[m.sender].date = calender
if (!("level" in db.users[m.sender])) db.users[m.sender].level = "Low Tier"
if (isNaN(db.users[m.sender].xp)) db.users[m.sender].xp = 1
if (isNaN(db.users[m.sender].balance)) db.users[m.sender].balance = 0
if (isNaN(db.users[m.sender].limit)) db.users[m.sender].limit = limitAwal
} else db.users[m.sender] = {
name: m.pushName, 
date: calender, 
level: "Low Tier",
xp: 1,
balance: 0,
limit: limitAwal,
}
//================================================================\\
} catch (e) {
console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ ERROR ]"), `${e}`)
}}

module.exports = loadDatabase


let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	process.send("reset")
})