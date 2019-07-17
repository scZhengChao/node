module.exports = (io) => {
    //链接
    io.on('connect', (socket) => {
        //接收
        io.emit('message',{msg:'我已经登录上了'})
        console.log('已经连接上')
        socket.on('xiaobian', (data) => {
            
            console.log(data)
            //广播给所有的用户 io
            io.emit('message',{msg:data.msg})
        })
        socket.on('disconnect', (data) => {
            console.log('已经下线了',data)
        })
    })

}