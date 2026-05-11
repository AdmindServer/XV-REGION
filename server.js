const {
default: makeWASocket,
useMultiFileAuthState
} = require("@whiskeysockets/baileys")

const express =
require("express")

const app =
express()

let sock

async function start(){

const {
state,
saveCreds
} =
await useMultiFileAuthState(
"./session"
)

sock =
makeWASocket({
auth:state
})

sock.ev.on(
"creds.update",
saveCreds
)

console.log(
"BOT AKTIF"
)

}

start()

app.get(
"/pair",
async(req,res)=>{

let number =
req.query.number

try{

let code =
await sock.requestPairingCode(
number
)

res.json({
status:true,
code
})

}catch(e){

res.json({
status:false,
msg:"gagal pairing"
})

}

})

app.listen(3000,()=>{

console.log(
"SERVER RUNNING"
)

})
