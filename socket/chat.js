//在线用户socket
var onlineUsers = [];

//当前在线人数:
var onlineCount = 0;

//当前在线用户名
var onlineName = [];

module.exports = (io) => {
    io.on('connect', (socket) => {
        socket.on('login', (data) => {
            console.log(data)
            //将新加入用户的唯一标识,当做socket的名字,后面退出的时候会用到
            socket.name = data.username;
            //检查在线列表,如果不在就加入
            if (!onlineUsers.hasOwnProperty(data.username)) {
                //将socket 当家到唯一的用户标识上
                onlineUsers[data.username] = socket
                //添加名字
                onlineName.push(data.username)
                //在线人数
                onlineCount++
            }
            //向所有用户广播加入聊天室
            io.emit('login', { onlineCount, username: data.username, msg: `欢迎${data.username}加入聊天室` })
            //在线广播列表跟新,跟新人数和名字
            io.emit('update',{onlineCount,onlineName})

        })
        socket.on('disconnect', () => {  //监听用户下线
            io.emit('logout', { username: socket.name, msg: socket.name + "下线了" }) //下线通知
            if (onlineUsers[socket.name]) {
                delete onlineUsers[socket.name] //删除用户即他的socket
                onlineName.splice(onlineName.indexOf(socket.name), 1) //删除用户名
                onlineCount-- //更新在线人数
            }
            io.emit('update', { onlineName, onlineCount })  //跟新名字和人数
        })

        //接收非指定
        socket.on('message', (data) => {
            data.username = socket.username
            io.emit('message',data)
        })
        //接收指定的消息
        socket.on('privateMessage', (toUserName,data,callback) => {
            callback(`你发消息给${toUserName}:${data.msg}`) //回执
            data.formUserName = socket.name
            onlineUsers[toUserName] && onlineUsers[toUserName].emit('privateMessage',data)
        })
    })
}