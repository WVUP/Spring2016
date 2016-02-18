var express = require("express");

var bodyParser = require("body-parser");

var app = express();

var mongodb = require("mongodb");

var MongoClient = mongodb.MongoClient;

app.use(bodyParser.json());

app.get('/', function (req, res) {
	res.send("Check out these bands son");
})

var _db;

app.get('/api/bands', function (req, res) {

	var collection = _db.collection('wvuptvshows');
	var _bands = [];

	collection.find({}, function (err, cursor) {

		if(err) {
			return res.send(err)
		}

		cursor.toArray( function(err, docs) {
			if(err) {
				return res.send(err)
			}
			for (var i = 0; i < docs.length; i++) {
				_bands.push(docs[i].band);
			}
			
			var x = 0;
	 		var y = 1;

	 		while (y < _bands.length) {
	 			if (_bands[y] == _bands[x]) {
	 				_bands.splice(y, 1)
	 			}
	 			else {
	 				x += 1;
	 				y += 1;
	 			}
	 		}

	 		res.send(_bands);
		});
	});

});

app.get('/api/bands/:band', function (req, res) {

	 var collection = _db.collection('wvuptvshows');

	 var _band = req.params.band;

	 var query = {
	 	band: {
	 		$regex: _band,
	 		$options: 'i'
	 	}
	 };

	 collection.find(query, function (err, cursor) {
	 	if(err) {
	 		return res.send(err);
	 	}
	 	cursor.toArray(function (err, docs) {
	 		if(err) {
	 			return res.send(err)
	 		}
	 		res.send(docs);
	 	});
	 });
});

app.get('/api/bands/:band/albums', function (req, res) {

	var collection = _db.collection('wvuptvshows');
	var albumNames = [];
	var query = {
	 	band: {
	 		$regex: req.params.band,
	 		$options: 'i'
	 	}
	 };

	 collection.find(query, function (err, cursor) {
	 	if(err) {
	 		return res.send(err);
	 	}
	 	cursor.toArray(function (err, docs) {
	 		if(err) {
	 			return res.send(err)
	 		}
	 		for (var i = 0; i < docs.length; i++) {
	 			albumNames.push(docs[i].album);	
	 		}

	 		var x = 0;
	 		var y = 1;

	 		while (y < albumNames.length) {
	 			if (albumNames[y] == albumNames[x]) {
	 				albumNames.splice(y, 1)
	 			}
	 			else {
	 				x += 1;
	 				y += 1;
	 			}
	 		}
	
	 		res.send(albumNames);
	 			
	 	});

	}); 	
});

app.get('/api/bands/:band/albums/:album', function (req, res) {

	var collection = _db.collection('wvuptvshows');
	var songs = [];

	var query = {
	 	band: {
	 		$regex: req.params.band,
	 		$options: 'i'
	 	},
	 	album: {
	 		$regex: req.params.album,
	 		$options: 'i'
	 	}
	 };

	 collection.find(query, function (err, cursor) {

	 	if (err) {
	 		return res.send(err)
	 	}

	 	cursor.toArray(function (err, docs) {

	 		if (err) {
	 			return res.send(err)
	 		}

	 		for (var i = 0; i < docs.length; i++) {
	 			songs.push(docs[i].song);
	 		}

	 		res.send(songs);

	 	});

	 });

});

var connString = 'mongodb://admin1:12345@ds061415.mongolab.com:61415/wvuptvshows';

MongoClient.connect(connString, function(err, db) {
	if(err)
		return console.log(err);
	
  console.log("Connected correctly to server");

	app.listen(3000, function () {
		console.log('Our app is now listening on port: 3000');
	});

  _db = db;
});