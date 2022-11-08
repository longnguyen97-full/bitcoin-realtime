const express = require('express')
const app = express()

const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')

// to delay to fake realtime
const delay = require('delay')

// socket instance
const io = new Server(server)

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html')
})

// automatically execute with each user is connecting to server
io.on('connection', (socket) => {
	// get and handle message when submit form
	socket.on('on-chat', data => {
		// send message to other users on user-chat channel
		io.emit('user-chat', data)
	})
})

server.listen(3000, () => {
	console.log('listening on port 3000')
})

async function broadcastBitcoinPrice() {
	while(true) {
		// dummy price
		const price = 31570 + Math.random() * 400
		io.emit('bitcoin-price', {
			price: price.toFixed(2) // Math.random function return so many zero, use toFixed to reduce them
		})
		await delay(1000) // wait for 1 second to run
	}
}

broadcastBitcoinPrice()
