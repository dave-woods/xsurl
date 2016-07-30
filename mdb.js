function setup() {
    //lets require/import the mongodb native drivers.
    const mongodb = require('mongodb');
    
    //We need to work with "MongoClient" interface in order to connect to a mongodb server.
    const MongoClient = mongodb.MongoClient;
    
    // Connection URL. This is where your mongodb server is running.
    
    //(Focus on This Variable)
    const url = process.env.MONGOLAB_URI;      
    //(Focus on This Variable)
    
    // Use connect method to connect to the Server
      MongoClient.connect(url, function (err, db) {
      if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
      } else {
        console.log('Connection established to', url);
    
        // do some work here with the database.
    
        //Close connection
        db.close();
      }
    });
}

module.exports.setup = setup;