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
app.get('/teleShows', function (req,res) {
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

//Returns a list of the genres
app.get('/teleShows/genre', function (req,res) {
	var collection = _db.collection('tele_show');
	collection.find({carousel_genre:1}, function (err, cursor) {
		if (err) 
			return res.send(err);
		

		cursor.toArray(function (err,docs) {
			if (err) 
				return res.send(err);
			res.send(docs);
			
		});// end cursor.toArray
	}); // end collection.find

}); //end app.get

//Returns a list rated 5
app.get('/teleShows/popular', function (req,res) {
	var collection = _db.collection('tele_show');
	collection.find({rating:5}, function (err, cursor) {
		if (err) 
			return res.send(err);
		

		cursor.toArray(function (err,docs) {
			if (err) 
				return res.send(err);
			res.send(docs);
			
		});// end cursor.toArray
	}); // end collection.find

}); //end app.get

//Returns a list with the value "yes" for the object "new"
//Returns a list rated 5
app.get('/teleShows/recently-added', function (req,res) {
	var collection = _db.collection('tele_show');
	collection.find({recent:"yes"}, function (err, cursor) {
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

app.post('/teleShows', function (req,res) {
	var _body = req.body;

	if(Object.keys(_body).length == 0)
		return res.send("We need some keys here for body!");

	var collection = _db.collection('tele_show');

	collection.insert(_body, function (err,docs) {

		if(err)
			return res.send(err);
		res.send(docs);
	});
});

//This is the middle man before moving on to the patches
function parseID (req, res, next) { //next allows you to continue along
	var _id
	try{
		_id = mongodb.ObjectID(req.params.id);
	}
	catch(err) {
		res.send('Error parsing: ' + err);
		return;
	}
	req._id = _id; //This makes the id that was converted available for the patches because otherwise it would be private here. 
	next();
}

//patch
app.put('/teleShows/:id', parseID, function (req,res) {
	var query = {
		 _id:req._id //this tells mongodb what query that you are looking for the id 

		//_id: mongodb.ObjectID(req.params.id)
	};

	var collection = _db.collection('tele_show');
	collection.update(
		//Our query object
		query,
		//Our update document
		req.body,
		//Options
		{},

		function (err,status) {
			if(err)
				res.send(err);
			res.json(status);
		}
		)

});

// /teleShows/:id?tags=sample.test.whatever.tags.you.want
function tag_it (req,res,next) {
	var _tags = req.query.tags;

	if (!_tags) 
		return next();

	var arrTags = _tags.split(',');
	req.tags = arrTags;
	next();
}

//app. use is global. defines a folder you want people to be able to see
app.use(express.static('public'));

// end 