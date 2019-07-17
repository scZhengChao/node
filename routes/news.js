let express = require('express');
let router = express.Router();
let mg = require('./mymg')

//象印
router.get('/', (req,res,next) => {
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);//允许当前跨域
    
    //读库
    mg({
        dbname: 'vue',
        collectionName:'news'
    }, (collection,client) => {
            collection.find({}).toArray((err,data) => {
                if (data.length > 0) {
                    res.send(data)
                } else {
                    res.send({ error: 1, msg: err })
                    client.close();
                }
            })
    })
})
module.exports = router