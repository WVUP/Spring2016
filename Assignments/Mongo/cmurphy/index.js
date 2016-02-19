// dependencies
var express = require('express');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');

// 
var app = express();
var MongoClient = mongodb.MongoClient;
var _db;

// every route to parse body if available
app.use(bodyParser.json());
//------------------------------------------------------------------------------
// serves index.html
app.get('/', function (req, res) {
	res.sendFile("./index.html", {root : __dirname});
});
//------------------------------------------------------------------------------
// serves server info
app.get('/server', function (req, res) {
	
	var _hostname = req.hostname;
	var _ip = req.ip;

	res.send(_hostname + ' (' + _ip + ') listening on port 3000');
});

//------------------------------------------------------------------------------
// name and genre queries
app.get('/shows', function (req, res) {
	
	var collection = _db.collection('tv_shows');

	collection.find({}, function(err, cursor) {
		if(err)
			return res.send(err);

		cursor.toArray(function(err, docs) {
			if(err)
				return res.send(err);

			res.send(docs);
		});
	});

});
//------------------------------------------------------------------------------
// 
app.get('/shows/:id', function(req, res) {
	var collection = _db.collection('tv_shows');
	var query = {
		_id: mongodb.ObjectID(req.params.id)
	};

	collection.findOne(query, function(err, doc) {
		if(err)
			return res.send(err);

		res.send(doc);
	});

});
//------------------------------------------------------------------------------
// 
app.get('/shows/genre/:genre', function(req, res) {
	var collection = _db.collection('tv_shows');
	var query = {
		genre: {
			$regex: req.params.genre,
			$options: 'i'
		}
	};
	
	if (req.query.search) {
		query.fanchise = {
			$regex: '.*' + req.query.search + '.*',
			$options: 'i'
		}
		console.log(JSON.stringify(query));
	}

	collection.find(query, function(err, cursor) {
		if (err)
			return res.send(err);

		cursor
			.limit(50)
			.toArray(function(err, docs) {
				if (err)
					return res.send(err);

				res.send(docs);
			});
	});

});
//------------------------------------------------------------------------------
// deletes entry by id with splice
// id does not dynamically adjust.  how to?
app.delete('/shows/:id', function (req, res) {
	var _id = req.params.id;
	var _status = "id: " + _id + ", removed @ " + Date();
	var show;

	for (i = 0; i < shows.length; i++) {
		if (_id == shows[i].id) {
			show = shows[i];
			console.log(show);
			shows.splice(_id - 1, 1);
			break;
		}
	}

	if (!show)
		return res.send('Entry does not exist.');

	res.send(_status);

});
//------------------------------------------------------------------------------
// connects to database
// run server on PORT 3000, show confirmation in console
var connString = 'mongodb://admin:testing@ds061405.mongolab.com:61405/wvup_shows';

MongoClient.connect(connString, function(err, db) {
	if(err)
		return console.log(err);
	console.log("... connected to database ...");

	app.listen(3000, function() {
		console.log('... the magic happens on port 3000 ...\n');
	});

	_db = db;
});