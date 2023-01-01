require("dotenv").config();
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {})
const antreanRouter = require('./api/antrean/antrean.router')
const antreanPoliRouter = require('./api/antrean-poli/antrean.router')
const antreanFarmasiRouter = require('./api/antrean-farmasi/antrean.router')
const path = require('path')

// const apiRouter = require('./routes')
// app.use('/api', apiRouter)

app.use(express.json())

connections = [];

server.listen(process.env.APP_PORT, ()=>{
	console.log('server is runing port', process.env.APP_PORT)
})

io.sockets.on('connection', function(socket){
	connections.push(socket);
	// console.log('Terhubung : %s sockets sedang terhubung', connections.length)

	//Disconect
	socket.on('disconnect', function(data){
		connections.splice(connections.indexOf(socket), 1);
		// console.log('Terputus : %s sisa sockets sedang terhubung', connections.length)
	})

	//Send Message
	socket.on('retry', function(data){
		// console.log(data.layanan+': antrean nomor '+data.abjad+'-'+data.nomor+' loket '+data.loket)
		console.log('nomor antrean '+data.abjad+'-'+data.nomor+' '+data.layanan+' '+data.pemanggil)
		io.sockets.emit('ulang', {layanan:data.layanan,abjad:data.abjad,nomor:data.nomor, pemanggil:data.pemanggil})
	})

	//Send Message
	socket.on('retry-poli', function(data){
		console.log('nomor antrean '+data.nomor+' '+data.layanan+' '+data.nm_depo)
		io.sockets.emit('ulang-poli', {layanan:data.layanan,nomor:data.nomor, pemanggil:data.pemanggil, nm_depo:data.nm_depo,nm_dokter:data.dokter})
	})

	//Send Message
	socket.on('retry-farmasi', function(data){
		console.log(data.pasien+' pasien poli '+data.poli+' ke unit farmasi')
		io.sockets.emit('ulang-farmasi', {pasien:data.pasien,poli:data.poli})
	})
	
	//Send Message
	socket.on('try', function(data){
		// console.log(data.layanan+': antrean nomor '+data.abjad+'-'+data.nomor+' loket '+data.loket)
		console.log(data.layanan+' '+data.pemanggil)
		io.sockets.emit('tes', {layanan:data.layanan, pemanggil:data.pemanggil})
	})

	socket.on('stop', function(data){
		console.log('Sound stop')
		io.sockets.emit('berhenti')
	})
})

// === ROUTE ===
app.use('/api/antrean', antreanRouter)
app.use('/api/antrean-poli', antreanPoliRouter)
app.use('/api/antrean-farmasi', antreanFarmasiRouter)
app.use('/assets',express.static(path.join(__dirname,'src')))

// === REDIRECT ==
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html')
})

//ADMISI
app.get('/kiosk-admisi', (req, res) => {
	res.sendFile(__dirname + '/pages/admisi/kiosk.html')
})

app.get('/admisi-1', (req, res) => {
	res.sendFile(__dirname + '/pages/admisi/loket1.html')
})

app.get('/admisi-2', (req, res) => {
	res.sendFile(__dirname + '/pages/admisi/loket2.html')
})

app.get('/sound', (req, res) => {
	res.sendFile(__dirname + '/pages/sound.html')
})

app.get('/display-admisi', (req, res) => {
	res.sendFile(__dirname + '/pages/admisi/display.html')
})

app.get('/poli', (req, res) => {
	res.sendFile(__dirname + '/pages/poli/poli.html')
})

app.get('/display-poli', (req, res) => {
	res.sendFile(__dirname + '/pages/poli/display.html')
})

app.get('/farmasi', (req, res) => {
	res.sendFile(__dirname + '/pages/farmasi/farmasi.html')
})

app.get('/favicon.ico', (req, res) => {
	res.sendFile(__dirname + '/pages/admisi/other.html')
})

