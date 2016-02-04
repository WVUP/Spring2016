
// Require our minimalist unopionated web framework =)
var express = require('express');
var bodyParser = require('body-parser');

// Create an app using express
var app = express();


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





// Start our app up and have it listening for requests
app.listen(3000, function () {
	console.log('Our app is now listening on port: 3000');
});