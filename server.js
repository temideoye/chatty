const express = require('express')();
const server = require('http').createServer(express);
const io = require('socket.io')(server);

io.on('connection', socket => {
	socket.on('SEND_MESSAGE', data => {
		const payload = Object.assign({}, data, { type: 'RECEIVED' });
		console.log('\n Sent Message =>', payload, '\n');
		socket.broadcast.emit('NEW_MESSAGE', payload);
	});
});

server.listen(8080, () => console.log('Server is listening on 8080'));
