// NODE ASSIGNMENT: Television Shows

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// require Mongo to run this app
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

app.use(bodyParser.json());

// Starts listening for port 3000. When it wants the port, is uses the callback.

app.listen(3000, function () {
	console.log('Our app is now listening on port 3000.');
});

// Connect to your mongo url 
var url = 'mongodb://ajozwick:Ol34ber*-@ds061415.mongolab.com:61415/wvup_shows';
MongoClient.connect(url, function (err,db) {
	if(err)
		return console.log(err);
	console.log('Connected correctly to server.');
});

// Making routes, kind of similar to directories
// app.get is going to the port the user requests. This is what it sends back to the user.
// The routes created are: main port ('/'), 'teleShows'

app.get('/', function (req, res) {
	res.send('Hello World');
});


// Data to serve up
var teleShows = [
{
	id: 1,
	title: "Bob's Burgers",
	genre: "comedy",
	rating: 3,
	seasons: 4,
	synopsis: "Bob Belcher is a third-generation restaurateur who runs Bob's Burgers with his loving wife and their three children."
},
{
	id: 2,
	title: "Downton Abbey",
	genre: "drama",
	rating: 5,
	seasons: 6,
	synopsis: "This British drama series follows the lives of the Crawley family and its servants in the family's classic Georgian country house."
},
{
	id: 3,
	title: "Cadfael",
	genre: "crime",
	rating: 5,
	seasons: 5,
	synopsis: "Brother Cadfael is the main fictional character in a series of historical murder mysteries written between 1977 and 1994 by the linguist-scholar Edith Pargeter under the name 'Ellis Peters'."
},
{
	id: 4,
	title: "Grand Designs",
	genre: "lifestyle",
	rating: 2,
	seasons: 15,
	synopsis: "Series featuring the challenges faced by people designing and building their dream houses."
},
{
	id: 5,
	title: "Merlin",
	genre: "fantasy",
	rating: 5,
	seasons: 5,
	synopsis: "Revisits the saga of King Arthur and his wizard, Merlin, by focusing on the two characters when they were ambitious young men struggling to understand their destinies."
},
{
	id: 6,
	title: "Saxondale",
	genre: "comedy",
	rating: 4,
	seasons: 2,
	synopsis: "Tommy Saxondale is a world-travelled ex-roadie with anger-management issues and a pest control business in Stevenage."
},
{
	id: 7,
	title: "Twin Peaks",
	genre: "drama",
	rating: 1,
	seasons: 2,
	synopsis: "FBI Agent Dale Cooper travels to the small logging town of Twin Peaks to solve the murder of seemingly innocent high schooler Laura Palmer."
},
{
	id: 8,
	title: "Portlandia",
	genre: "comedy",
	rating: 1,
	seasons: 6,
	synopsis: "Satirical sketch comedy television series set and filmed in and around Portland, Oregon starring Carrie Brownstein and Fred Armisen."
},
{
	id: 9,
	title: "Longmire",
	genre: "drama",
	rating: 3,
	seasons: 4,
	synopsis: "Longmire patrols the county with a brave face and sense of humor, but deep inside he hides the pain of his wife's recent death."
},
{
	id: 10,
	title: "It's Always Sunny in Philadelphia",
	genre: "comedy",
	rating: 5,
	seasons:11,
	synopsis: "Several friends own Paddy's Pub, a neighborhood bar in Philadelphia, and try to find their way in the world of work and relationships."
}
];
// End of Data

// Warming Up
//app.get('/teleShows', function (req, res) {
//	res.send(teleShows.rating);
//	console.log(teleShows.title);
//	console.log(teleShows.length);
//});



// User filters for specific ratings. (/teleShows?rating=3)
app.get('/teleShows', function (req, res) {
	if (req.query.rating) {
		
		var rate = [];
		
		for (var i = 0; i < teleShows.length; i++) {
			if (teleShows[i].rating == req.query.rating)
				rate.push(teleShows[i]);
		}
		
		return res.send(rate);
		
	}

	res.send(teleShows); // If no filter request, respond with list of data.

});


// Want a particular list. Creating a parameter string so when matched, it hits this code. The colon is adding a parameter.
// Saying that this is what we are looking for overall. Wants you to create a field to tv shows ID and put that in the path

// User puts the 2 in the address bar so it uses that 2 parameter. Then, it passes in the info that matches that id of 2 which is 
// downton abbey.

app.get('/teleShows/:teleShowsID', function (req,res) {
	var _id = req.params.teleShowsID;
	var show;

	for (var i = 0; i < teleShows.length; i++) {
		if (_id == teleShows[i].id) {
			show = teleShows[i];
			break;
		}
		
	}

	if (_id != teleShows[i].id) {
			return res.send("This does not exist");
		};

	console.log(_id);
	res.send(show);
});

app.get('/teleShows/:teleShowsID/seasons/:seasonNum', function (req,res) {
	var _id = req.params.teleShowsID;
	var sn = req.params.seasonNum;
	var season;
	var show;

	for (var i = 0; i < teleShows.length; i++) {
		if (sn == teleShows[i].seasons && _id == teleShows[i].id) {
			season = teleShows[i].seasons;
			show = teleShows[i];
			break;
		}
		
	}

	if (!season || !show) {
			return res.send("The numbers you entered are incorrect.");
		};

	res.send("Season" + " " + (season) + " " + "has an overall rating of " + (teleShows[i].rating) + " " + "out of 5! " + (teleShows[i].title) + ":" + " " + (teleShows[i].synopsis));

});


// app.put allows you to send this update to the database. Colon means that it is a route parameter.
app.put('/teleShows/:teleShowsID', function (req,res) {
	var _id = req.params.teleShowsID;
	var show;

	for (var i = 0; i < teleShows.length; i++) {
		if (_id = teleShows[i].id) {
			show = teleShows[i];
			break;
		}
		
	}

	if (_id != teleShows[i].id) {
			return res.send("OOOooops try again.");
		};

	console.log('Hit');
 	res.send(req.body);
});

// app.post inserts data
app.post('/teleShows', function (req,res) {
	// Create a new televisions show in the json (req body)
	var _show = req.body;

	// Increment the show's ID. Adding a show to the list.
	_show.id = teleShows.length + 1;

	// Take what's created and push it up where the others are listed.
	teleShows.push(_show);

	// Send the info back to the user.
	res.send(_show);

});

