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
            collection.find({ name: req.query.name }).toArray((err, result) => {
                if (result.length > 0) {
                    res.send({err:1,msg:"用户已注册"})
                } else {
                    collection.insertOne(req.query, (err, result) => {
                        res.send({err:0,msg:'注册成功',data:result})
                    })
                }
            })
    })
})
module.exports = router