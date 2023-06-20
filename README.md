<h1 align="center">Welcome<img src="https://user-images.githubusercontent.com/1303154/88677602-1635ba80-d120-11ea-84d8-d263ba5fc3c0.gif" width="40px" alt=""><br></h1>
<div align="center">
<img src="https://b.top4top.io/p_2703z7ttn0.jpg" width="150" height="150" border="0" alt="PFFP">


[![JavaScript](https://img.shields.io/badge/JavaScript-d6cc0f?style=for-the-badge&logo=javascript&logoColor=white)](https://javascript.com) [![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)

<a href="https://chat.whatsapp.com/DGsLvU2b2IKGsukJJVCaXc"> <img src="https://img.shields.io/badge/whatsapp-Support_Group-blue?style=social&logo=whatsapp" alt="support" /></a>

</div><br />
<br />

## Options Comannd Map() 

Options pada command, yang akan mempermudah kamu untuk membuat/menambahkan fitur<br />

```js
module.exports = {
   commands: <Array>, // Example: ["cmd1","cmd2"]
   cooldown: <NaN>, // Example: 0
   minArgs: <NaN>, // Example: 0
   expectedArgs: <String>, // Example: "<link>"
   example: <String>, // Example: "{prefix}{command} https://chat.whatsapp.com/xxxxxxxxxx"
   isSewa: <Boolean>, // Example: false/teue
   isVip: <Boolean>, // Example: false/teue
   isOwner: <Boolean>, // Example: false/teue
   isPremium: <Boolean>, // Example: false/teue
   isPrivate: <Boolean>, // Example: false/teue
   isGroup: <Boolean>, // Example: false/teue
   isAdmin: <Boolean>, // Example: false/teue
   isBotAdmin: <Boolean>, // Example: false/teue
   isMedia: {
        isImage: <Boolean>, // Example: false/teue
        isVideo: <Boolean>,  // Example: false/teue
        isDocument: <Boolean>, // Example: false/teue
        isViewOnce: <Boolean>, // Example: false/teue
        isQuotedMedia: {
		       	  isQuotedImage: <Boolean>, // Example: false/teue
				  isQuotedVideo: <Boolean>, // Example: false/teue
			      isQuotedAudio: <Boolean>, // Example: false/teue
			      isQuotedSticker: <Boolean>, // Example: false/teue
			      isQuotedDocument: <Boolean>, // Example: false/teue
			      isQuotedViewOnce: <Boolean>, // Example: false/teue
			      isQuotedContact: <Boolean> // Example: false/teue
				}
},
isLimit: <Boolean>, // Example: false/teue
isWait: <Boolean>, // Example: false/teue
callback: async() => {}
}
```

## Options Comannd case

Opsi yang ada ✅ berarti wajib di tambahkan.<br />

```js
case "name": 
try{
//sock.sendMessage(m.chat, { text: "Hello world" })
cmdSuccess(command, "case") //✅
} catch (e) {
cmdFailed(command, e, "case") //✅
}
break
```


## Request atau report bug

Untuk request atau report bug bisa chat saya disini [Whatsapp](https://wa.me/62895623764600)


### Clone Repo

```bash
# clone repo
git clone https://github.com/FanDev404/Elaina-baileys
# ubah posisi direktori kamu
cd Elaina-baileys
# install module
npm i
# start bot
npm start
```

# Thanks To

-   [`Amirul Dev`](https://github.com/amiruldev20)
-   [`Fan Dev`](https://github.com/FanDev404)
-   [`Lol Human`](https://github.com/LoL-Human)
