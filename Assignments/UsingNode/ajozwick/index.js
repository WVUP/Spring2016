// MONGODB ASSIGNMENT: Television Shows

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// require Mongo to run this app
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

app.use(bodyParser.json());


// Connect to your mongo url 
var url = 'mongodb://ajozwick:Ol34ber*-@ds061415.mongolab.com:61415/wvup_shows';
MongoClient.connect(url, function (err,db) {
	if(err)
		return console.log(err);
	console.log('Connected correctly to server.');

	// Now that you are connected to mongodb, it starts listening for port 3000. When it wants the port, is uses the callback.
	app.listen(3000, function () {
		console.log('Our app is now listening on port 3000.');
	});

	_db = db;

});

//
var _db;

// MONGODB: Listing all the data in tele_show collection
app.get('/', function (req,res) {
	var collection = _db.collection('tele_show');
	collection.find({}, function (err, cursor) {
		if (err) 
			return res.send(err);
		

		cursor.toArray(function (err,docs) {
			if (err) 
				return res.send(err);
			res.send(docs);
			
		});// end cursor.toArray
	}); // end collection.find

}); //end app.get


// Listing data based on the ID parameter
app.get('/teleShows/:id', function (req,res) {
	var collection = _db.collection('tele_show');

// Want to find _id. Objectid is a data type in mongo. Uses mongo package to get this string and converts into object data type so you can use it. 
// Using it fo findOne collection.
	var query = {
		_id: mongodb.ObjectID(req.params.id)
	};

	collection.findOne(query, function (err, docs) {
		if (err) 
			return res.send(err);

		res.send(docs);
	});
});


//
app.get('/teleShows/genre/:genre', function (req, res) {
	var collection = _db.collection('tele_show');

	var query = {
		genre: { $regex: req.params.genre, $options: 'i' }
	};

	// If they want to do a search on top of the genre they are looking for. /api/tvshows/genre/comedy?search=bang
	if(req.query.search) {
		query.title = {
			$regex: '.*' + req.query.search + '.*',
			$options: 'i'
		}
	}

	collection.find(query, function (err, cursor) {
		if (err) 
			return res.send(err);

		cursor.toArray(function (err, docs) {
			if(err)
				return res.send(err);

			res.send(docs);
		});
	});

});



// end 

