const path = require("path") 
const { spawn } = require("child_process")


function start(file) {
    let args = [path.join(__dirname, file), ...process.argv.slice(2)];
    let p = spawn(process.argv[0], args, {
        stdio: ["inherit", "inherit", "inherit", "ipc"]
    })
        .on("message", data => {
            switch (data) {
            case "reset":
                p.kill()
                start(file)
            break
            case "stopped":
                p.kill()
            break
            case "uptime":
                p.send(process.uptime())
            break
            
            }
        })
        .on("exit", () => {
            start(file)
        })
}

start("main.js")