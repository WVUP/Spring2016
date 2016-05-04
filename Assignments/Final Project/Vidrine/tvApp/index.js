var express = require('express');

var bodyParser = require('body-parser');

var mongodb = require('mongodb');

var app = express();

var _db;

var mongoClient = mongodb.MongoClient;

app.use(bodyParser.json());

var connString = 'mongodb://admin1:12345@ds061415.mlab.com:61415/wvuptvshows';

app.get('/api/all', function (req, res) {

	var collection = _db.collection('tvshows');

	collection.find({}, function (err, cursor) {

		if (err)
			return res.send(err);

		cursor.toArray(function(err, doc) {

			if (err)
				return res.send(err);

			res.send(doc);

		});

	});

});

app.get('/api/preview', function (req, res) {

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

app.get('/api/popular', function (req, res) {

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

app.get('/api/recent', function (req, res) {

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

app.post('/api/post', function (req, res) {

	console.log(req.body);
})


app.use(express.static('public'));

mongoClient.connect(connString, function(err, db) {

	if (err) {
		return console.log(err);
	}

	console.log("OK")

	app.listen(3000, function () {

		console.log("Now listening on port 3000.");

	})

	_db = db;

})
