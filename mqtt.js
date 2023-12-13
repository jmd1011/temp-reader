// const mqtt = require('mqtt')

/***
    * Browser
    * This document explains how to use MQTT over WebSocket with the ws and wss protocols.
    * EMQX's default port for ws connection is 8083 and for wss connection is 8084.
    * Note that you need to add a path after the connection address, such as /mqtt.
    */
const url = 'ws://broker.emqx.io:8083/mqtt'
/***
    * Node.js
    * This document explains how to use MQTT over TCP with both mqtt and mqtts protocols.
    * EMQX's default port for mqtt connections is 1883, while for mqtts it is 8883.
    */
// const url = 'mqtt://broker.emqx.io:1883'

// Create an MQTT client instance
const options = {
  // Clean session
  clean: true,
  connectTimeout: 4000,
  // Authentication
  clientId: 'woot-woot',
  username: 'emqx',
  password: 'public',
}

const client  = mqtt.connect(url, options)

client.on('connect', function () {
  console.log('Connected')
  // Subscribe to a topic
  client.subscribe('lucy-temp', function (err) {
    if (!err) {
      console.log("we subscribed")
    }
  })
})

// Receive messages
client.on('message', function (topic, message) {
  // message is Buffer
  let test = message.toString()
  let tempInC = parseFloat(test) / 1000
  let tempInF = convertCtoF(tempInC)
  $('#temp').text(tempInF.toFixed(2) + "°F")
  $('#temp-c').text(tempInC.toFixed(2) + "°C")
  // client.end()
})

function convertCtoF(tempInC) {
  return tempInC * 9 / 5 + 32
}
