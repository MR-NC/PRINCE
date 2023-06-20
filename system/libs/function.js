const { jidDecode } = require("baileys")
const chalk = require("chalk") 
const fs = require("fs") 
const axios = require("axios") 
const path = require("path")
const jimp = require("jimp")

const decodeJid = (jid) => {
        if (!jid) return jid
        if (/:\d+@/gi.test(jid)) {
        let decode = jidDecode(jid) || {}
        return decode.user && decode.server && decode.user + "@" + decode.server || jid
        } else return jid
}



const reloadFile = (file) => {
let files = require.resolve(path.join(__dirname.split("system/libs")[0], file))
fs.watchFile(files, () => {
    fs.unwatchFile(files)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${file}`)
    delete require.cache[files]
    process.send("reset")
})
}

let d = new Date
let gmt = new Date(0).getTime() - new Date("1 Januari 2021").getTime()
let weton = ["Pahing", "Pon","Wage","Kliwon","Legi"][Math.floor(((d * 1) + gmt) / 84600000) % 5]
let week = d.toLocaleDateString("id", { weekday: "long" })
let calender = d.toLocaleDateString("id", {
day: "numeric",
month: "long",
year: "numeric"
})


const getBuffer = async (url, options) => {
try {
options ? options : {}
const res = await axios({method: "get", url, headers: { "DNT": 1,
"Upgrade-Insecure-Request": 1
},
...options,
responseType: "arraybuffer"
})
return res.data
} catch (e) {
console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ ERROR ]"), `${e}`)
}
}



const generateProfilePicture = async (buffer) => {
try{
const Jimp = await jimp.read(buffer)
const min = Jimp.getWidth()
const max = Jimp.getHeight()
const cropped = Jimp.crop(0, 0, min, max)
return {
img: await cropped.scaleToFit(720, 720).getBufferAsync(jimp.MIME_JPEG),
preview: await cropped.scaleToFit(720, 720).getBufferAsync(jimp.MIME_JPEG)
}
} catch {}
}




const toFirstCase = (str) => {
let first = str.split(" ").map((nama) => nama.charAt(0).toUpperCase() + nama.slice(1)).join(" ")
return first
}

const runtime = (time) => {
time = Number(time)
const teks = ""
const years = Math.floor(time / (3600 * 8640))
const months = Math.floor(time / (3600 * 720))
const weeks = Math.floor(time / (3600 * 168))
const days = Math.floor(time / (3600 * 24))
const hours = Math.floor((time % (3600 * 24)) / 3600)
const minutes = Math.floor((time % 3600) / 60)
const seconds = Math.floor(time % 60)
if (years > 0) {
teks += `${years} years, `
}
if (months > 0) {
teks += `${months} months, `
}
if (weeks > 0) {
teks += `${weeks} weeks, `
}
if (days > 0) {
teks += `${days} days, `
}
if (hours > 0) {
teks += `${hours} hours, `
}
if (minutes > 0) {
teks += `${minutes} minutes, `
}
if (seconds > 0) {
teks += `${seconds} seconds`
}
return teks
}

const randomNomor = (angka) => {
return Math.floor(Math.random() * angka) + 1
}

const pickRandom = (list) => {
return list[Math.floor(Math.random() * list.length)]
}

const sleep = async (ms) => {
return new Promise(resolve => setTimeout(resolve, ms));
}



module.exports = { week, pickRandom, sleep, generateProfilePicture, randomNomor, decodeJid, reloadFile, runtime, calender, getBuffer, toFirstCase }


let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	process.send("reset")
})