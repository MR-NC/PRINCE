const moment = require("moment-timezone")
module.exports = {
    commands: ["infogc"],
    cooldown: 13,
    isSewa: true,
    isGroup: true,
    callback: async ({ sock, m, isBotGroupAdmins, groupName, groupMembers, groupAdmins, groupOwner, groupMetadata }) => {
        let teks = "\`\`\`「  INFO GROUP  」\`\`\`\n\n"
        teks += ` *•* Name : ${groupName}\n`
        teks += ` *•* Owner : ${groupOwner !== undefined ? "@" + groupOwner.split("@")[0] : "Tidak diketahui"}\n`
        teks += ` *•* Creation : ${moment(groupMetadata.creation * 1000).tz("Asia/Jakarta").format("DD/MM/YYYY HH:mm:ss")}\n`
        teks += ` *•* Total Admins : ${groupAdmins.length}\n`
        teks += ` *•* Total Members : ${groupMembers.length}\n`
        teks += ` *•* Link Group : ${isBotGroupAdmins? "https://chat.whatsapp.com/" + await sock.groupInviteCode(m.chat) : "Botz Is Not Admin"}\n`
        teks += ` *•* Anti Link : ${m.isAntiLink? "ON✅" : "OFF❌"}\n`        
        teks += ` *•* Anti Link Youtube : ${m.isAntiLinkYoutube? "ON✅" : "OFF❌"}\n`
        teks += ` *•* Anti Link Facebook : ${m.isAntiLinkFacebook? "ON✅" : "OFF❌"}\n`
        teks += ` *•* Anti Link Instagram : ${m.isAntiLinkInstagram? "ON✅" : "OFF❌"}\n`
        teks += ` *•* Anti Link Telegram : ${m.isAntiLinkTelegram? "ON✅" : "OFF❌"}\n`
        teks += ` *•* Anti Link Whatsapp : ${m.isAntiLinkWhatsapp? "ON✅" : "OFF❌"}\n`
        teks += ` *•* Anti Link Tiktok : ${m.isAntiLinkTiktok? "ON✅" : "OFF❌"}\n`
        teks += ` *•* Anti Link Twitter : ${m.isAntiLinkTwitter? "ON✅" : "OFF❌"}\n`
        teks += ` *•* Anti Tag : ${m.isAntiTag? "ON✅" : "OFF❌"}\n`
        teks += ` *•* Anti Virtex : ${m.isAntiVirtex? "ON✅" : "OFF❌"}\n`
        teks += ` *•* Anti Asing : ${m.isAntiAsing? "ON✅" : "OFF❌"}\n`
        teks += ` *•* Anti Toxic : ${m.isAntiToxic? "ON✅" : "OFF❌"}\n`
        teks += ` *•* Anti Sange : ${m.isAntiSange? "ON✅" : "OFF❌"}\n`
        teks += ` *•* Anti View Once : ${m.isAntiViewOnce? "ON✅" : "OFF❌"}\n`
        teks += ` *•* Auto React Group : ${m.isAutoReactGroup? "ON✅" : "OFF❌"}\n`
        teks += ` *•* Auto Respon Group : ${m.isAutoResponGroup? "ON✅" : "OFF❌"}\n`
        teks += ` *•* Mute Group : ${m.isBanChat? "ON✅" : "OFF❌"}\n`
        teks += ` *•* Welcome Group : ${m.isWelcome? "ON✅" : "OFF❌"}`
        await m.reply(teks)
    }
}