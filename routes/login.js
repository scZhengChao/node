let express = require('express');
let router = express.Router();
let mg = require('./mymg')

//象印
router.get('/', (req,res,next) => {
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);//允许当前跨域
    //读库
    mg({
        dbname: 'vue',
        collectionName:'user'
    }, (collection, client) => {
        collection.find({ name: req.query.name }).toArray((err, data) => {
            if (data.length > 0) {
                if (data[0].password == req.query.password) {
                        req.session['user_id'] = req.query.name,
                        res.send({ err: 0, msg: '登陆成功', data: data })
                    // console.log('loginssssssssss',req.session)
                } else {
                    res.send({err:1,msg:"用户名或密码错误"})
                }   
            } else {
                res.send({err:1,msg:"用户未注册"})
            }
            client.close()
        })
    }) 
})
module.exports = router