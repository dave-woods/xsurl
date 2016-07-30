function insert(document, next) {
    const mongo = require('mongodb').MongoClient;
    mongo.connect(process.env.MONGOLAB_URI, function (err, db) {
        if (err)
            console.log('Unable to connect to the mongoDB server. Error:', err);
        else
        {
            db.collection('shortURLs').insert(document, function(err, data) {
                db.close();
                next(err, data);
            });
        }
    });
}

function count(next) {
    const mongo = require('mongodb').MongoClient;
    mongo.connect(process.env.MONGOLAB_URI, function (err, db) {
        if (err)
            console.log('Unable to connect to the mongoDB server. Error:', err);
        else
        {
            db.collection('shortURLs').count().then(function(result) {
                db.close();
                next(null, result);
                
            }, function(err) {
                db.close();
                next(err, null);
            });
        }
    });
}

function find(key, next) {
    const mongo = require('mongodb').MongoClient;
    mongo.connect(process.env.MONGOLAB_URI, function (err, db) {
        if (err)
            console.log('Unable to connect to the mongoDB server. Error:', err);
        else
        {
            db.collection('shortURLs').find(key).toArray(function(err, documents) {
                db.close();
                next(err, documents);
            });
        }
    });
}

module.exports = {
    insert: insert,
    count: count,
    find: find
};