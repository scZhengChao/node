let mongodb = require('mongodb'); //引入对象
let MongoClient = mongodb.MongoClient; //建立连接

module.exports = (options,callback) => {
    options = options || {};
    options.url = options.url || 'mongodb://127.0.0.1:27017';
    options.dbname = options.dbname || null;
    options.collectionName = options.collectionName || null;
    MongoClient.connect(options.url, function (err, client){
        const db = client.db(options.dbname);
        const collection = db.collection(options.collectionName)
        callback(collection,client)
    })
}