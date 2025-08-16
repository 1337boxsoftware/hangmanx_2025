"use strict"
import ServerGame   from './Game.js'

const port = 3000 // 30001 //process.env.PORT || 80
new ServerGame(20, port, 5, false)
console.log("websocket server launched")