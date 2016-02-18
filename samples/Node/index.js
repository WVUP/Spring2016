
// Require our minimalist unopionated web framework =)
var express = require('express');
var bodyParser = require('body-parser');

// Create an app using express
var app = express();

// Make sure we require mongodb =)
var mongodb = require('mongodb');


var MongoClient = mongodb.MongoClient;



// Every route will now parse the body if available
app.use(bodyParser.json());

// Our very first route
app.get('/', function (req, res) {
	res.send('Hello World');
});

app.get('/test', function (req, res) {
	res.send('You hit test');
});

app.get('/test/again', function (req, res) {
	res.send('another layer');
});

var students = [
	{
		id: 1,
		name: 'Aaron',
		age: 29
	},
	{
		id: 2,
		name: 'Josh',
		age: 25
	},
	{
		id: 3,
		name: 'Lane',
		age: 25
	}
];

app.get('/api/students', function (req, res) {

	if(req.query.age){
		var arr = [];
		for (var i = 0; i < students.length; i++) {
			if(students[i].age == req.query.age)
				arr.push(students[i]);
		}
		return res.send(arr);
	}

	res.send(students);
});

app.post('/api/students', function (req, res) {
	var _user = req.body;

	// Increment ID #lame
	_user.id = students.length + 1;

	students.push(_user);
	
	res.send(_user);
});

app.get('/api/students/:studentID', function (req, res) {
	var _id = req.params.studentID;
	var student;
	for (var i = 0; i < students.length; i++) {
		if(_id == students[i].id){
			student = students[i];
			break;
		}

	}

	if(!student)
		return res.send('Student does not exist');


	res.send(student);
});

app.put('/api/students/:studentID', function (req, res) {
	var _id = req.params.studentID;
	var student;
	for (var i = 0; i < students.length; i++) {
		if(_id == students[i].id){
			student = students[i];
			break;
		}

	}

	if(!student)
		return res.send('Student does not exist');

	console.log(req.body);
	res.send('hit');
});



var _db;
app.get('/api/tvshows', function(req, res) {
	
	var collection = _db.collection('tv_show');
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

app.post('/api/tvshows', function(req, res) {
	var _body = req.body;

	if(Object.keys(_body).length == 0)
		return res.send('Keys fool, we need keys');

	var collection = _db.collection('tv_show');
	collection.insert(_body, function(err, doc) {
		if(err)
			return res.send(err);

		res.send(doc);
	});
});

function parseID(req, res, next) {
	var _id
	try{
		_id = mongodb.ObjectID(req.params.id);
	}catch(err){
		res.send('Error parsing: ' + err);
		return;
	}

	req._id = _id;
	next();
}

function tag_it(req, res, next) {
	var _tags = req.query.tags;
	if(!_tags)
		return next();

	var arrTags = _tags.split(',');
	req.tags = arrTags;

	next();
}

app.put('/api/tvshows/:id', parseID, tag_it, function(req, res) {
	
	var query = {
		_id: req._id
	};

	var _body = req.body;

	if(req.tags)
		_body.tags = req.tags;

	var collection = _db.collection('tv_show');
	collection.update(
		// Our query object
		query,

		// Our update document
		_body,

		// Options
		{},

		function(err, status){
			if(err)
				res.send(err);

			res.json(status);
		}

		)

});

app.get('/api/tvshows/:id', function(req, res) {
	
	var collection = _db.collection('tv_show');

	// We need to convert our string id into the appropriate ObjectID
	// data type so that we can search it properly in MongoDB
	var query = {
		_id: mongodb.ObjectID(req.params.id)
	};

	// findOne returns back a single document therefor no cursor
	collection.findOne(query, function(err, doc) {
		if(err)
			return res.send(err);

		res.send(doc);
	});

});

app.get('/api/tvshows/genre/:genre', function(req, res) {
	var collection = _db.collection('tv_show');

	var query = {
		genre: {
			$regex: req.params.genre,
			$options: 'i'
		}
	};

	// An optional field that if we see it, we will add it to our
	// query expression
	if(req.query.search){
		query.franchise = {
			$regex: '.*' + req.query.search + '.*',
			$options: 'i'
		}
		console.log(JSON.stringify(query));
	}

	collection.find(query, function(err, cursor) {
		if(err)
			return res.send(err);

		// limit() only grabs 10 documents
		cursor
			.limit(10)
			.toArray(function(err, docs) {
				if(err)
					return res.send(err);

				res.send(docs);
			});
	});
});

// Connection URL
var connString = 'mongodb://afreeland:testing@ds061385.mongolab.com:61385/wvup_shows';

// Use connect method to connect to the Server
MongoClient.connect(connString, function(err, db) {
	if(err)
		return console.log(err);
	
  console.log("Connected correctly to server");

  	// Start our app up and have it listening for requests
	app.listen(3000, funwction () {
		console.log('Our app is now listening on port: 3000');
	});

  _db = db;
});

