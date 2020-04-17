const express = require('express'),
    app = express(),
    path = require('path'),
    bodyParser = require('body-parser'),
    port = process.env.PORT || 4000;
var data = require('../data/db');
var cors = require('cors');


app.use(cors())
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.json())
app.post('/addmovies', (req, res) => {
    res.statusCode = 200;
    // res.setHeader('Content-Type', 'text/plain');
    // res.send(`data received`)

    console.log(req.body);

})

app.listen(port, () => console.log(`Server is running on port ${port}`));