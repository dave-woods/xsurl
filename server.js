const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const path = require('path');
const validUrl = require('valid-url');
const mdb = require('./mdb');

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/n/*', function(req, res) {
    const original = req.params[0];
    if (validUrl.isWebUri(original))
    {
        mdb.find({originalURL: original}, function(err, results) {
            if (err) throw err;
            if (results.length > 0)
            {
                const xsurl = req.protocol + '://' + req.get('host') + '/' + results[0].urlKey;
                res.json({original_url: original, short_url: xsurl});
            }
            else
            {
                mdb.count(function(err, result) {
                    if (err) throw err;
                    const urlID = result + 1;
                    const xsurl = req.protocol + '://' + req.get('host') + '/' + urlID;
                	res.json({original_url: original, short_url: xsurl});
                    mdb.insert({urlKey: urlID, originalURL: original}, function(err, data) {
                        if (err) throw err;
                        console.log(JSON.stringify(data));
                    });
                });
            }
        });
    }
    else
    {
        res.json({
            error: "That didn't look like a valid URL."
        });
    }
});

app.get('/:urlKey', function(req, res) {
    const urlKey = parseInt(req.params.urlKey, 10);
    if (isNaN(urlKey))
    {
        res.json({
            error: "That URL doesn\'t seem to exist."
        });
    }
    else
    {
        mdb.find({urlKey: urlKey}, function(err, results) {
            if (err) throw err;
            if (results.length > 0)
            {
                const goTo = results[0].originalURL;
                if (goTo !== undefined)
                    res.redirect(goTo);
                else
                {
                    res.json({
                        error: "That URL doesn\'t seem to exist."
                    });
                }
            }
            else
            {
                res.json({
                    error: "That URL doesn\'t seem to exist."
                });
            }
        });
    }
});

app.listen(port, function() {
	console.log(`The app is listening on port ${port}`);
});
