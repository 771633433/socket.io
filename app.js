var http=require('http')
var fs=require('fs')
var count=0

var server=http.createServer((req,res)=>{
	fs.readFile('./index.html',(err,data)=>{
		res.writeHead(200,{'Content-Type':'text/html'})
		res.end(data,'utf-8')
	})
}).listen(3000,'127.0.0.1')

console.log('服务器运行在 127.0.0.1:3000端口')

var io=require('socket.io').listen(server)

io.sockets.on('connection',(socket)=>{
	// 写一个count用来计数当前一共有多少在线人数
	count++;
	console.log(`当前在线人数: ${count}`);
	socket.on('message',(data)=>{
		socket.broadcast.emit('push message',data)
	})

	socket.on('disconnect',(socket)=>{
		count--;
		console.log(`当前在线人数: ${count}`);
	})
})










