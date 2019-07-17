let express = require('express');
let router = express.Router();
let mg = require('./mymg.js');
router.get('/', (req, res, next) => {
    
    req.session['user_id'] = undefined;//删除cookie 和后台的req.session
    res.send({err:0,msg:'退出成功'})
    // mg({
    //     dbname: 'vue',
    //     collectionName:'user'
    // }, (collection, client) => {
            
    // })
})

module.exports = router;
