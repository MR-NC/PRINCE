const util = require("util")
const { exec } = require("child_process")
const { githubEmail, githubUser } = require("@config")
module.exports = {
    commands: ["backup"],
    cooldown: 13,
    isSewa: true,
    isOwner: true,
    callback: async ({ m }) => {
        exec(`git config --global user.email "${githubEmail}" && git config --global user.name "${githubUser}" && git add . && git commit -m "Updating" && git push`, (stdout, err) => {
        if (stdout) return m.reply(util.format(stdout))
        if (err) return m.reply(util.format(err))
        })
    }
}