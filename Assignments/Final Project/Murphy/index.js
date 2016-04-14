// dependencies ---------------------------------------------------------------
var express = require('express');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');

// variables ------------------------------------------------------------------
var app = express();
var mongoClient = mongodb.MongoClient;
var _db;
var port = process.env.PORT || 3000;

// configuration -------------------------------------------------------------
app.use(express.static(__dirname + '/public')); 

// connects to database ------------------------------------------------------
var connString = 'mongodb://admin:testing@ds061405.mongolab.com:61405/wvup_shows';

mongoClient.connect(connString, function(err, db) {
	if(err)
		return console.log(err);
	console.log("\n... connected to database ...");

	app.listen(port, function() {
		console.log('... the magic happens on port ' + port + '...\n');
	});

	_db = db;
});

// routes --------------------------------------------------------------------
app.get('/preview', function (req, res) {

	var collection = _db.collection('tvshows');

	collection.find({preview: 'yes'}, function (err, cursor) {
		if (err)
			return res.send(err);
		cursor.toArray(function(err, doc) {
			if (err)
				return res.send(err);
			res.send(doc);
		});
	});
});

app.get('/popular', function (req, res) {

	var collection = _db.collection('tvshows');

	collection.find({popular: 'yes'}, function (err, cursor) {
		if (err)
			return res.send(err);
		cursor.toArray(function(err, doc) {
			if (err)
				return res.send(err);
			res.send(doc);
		});
	});
})

app.get('/recent', function (req, res) {

	var collection = _db.collection('tvshows');

	collection.find({recent: 'yes'}, function (err, cursor) {
		if (err)
			return res.send(err);
		cursor.toArray(function(err, doc) {
			if (err)
				return res.send(err);
			res.send(doc);
		});
	});
})
