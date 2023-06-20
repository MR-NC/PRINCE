module.exports = {
    commands: ["antitoxic"],
    cooldown: 13,
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    isBotAdmin: true,
    callback: async ({ m }) => {
        if (m.args[0] == "on" || m.args[0] == "1") {
        if (m.isAntiToxic == true) return setReply("Sudah active")
        db.chats[m.chat].antitoxic = true
        setReply("Mode anti toxic telah active")
        } else if (m.args[0] == "off" || m.args[0] == "0") {
        if (m.isAntiToxic == false) return setReply("Sudah non active")
        db.chats[m.chat].antitoxic = false
        setReply("Mode anti toxic telah non active")
        } else {
        setReply("\`\`\`「 MODE ANTI TOXIC 」\`\`\`\n\n0. off\n1. on")
        }
    }
}