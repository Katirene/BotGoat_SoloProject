var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var postTime = require('./routes/postTime');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('port', process.env.PORT || 5000);

app.use('/postTime', postTime);



app.use(express.static('public'));
app.use(express.static('public/views'));
app.use(express.static('public/scripts'));
app.use(express.static('public/styles'));
app.use(express.static('public/vendors'));

app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), function() {
    console.log('Listening on port: ', app.get('port'));
});