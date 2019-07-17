let express = require('express');
let router = express.Router();
let mg = require('./mymg')

//象印
router.get('/', (req,res,next) => {
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);//允许当前跨域
    //读库
    // console.log('reqqqqqqqqqqqqq',req.session['user_id'])
    if (! req.session['user_id']) {
        res.send({err:1,msg:'用户未登录'})
    }else {
        mg({
            dbname: 'vue',
            collectionName:'user'
        }, (collection, client) => {
            collection.find({ name: req.session['user_id'] }).toArray((err, data) => {
                if (data.length > 0) {
                    res.send({ err: 0, msg: data });
                } else {
                    res.send({err:1,msg:"用户未找到"})
                };
                client.close()
            })
        }) 
    }
    
})
module.exports = router