const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const validUrl = require('valid-url');
const mdb = require('./mdb');

app.get('/', function(req, res) {
	res.send('Add a new URL!');
});

app.get('/n/*', function(req, res) {
    console.log(req.params);
    const original = req.params[0];
    if (validUrl.isWebUri(original))
    {
        mdb.setup();
    	const resObj = {original_url: original, short_url: null};
                
    	res.json(resObj);
    }
    else
    {
        res.json({
            error: "That didn't look like a valid URL."
        });
    }
});

app.listen(port, function() {
	console.log(`The app is listening on port ${port}`);
});
