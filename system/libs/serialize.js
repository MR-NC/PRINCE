const fs = require("fs")
const chalk = require("chalk") 
const moment = require("moment-timezone") 
const { default: makeWASocket, getContentType, downloadContentFromMessage, generateForwardMessageContent, generateWAMessageFromContent } = require("baileys")
const { decodeJid, randomNomor, runtime, calender } = require("@libs/function")
const { ownerNumber, ownerName, limitAwal, logonya } = require("@config") 
const store = require("@store")



exports.makeWASocket = (connectionOptions) => {
const sock = makeWASocket(connectionOptions)
//=================================================//
sock.copyNForward = async(jid, message, forwardingScore = true, options = {}) => {
let m = generateForwardMessageContent(message, !!forwardingScore)
let mtype = Object.keys(m)[0]
if (forwardingScore && typeof forwardingScore == "number" && forwardingScore > 1) m[mtype].contextInfo.forwardingScore += forwardingScore
m = generateWAMessageFromContent(jid, m, { ...options, userJid: sock.user.id })
await sock.relayMessage(jid, m.message, { messageId: m.key.id, additionalAttributes: { ...options } })
return m
}
//=================================================//
sock.downloadAndSaveMediaMessage = async(msg, filename) => {
const { fromBuffer } = require("file-type")    
const messageType = ["viewOnceMessageV2","viewOnceMessage","documentWithCaptionMessage"].includes(msg.type)? getContentType(msg.message).split("Message")[0] : msg.type.split("Message")[0]
const stream = await downloadContentFromMessage(msg.message[messageType + "Message"], messageType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
let type = await fromBuffer(buffer)
await fs.writeFileSync(filename + "." + type.ext, buffer)
return (filename + "." + type.ext)
}
//=================================================//
sock.downloadMediaMessage = async(msg) => {
const messageType = ["viewOnceMessageV2","viewOnceMessage","documentWithCaptionMessage"].includes(msg.type)? getContentType(msg.message).split("Message")[0] : msg.type.split("Message")[0]
const stream = await downloadContentFromMessage(msg.message[messageType + "Message"], messageType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
return buffer
}
//=================================================//
sock.sendContact = async (jid, number, name, quoted, options) => {
let njid = number.replace(new RegExp("[()+-/ +/]", "gi"), "") + "@s.whatsapp.net"
let vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:${name.replace(/\n/g, '\\n')}\nTEL;type=CELL;type=VOICE;waid=${number}:${number}\nEND:VCARD`
return sock.sendMessage(jid, { contacts: { displayName: `${name}`, contacts: [{ vcard }], ...options }}, { quoted, ...options })
}
//=================================================//
sock.sendKontak = async (jid, data, quoted, options) => {
const vcard = []
for (let x of data) {
const name = x == ownerNumber + "@s.whatsapp.net"? ownerName : Object.keys(db.users).includes(x)? db.users[x].name : x.split("@")[0]          
vcard.push({vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:${name.replace(/\n/g, '\\n')}\nTEL;type=CELL;type=VOICE;waid=${x.split("@")[0]}:${x.split("@")[0]}\nEND:VCARD`}) 
}
return sock.sendMessage(jid, { contacts: { displayName: `${vcard.length} Kontak`, contacts: vcard, ...options }}, { quoted, ...options })
}
//=================================================//
Object.defineProperty(sock, "name", {
value: { ...({}) },
configurable: true,
})
return sock
}

exports.serialize = (sock, msg) => {
    const m = {}
    const time = {}
    if (msg.key) {
        m.key = {
                   id: msg.key.id, 
                   fromMe: msg.key.fromMe, 
                   remoteJid: msg.key.remoteJid, 
                   participant: msg?.key?.participant || ""
        }
        m.chat = m.key.remoteJid
        m.isGroup = m.chat.endsWith("@g.us")
        m.sender = decodeJid(m.key.fromMe && sock.user.id || m.key.participant || m.chat || "")
        m.senderNumber = m.sender.split("@")[0]
    }
    m.type = (!["senderKeyDistributionMessage","messageContextInfo"].includes(Object.keys(msg.message)[0]) && Object.keys(msg.message)[0]) || (Object.keys(msg.message).length >= 3 && Object.keys(msg.message)[1] !== "messageContextInfo" && Object.keys(msg.message)[1]) || Object.keys(msg.message)[Object.keys(msg.message).length - 1]
    if (Object.keys(db.message).includes(m.sender)) {
        if (m.type == "extendedTextMessage") {
            db.message[m.sender].type = m.type
            db.message[m.sender].key = m.key            
            db.message[m.sender].message = { extendedTextMessage: msg.message[m.type] }
        } else if (m.type == "conversation") {
            db.message[m.sender].type = m.type
            db.message[m.sender].key = m.key
            db.message[m.sender].message = { conversation: msg.message[m.type] }
        } else if (m.type == "imageMessage") {
            db.message[m.sender].type = m.type
            db.message[m.sender].key = m.key
            db.message[m.sender].message = { imageMessage: msg.message[m.type] }
        } else if (m.type == "videoMessage") {
            db.message[m.sender].type = m.type
            db.message[m.sender].key = m.key
            db.message[m.sender].message = { videoMessage: msg.message[m.type] }
        } else if (m.type == "stickerMessage") {
            db.message[m.sender].type = m.type
            db.message[m.sender].key = m.key
            db.message[m.sender].message = { stickerMessage: msg.message[m.type] }
        } else if (m.type == "audioMessage") {
            db.message[m.sender].type = m.type
            db.message[m.sender].key = m.key
            db.message[m.sender].message = { audioMessage: msg.message[m.type] }
        } else if (m.type == "viewOnceMessage") {
            db.message[m.sender].type = m.type
            db.message[m.sender].key = m.key
            db.message[m.sender].message = { viewOnceMessage: msg.message[m.type] }
        } else if (m.type == "viewOnceMessageV2") {
            db.message[m.sender].type = m.type
            db.message[m.sender].key = m.key
            db.message[m.sender].message = { viewOnceMessageV2: msg.message[m.type] }
        } else if (m.type == "contactMessage") {
            db.message[m.sender].type = m.type
            db.message[m.sender].key = m.key
            db.message[m.sender].message = { contactMessage: msg.message[m.type] }
        } else if (m.type == "contactsArrayMessage") {
            db.message[m.sender].type = m.type
            db.message[m.sender].key = m.key
            db.message[m.sender].message = { contactsArrayMessage: msg.message[m.type] }
        } else if (m.type == "locationMessage") {
            db.message[m.sender].type = m.type
            db.message[m.sender].key = m.key
            db.message[m.sender].message = { locationMessage: msg.message[m.type] }
        } else if (m.type == "documentMessage") {
            db.message[m.sender].type = m.type
            db.message[m.sender].key = m.key
            db.message[m.sender].message = { documentMessage: msg.message[m.type] }
        } else if (m.type == "documentWithCaptionMessage") {
            db.message[m.sender].type = m.type
            db.message[m.sender].key = m.key
            db.message[m.sender].message = { documentWithCaptionMessage: msg.message[m.type] }
        }
    } else if (!Object.keys(db.message).includes(m.sender)) {
        if (m.type == "extendedTextMessage") {
            db.message[m.sender] = { type: m.type, key: m.key, message: { extendedTextMessage: msg.message[m.type] }}
        } else if (m.type == "conversation") {
            db.message[m.sender] = { type: m.type, key: m.key, message: { conversation: msg.message[m.type] }}
        } else if (m.type == "imageMessage") {
            db.message[m.sender] = { type: m.type, key: m.key, message: { imageMessage: msg.message[m.type] }}
        } else if (m.type == "videoMessage") {
            db.message[m.sender] = { type: m.type, key: m.key, message: { videoMessage: msg.message[m.type] }}
        } else if (m.type == "stickerMessage") {
            db.message[m.sender] = { type: m.type, key: m.key, message: { stickerMessage: msg.message[m.type] }}
        } else if (m.type == "audioMessage") {
            db.message[m.sender] = { type: m.type, key: m.key, message: { audioMessage: msg.message[m.type] }}
        } else if (m.type == "viewOnceMessage") {
            db.message[m.sender] = { type: m.type, key: m.key, message: { viewOnceMessage: msg.message[m.type] }}
        } else if (m.type == "viewOnceMessageV2") {
            db.message[m.sender] = { type: m.type, key: m.key, message: { viewOnceMessageV2: msg.message[m.type] }}
        } else if (m.type == "contactMessage") {
            db.message[m.sender] = { type: m.type, key: m.key, message: { contactMessage: msg.message[m.type] }}
        } else if (m.type == "contactsArrayMessage") {
            db.message[m.sender] = { type: m.type, key: m.key, message: { contactsArrayMessage: msg.message[m.type] }}
        } else if (m.type == "locationMessage") {
            db.message[m.sender] = { type: m.type, key: m.key, message: { locationMessage: msg.message[m.type] }}
        } else if (m.type == "documentMessage") {
            db.message[m.sender] = { type: m.type, key: m.key, message: { documentMessage: msg.message[m.type] }}
        } else if (m.type == "documentWithCaptionMessage") {
            db.message[m.sender] = { type: m.type, key: m.key, message: { documentWithCaptionMessage: msg.message[m.type] }}
        }
    }
    if (["viewOnceMessage","viewOnceMessageV2","documentWithCaptionMessage"].includes(m.type)) {
        msg.message = msg.message[m.type].message
    }
    m.body = m.type == "conversation"? msg.message.conversation : m.type == "extendedTextMessage"? msg.message.extendedTextMessage.text : m.type == "imageMessage"? msg.message.imageMessage.caption : m.type == "videoMessage"? msg.message.videoMessage.caption : m.type == "viewOnceMessage"? msg.message[getContentType(msg.message)]?.caption : m.type == "viewOnceMessageV2"? msg.message[getContentType(msg.message)]?.caption : m.type == "documentWithCaptionMessage"? msg.message.documentMessage.caption : ""
    m.budy = m.type == "conversation"? msg.message.conversation : m.type == "extendedTextMessage"? msg.message.extendedTextMessage.text : ""
    m.args = m.body.trim().split(/ +/).slice(1)
    m.text = m?.args?.join(" ")
    m.botNumber = decodeJid(sock.user.id)
    m.pushName = msg.pushName
    m.timeWib = moment().tz("Asia/Jakarta").format("HH:mm:ss")
    if (m.timeWib < "23:59:00") {
        m.ucapanWaktu = "Selamat malam" 
    } 
    if (m.timeWib < "19:00:00") { 
        m.ucapanWaktu = "Selamat malam"
    } 
    if (m.timeWib < "18:00:00") { 
        m.ucapanWaktu = "Selamat sore" 
    } 
    if (m.timeWib < "15:00:00") { 
        m.ucapanWaktu = "Selamat siang"
    } 
    if (m.timeWib < "11:00:00") { 
        m.ucapanWaktu = "Selamat pagi"
    } 
    if (m.timeWib < "06:00:00") { 
        m.ucapanWaktu = "Selamat pagi"
    }
    m.mentionedJid = msg.message[m.type]?.contextInfo?.mentionedJid?.length > 0? msg.message[m.type].contextInfo.mentionedJid : []
    m.isMention = m.mentionedJid.length > 0
    m.setMenu = Object.keys(db.settings).includes(m.botNumber)? db.settings[m.botNumber].setmenu : "image"
    m.setWelcome = Object.keys(db.settings).includes(m.botNumber)? db.settings[m.botNumber].setwelcome : "image"
    m.setPrefix = Object.keys(db.settings).includes(m.botNumber)? db.settings[m.botNumber].setprefix : "yes"
    m.replyType = Object.keys(db.settings).includes(m.botNumber)? db.settings[m.botNumber].replytype : "mess4"
    m.mode = Object.keys(db.settings).includes(m.botNumber)? db.settings[m.botNumber].mode : "public"
    m.auto = Object.keys(db.settings).includes(m.botNumber)? db.settings[m.botNumber].auto : "unavailable"
    m.autoBlockCmd = Object.keys(db.settings).includes(m.botNumber)? db.settings[m.botNumber].autoblockcmd : false
    m.autoReport = Object.keys(db.settings).includes(m.botNumber)? db.settings[m.botNumber].autoreport : true
    m.autoBio = Object.keys(db.settings).includes(m.botNumber)? db.settings[m.botNumber].autobio : false
    m.autoSticker = Object.keys(db.settings).includes(m.botNumber)? db.settings[m.botNumber].autosticker : false
    m.autoRespon = Object.keys(db.settings).includes(m.botNumber)? db.settings[m.botNumber].autorespon : false
    m.autoRead = Object.keys(db.settings).includes(m.botNumber)? db.settings[m.botNumber].autoread : false
    m.autoVn = Object.keys(db.settings).includes(m.botNumber)? db.settings[m.botNumber].autovn : false
    m.autoQuoted = Object.keys(db.settings).includes(m.botNumber)? db.settings[m.botNumber].autoquoted : true
    m.autoLevel = Object.keys(db.settings).includes(m.botNumber)? db.settings[m.botNumber].autolevel : false
    m.autoJoin = Object.keys(db.settings).includes(m.botNumber)? db.settings[m.botNumber].autojoin : false
    m.autoBackup = Object.keys(db.settings).includes(m.botNumber)? db.settings[m.botNumber].autobackup : false
    m.antiCall = Object.keys(db.settings).includes(m.botNumber)? db.settings[m.botNumber].anticall : false
    m.antiSpam = Object.keys(db.settings).includes(m.botNumber)? db.settings[m.botNumber].antispam : false
    m.isAntiLink = Object.keys(db.chats).includes(m.chat)? db.chats[m.chat].antilink : false
    m.isAntiLinkYoutube = Object.keys(db.chats).includes(m.chat)? db.chats[m.chat].antilinkyt : false
    m.isAntiLinkFacebook = Object.keys(db.chats).includes(m.chat)? db.chats[m.chat].antilinkfb : false
    m.isAntiLinkInstagram = Object.keys(db.chats).includes(m.chat)? db.chats[m.chat].antilinkig : false
    m.isAntiLinkTelegram = Object.keys(db.chats).includes(m.chat)? db.chats[m.chat].antilinktele : false
    m.isAntiLinkWhatsapp = Object.keys(db.chats).includes(m.chat)? db.chats[m.chat].antilinkwa : false
    m.isAntiLinkTiktok = Object.keys(db.chats).includes(m.chat)? db.chats[m.chat].antilinktiktok : false
    m.isAntiLinkTwitter = Object.keys(db.chats).includes(m.chat)? db.chats[m.chat].antilinktwitter : false
    m.isAntiVirtex = Object.keys(db.chats).includes(m.chat)? db.chats[m.chat].antivirtex : false
    m.isAntiAsing = Object.keys(db.chats).includes(m.chat)? db.chats[m.chat].antiasing : false
    m.isAntiTag = Object.keys(db.chats).includes(m.chat)? db.chats[m.chat].antitag : false
    m.isAntiDelete = Object.keys(db.chats).includes(m.chat)? db.chats[m.chat].antidelete : false
    m.isAntiViewOnce = Object.keys(db.chats).includes(m.chat)? db.chats[m.chat].antiviewonce : false
    m.isAntiToxic = Object.keys(db.chats).includes(m.chat)? db.chats[m.chat].antitoxic : false
    m.isAntiSange = Object.keys(db.chats).includes(m.chat)? db.chats[m.chat].antisange : false
    m.isAutoResponGroup = Object.keys(db.chats).includes(m.chat)? db.chats[m.chat].autorespongc : false
    m.isAutoReactGroup = Object.keys(db.chats).includes(m.chat)? db.chats[m.chat].autoreactgc : false
    m.isBanChat = Object.keys(db.chats).includes(m.chat)? db.chats[m.chat].banchat : false
    m.isWelcome = Object.keys(db.chats).includes(m.chat)? db.chats[m.chat].welcome : false
    if (Object.keys(db.expired).includes(m.botNumber)) {
        m.isCreator = [ownerNumber + "@s.whatsapp.net", ...Object.keys(db.expired[m.botNumber].vip)].includes(m.sender)
        m.isOwner = m.isCreator? true : Object.keys(db.expired[m.botNumber].owner).includes(m.sender)
        m.isPremium = m.isOwner? true : Object.keys(db.expired[m.botNumber].premium).includes(m.sender)
        m.isSewa = m.isPremium? true : Object.keys(db.expired[m.botNumber].sewa).includes(m.chat)? true : Object.keys(db.chats).includes(m.chat)? db.chats[m.chat].sewa.status : m.key.fromMe
    } else {
        m.isCreator = [ownerNumber + "@s.whatsapp.net"].includes(m.sender)
        m.isOwner = m.isCreator? true : false
        m.isPremium = m.isOwner? true : false
        m.isSewa = m.isPremium? true : m.key.fromMe
    }
    m.messageTimestamp = msg.messageTimestamp
    m.message = msg.message
    m.quoted = msg.message[m.type]?.contextInfo?.quotedMessage? {} : false
    if (m.quoted) {
        m.quoted.key = {
            id: msg.message[m.type].contextInfo.stanzaId,
            fromMe: msg.message[m.type].contextInfo.participant == m.botNumber,
            remoteJid: decodeJid(m.message[m.type].contextInfo.remoteJid || m.chat || m.sender),
            participant: decodeJid(msg.message[m.type].contextInfo.participant)
        }
        m.quoted.chat = m.quoted.key.remoteJid
        m.quoted.isGroup = m.quoted.chat.endsWith("@g.us")
        m.quoted.sender = m.quoted.key.participant
        m.quoted.senderNumber = m.sender.split("@")[0]
        m.quoted.type = Object.keys(msg.message[m.type].contextInfo.quotedMessage)[0]
        if (["viewOnceMessage","viewOnceMessageV2","documentWithCaptionMessage"].includes(m.quoted.type)) {
            msg.message[m.type].contextInfo.quotedMessage = msg.message[m.type].contextInfo.quotedMessage[m.quoted.type].message
        }
        m.quoted.body = m.quoted.type == "conversation"? msg.message[m.type].contextInfo.quotedMessage.conversation : m.quoted.type == "extendedTextMessage"? msg.message[m.type].contextInfo.quotedMessage.extendedTextMessage.text : m.quoted.type == "imageMessage"? msg.message[m.type].contextInfo.quotedMessage.imageMessage.caption : m.quoted.type == "videoMessage"? msg.message[m.type].contextInfo.quotedMessage.videoMessage.caption : m.quoted.type == "viewOnceMessage"? msg.message[m.type].contextInfo.quotedMessage[getContentType(msg.message)]?.caption : m.quoted.type == "viewOnceMessageV2"? msg.message[m.type].contextInfo.quotedMessage[getContentType(msg.message)]?.caption : m.type == "documentWithCaptionMessage"? msg.message[m.type].contextInfo.quotedMessage.documentMessage.caption : ""
        m.quoted.budy = m.quoted.type == "conversation"? msg.message[m.type].contextInfo.quotedMessage.conversation : m.quoted.type == "extendedTextMessage"? msg.message[m.type].contextInfo.quotedMessage.extendedTextMessage.text : ""
        m.quoted.args = m.quoted.body.trim().split(/ +/).slice(1)
        m.quoted.text = m?.quoted?.args?.join(" ")
        m.quoted.pushName = Object.keys(db.users).includes(m.quoted.sender)? db.users[m.quoted.sender].name : "No Name"
        m.quoted.timeWib = Object.keys(time).includes(m.quoted.key.id)? time[m.quoted.key.id].timeWib : ""
        if (m.quoted.timeWib < "23:59:00") {
            m.quoted.ucapanWaktu = "Selamat malam" 
        } 
        if (m.quoted.timeWib < "19:00:00") { 
            m.quoted.ucapanWaktu = "Selamat malam"
        } 
        if (m.quoted.timeWib < "18:00:00") { 
            m.quoted.ucapanWaktu = "Selamat sore" 
        } 
        if (m.quoted.timeWib < "15:00:00") { 
            m.quoted.ucapanWaktu = "Selamat siang"
        } 
        if (m.quoted.timeWib < "11:00:00") { 
            m.quoted.ucapanWaktu = "Selamat pagi"
        } 
        if (m.quoted.timeWib < "06:00:00") { 
            m.quoted.ucapanWaktu = "Selamat pagi"
        }        
        m.quoted.mentionedJid = msg.message[m.type]?.contextInfo?.quotedMessage?.contextInfo?.mentionedJid?.length > 0? msg.message[m.type].contextInfo.quotedMessage.contextInfo.mentionedJid : []
        m.quoted.isMention = m.quoted.mentionedJid.length > 0
        if (db && Object.keys(db.expired).includes(m.botNumber)) {
            m.quoted.isCreator = [ownerNumber + "@s.whatsapp.net", ...Object.keys(db.expired[m.botNumber].vip)].includes(m.quoted.sender)
            m.quoted.isOwner = m.isCreator? true : Object.keys(db.expired[m.botNumber].owner).includes(m.quoted.sender)
            m.quoted.isPremium = m.isOwner? true : Object.keys(db.expired[m.botNumber].premium).includes(m.quoted.sender)
            m.quoted.isSewa = m.isPremium? true : Object.keys(db.expired[m.botNumber].sewa).includes(m.quoted.chat)? true : Object.keys(db.chats).includes(m.quoted.chat)? db.chats[m.quoted.chat].sewa.status : m.quoted.key.fromMe
        } else {
            m.quoted.isCreator = [ownerNumber + "@s.whatsapp.net"].includes(m.quoted.sender)
            m.quoted.isOwner = m.isCreator? true : false
            m.quoted.isPremium = m.isOwner? true : false
            m.quoted.isSewa = m.isPremium? true : m.quoted.key.fromMe
        }
        m.quoted.message = msg.message[m.type].contextInfo.quotedMessage
    } 
    m.input = m.quoted? m.quoted.sender : m.isMention? m.mentionedJid[0] : m.text != "" && !isNaN(m.text.replace(new RegExp("[()+-/ +/]", "gi"), ""))? m.text.replace(new RegExp("[()+-/ +/]", "gi"), "") + "@s.whatsapp.net" : false
    m.reply = (teks, chatId = m.chat) => {
        if (m.replyType == "mess1") {
            sock.sendMessage(chatId, { text: teks, contextInfo: { mentionedJid: [...teks.matchAll(/@(\d{0,16})/g)].map((x) => x[1] + "@s.whatsapp.net"), externalAdReply: { showAdAttribution: true, title: `hallo kak👋 ${m.pushName}`, body: "DONT CLICK HERE", previewType: "PHOTO", thumbnailUrl: (logonya.isLogo? logonya.url : "https://raw.githubusercontent.com/Aztecs444/Elaina/Zeck/" + randomNomor(10) + ".jpg"), sourceUrl: "https://wa.me/" + ownerNumber }}}, { quoted: (m.autoQuoted? m : "") })
        } else if (m.replyType == "mess2") {
            sock.sendMessage(chatId, { text: teks, contextInfo: { mentionedJid: [...teks.matchAll(/@(\d{0,16})/g)].map((x) => x[1] + "@s.whatsapp.net"), forwardingScore: 999, isForwarded: true, showAdAttribution: true, externalAdReply: { title: `hallo kak👋 ${m.pushName}`, body: "DONT CLICK HERE", previewType: "PHOTO", thumbnailUrl: (logonya.isLogo? logonya.url : "https://raw.githubusercontent.com/Aztecs444/Elaina/Zeck/" + randomNomor(10) + ".jpg"), sourceUrl: "https://wa.me/" + ownerNumber }}}, { quoted: (m.autoQuoted? m : "") })
        } else if (m.replyType == "mess3") {
            sock.sendMessage(chatId, { text: teks, contextInfo: { mentionedJid: [...teks.matchAll(/@(\d{0,16})/g)].map((x) => x[1] + "@s.whatsapp.net"), forwardingScore: 10, isForwarded: true, externalAdReply: { showAdAttribution: true, title: `hallo kak👋 ${m.pushName}`, body: "DONT CLICK HERE", previewType: "PHOTO", thumbnailUrl: (logonya.isLogo? logonya.url : "https://raw.githubusercontent.com/Aztecs444/Elaina/Zeck/" + randomNomor(10) + ".jpg"), sourceUrl: "https://wa.me/" + ownerNumber }}}, { quoted: (m.autoQuoted? m : "") })
        } else if (m.replyType == "mess4") {
            sock.sendMessage(chatId, { text: teks, contextInfo: { mentionedJid: [...teks.matchAll(/@(\d{0,16})/g)].map((x) => x[1] + "@s.whatsapp.net"), forwardingScore: 999, isForwarded: true }}, { quoted: (m.autoQuoted? m : "") })
        } else if (m.replyType == "mess5") {
            sock.sendMessage(chatId, { text: teks, contextInfo: { mentionedJid: [...teks.matchAll(/@(\d{0,16})/g)].map((x) => x[1] + "@s.whatsapp.net"), forwardingScore: 10, isForwarded: true }}, { quoted: (m.autoQuoted? m : "") })
        } else if (m.replyType == "mess6") {
            sock.sendMessage(chatId, { text: teks, mentions: [...teks.matchAll(/@(\d{0,16})/g)].map((x) => x[1] + "@s.whatsapp.net") }, { quoted: (m.autoQuoted? m : "") })
        }        
    }
    if (Object.keys(db.users).includes(m.sender) && db.users[m.sender].name !== m.pushName) { db.users[m.sender].name = m.pushName }
    if (Object.keys(db.users).includes(m.sender) && m.isPremium && db.users[m.sender].level !== "Primordial Glory") { db.users[m.sender].level = "Primordial Glory" }
    if (Object.keys(db.users).includes(m.sender) && m.isPremium && !isNaN(db.users[m.sender].limit)) { db.users[m.sender].limit = "Unlimited" }
    if (Object.keys(db.users).includes(m.sender) && m.isPremium && !isNaN(db.users[m.sender].balance)) { db.users[m.sender].balance = "Unlimited" }
    if (Object.keys(db.users).includes(m.sender) && !m.isPremium && db.users[m.sender].level == "Primordial Glory") { db.users[m.sender].level = "Low Tier" }
    if (Object.keys(db.users).includes(m.sender) && !m.isPremium && isNaN(db.users[m.sender].limit)) { db.users[m.sender].limit = limitAwal }
    if (Object.keys(db.users).includes(m.sender) && !m.isPremium && isNaN(db.users[m.sender].balance)) { db.users[m.sender].balance = 0 }
    if (!Object.keys(time).includes(m.key.id)) time[m.key.id] = { timeWib: m.timeWib }
    if (!Object.keys(store).includes(m.botNumber) && !m.key.fromMe) { store[m.botNumber] = { chats: [m.chat] }  }
    if (Object.keys(store).includes(m.botNumber) && !store[m.botNumber].chats.includes(m.chat) && !m.key.fromMe) { store[m.botNumber].chats.push(m.chat) }
    if (m.autoBio) sock.setStatus(`${runtime(process.uptime())}`)
    if (m.autoRead) sock.readMessages([m.key])
    if (m.auto == "recording") {        
        sock.sendPresenceUpdate("recording", m.chat)
    } else if (m.auto == "typing") {        
        sock.sendPresenceUpdate("composing", m.chat)
    } else if (m.auto == "available") {        
        sock.sendPresenceUpdate("available", m.chat)
    } else if (m.auto == "unavailable") {        
        sock.sendPresenceUpdate("unavailable", m.chat)
    }
    if (Object.keys(db.expired).includes(m.botNumber)) {
        let data = Object.keys(db.expired[m.botNumber].owner)
        for (let x of data) {
            if (Date.now() >= db.expired[m.botNumber].owner[x].expired) {
                setTimeout(() => {
                delete db.expired[m.botNumber].owner[x]
                }, 1000)
                m.reply("Maaf kak waktu menjadi owner telah habis", x)
            }
        }
    }
    if (Object.keys(db.expired).includes(m.botNumber)) {
        let data = Object.keys(db.expired[m.botNumber].premium)
        for (let x of data) {
            if (Date.now() >= db.expired[m.botNumber].premium[x].expired) {
                setTimeout(() => {
                delete db.expired[m.botNumber].premium[x]
                }, 1000)
                m.reply("Maaf kak waktu menjadi premium telah habis", x)
            }
        }
    }
    if (Object.keys(db.chats).includes(m.chat) && db.chats[m.chat].sewa.status) {
        if (Object.keys(db.expired[m.botNumber].sewa).includes(m.chat)) {
            db.chats[m.chat].sewa = { status: false, date: calender, expired: 0 }
        } else {
            if (Date.now() >= db.chats[m.chat].sewa.expired) {
                setTimeout(() => {
                db.chats[m.chat].sewa = { status: false, date: calender, expired: 0 }
                }, 3000)
                setTimeout(() => {
                sock.groupLeave(m.chat)
                }, 2000)
                m.reply("Waktu sewa group ini telah habis")
            }
        }
    } else if (Object.keys(db.expired).includes(m.botNumber)) {
        let data = Object.keys(db.expired[m.botNumber].sewa)
        for (let x of data) {
            if (Date.now() >= db.expired[m.botNumber].sewa[x].expired) {
                setTimeout(() => {
                delete db.expired[m.botNumber].sewa[x]
                }, 3000)
                setTimeout(() => {
                sock.groupLeave(x)
                }, 2000)
                m.reply("Waktu sewa group ini telah habis", x)
            }
        }
    }    
    if (m.autoLevel && !m.key.fromMe && !m.isPremium) {
        if (db.users[m.sender].xp <= 3) {
            var levelRole = "Warrior III"
            var levelRoleSebelum = "Low Tier"
            var levelNumber = 3
            var limitNumber = randomNomor(10)
        } else if (db.users[m.sender].xp <= 6) {
            var levelRole = "Warrior II"
            var levelRoleSebelum = "Warrior III"
            var levelNumber = 6
            var limitNumber = randomNomor(15)
        } else if (db.users[m.sender].xp <= 9) {
            var levelRole = "Warrior I"
            var levelRoleSebelum = "Warrior I1"
            var levelNumber = 9
            var limitNumber = randomNomor(20)
        } else if (db.users[m.sender].xp <= 12) {
            var levelRole = "Elite III"
            var levelRoleSebelum = "Warrior I"
            var levelNumber = 12
            var limitNumber = randomNomor(25)
        } else if (db.users[m.sender].xp <= 16) {
            var levelRole = "Elite II"
            var levelRoleSebelum = "Elite III"
            var levelNumber = 16
            var limitNumber = randomNomor(30)
        } else if (db.users[m.sender].xp <= 20) {
            var levelRole = "Elite I"
            var levelRoleSebelum = "Elite II"
            var limitNumber = randomNomor(35)
        } else if (db.users[m.sender].xp <= 24) {
            var levelRole = "Master IV"
            var levelRoleSebelum = "Elite I"
            var levelNumber = 24
            var limitNumber = randomNomor(40)
        } else if (db.users[m.sender].xp <= 29) {
            var levelRole = "Master III"
            var levelRoleSebelum = "Master IV"
            var levelNumber = 29
            var limitNumber = randomNomor(45)
        } else if (db.users[m.sender].xp <= 34) {
            var levelRole = "Master II"
            var levelRoleSebelum = "Master III"
            var levelNumber = 34
            var limitNumber = randomNomor(50)
        } else if (db.users[m.sender].xp <= 39) {
            var levelRole = "Master I"
            var levelRoleSebelum = "Master II"
            var levelNumber = 39
            var limitNumber = randomNomor(55)
        } else if (db.users[m.sender].xp <= 44) {
            var levelRole = "GrandMaster V"
            var levelRoleSebelum = "Master I"
            var levelNumber = 44
            var limitNumber = randomNomor(60)
        } else if (db.users[m.sender].xp <= 50) {
            var levelRole = "GrandMaster IV"
            var levelRoleSebelum = "GrandMaster V"
            var levelNumber = 50
            var limitNumber = randomNomor(65)
        } else if (db.users[m.sender].xp <= 56) {
            var levelRole = "GrandMaster III"
            var levelRoleSebelum = "GrandMaster IV"
            var levelNumber = 56
            var limitNumber = randomNomor(70) 
        } else if (db.users[m.sender].xp <= 62) {
            var levelRole = "GrandMaster II"
            var levelRoleSebelum = "GrandMaster III"
            var levelNumber = 62
            var limitNumber = randomNomor(75)
        } else if (db.users[m.sender].xp <= 68) {
            var levelRole = "GrandMaster I"
            var levelRoleSebelum = "GrandMaster II"
            var levelNumber = 68
            var limitNumber = randomNomor(80)
        } else if (db.users[m.sender].xp <= 74) {
            var levelRole = "Epic V"
            var levelRoleSebelum = "GrandMaster I"
            var levelNumber = 74
            var limitNumber = randomNomor(85)
        } else if (db.users[m.sender].xp <= 81) {
            var levelRole = "Epic IV"
            var levelRoleSebelum = "Epic V"
            var levelNumber = 81
            var limitNumber = randomNomor(90)
        } else if (db.users[m.sender].xp <= 88) {
            var levelRole = "Epic III"
            var levelRoleSebelum = "Epic IV"
            var levelNumber = 88
            var limitNumber = randomNomor(95)
        } else if (db.users[m.sender].xp <= 95) {
            var levelRole = "Epic II"
            var levelRoleSebelum = "Epic III"
            var levelNumber = 95
            var limitNumber = randomNomor(100)
        } else if (db.users[m.sender].xp <= 102) {
            var levelRole = "Epic I"
            var levelRoleSebelum = "Epic II"
            var levelNumber = 102
            var limitNumber = randomNomor(105)
        } else if (db.users[m.sender].xp <= 109) {
            var levelRole = "Legend V"
            var levelRoleSebelum = "Epic I"
            var levelNumber = 109
            var limitNumber = randomNomor(110)
        } else if (db.users[m.sender].xp <= 117) {
            var levelRole = "Legend IV"
            var levelRoleSebelum = "Legend V"
            var levelNumber = 117
            var limitNumber = randomNomor(115)
        } else if (db.users[m.sender].xp <= 125) {
            var levelRole = "Legend III"
            var levelRoleSebelum = "Legend IV"
            var levelNumber = 125
            var limitNumber = randomNomor(120)
        } else if (db.users[m.sender].xp <= 133) {
            var levelRole = "Legend II"
            var levelRoleSebelum = "Legend III"
            var levelNumber = 133
            var limitNumber = randomNomor(125)
        } else if (db.users[m.sender].xp <= 141) {
            var levelRole = "Legend I"
            var levelRoleSebelum = "Legend II"
            var levelNumber = 141
            var limitNumber = randomNomor(130)
        } else if (db.users[m.sender].xp <= 149) {
            var levelRole = "Mythic V"
            var levelRoleSebelum = "Legend I"
            var levelNumber = 149
            var limitNumber = randomNomor(135)
        } else if (db.users[m.sender].xp <= 158) {
            var levelRole = "Mythic IV"
            var levelRoleSebelum = "Mythic V"
            var levelNumber = 158
            var limitNumber = randomNomor(140)
        } else if (db.users[m.sender].xp <= 167) {
            var levelRole = "Mythic III"
            var levelRoleSebelum = "Mythic IV"
            var levelNumber = 167
            var limitNumber = randomNomor(145)
        } else if (db.users[m.sender].xp <= 176) {
            var levelRole = "Mythic II"
            var levelRoleSebelum = "Mythic III"
            var levelNumber = 176
            var limitNumber = randomNomor(150)
        } else if (db.users[m.sender].xp <= 185) {
            var levelRole = "Mythic I"
            var levelRoleSebelum = "Mythic II"
            var levelNumber = 185
            var limitNumber = randomNomor(155)
        } else if (db.users[m.sender].xp <= 194) {
            var levelRole = "Mythical Glory"
            var levelRoleSebelum = "Mythic I"
            var levelNumber = 194
            var limitNumber = randomNomor(160)
        } else {
            var levelRole = "Primordial Glory"
            var levelRoleSebelum = "Mythical Glory"
            var levelNumber = db.users[m.sender].xp
            var limitNumber = randomNomor(165)
        }
        if (Number(db.users[m.sender].xp) == Number(levelNumber)) {
            if (db.users[m.sender].level !== "Primordial Glory") {
                db.users[m.sender].level = levelRole
                db.users[m.sender].balance += Number(limitNumber * 1000)
                db.users[m.sender].limit += Number(limitNumber)
                let teks = "\`\`\`「  LEVEL UP  」\`\`\`\n\n"
                teks += `▸ Name : ${m.pushName}\n`
                teks += `▸ Users : @${m.sender.split("@")[0]}\n`
                teks += `▸ Saldo : + ${Number(limitNumber * 1000)}\n`
                teks += `▸ Limit : + ${Number(limitNumber)}\n`
                teks += `▸ Level : ${levelRoleSebelum} => ${levelRole}\n`
                teks += `▸ Clock : ${m.timeWib}`
                m.reply(teks)
            }
        }
    } 


    return m
}






let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	process.send("reset")
})