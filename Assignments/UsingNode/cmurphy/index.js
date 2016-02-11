// dependencies
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// every route to parse body if available
app.use(bodyParser.json());

app.get('/', function (req, res) {
	res.send('Node Interactive Directory of TV Shows');
});

app.get('/test', function (req, res) {
	
	var _hostname = req.hostname;
	var _ip = req.ip;

	res.send('Testing area... Hostname: ' 
			 + _hostname + ', IP: ' + _ip);
	//res.send('From: ' + _hostname);
	console.log(_hostname);
});

var shows = [
	{
		id: 1,
		name: 'Stargate',
		spins: ['SG1', 
				'Atlantis', 
				'Universe'],
		genre: 'Scifi',
		seasons: 17,
		episodes: 410
	},
	{
		id: 2,
		name: 'Downton Abbey',
		spins: [],
		genre: 'Drama',
		seasons: 6,
		episodes: 51
	},
	{
		id: 3,
		name: 'Avatar',
		spins: ['The Last Airbender', 
				'Legends of Korra'],
		genre: 'Animated',
		seasons: 7,
		episodes: 104
	},
	{
		id: 4,
		name: 'Game of Thrones',
		spins: [],
		genre: 'Fantasy',
		seasons: 5,
		episodes: 52
	},
	{
		id: 5,
		name: 'Spartacus',
		spins: ['Blood and Sand', 
				'Gods of the Arena', 
				'Vengeance', 
				'War of the Damned'],
		genre: 'Historical Fiction',
		seasons: 4,
		episodes: 39
	},
	{
		id: 6,
		name: 'Big Bang Theory',
		spins: [],
		genre: 'Sitcom',
		seasons: 9,
		episodes: 190
	},
	{
		id: 7,
		name: 'Star Trek',
		spins: ['Original Series', 
				'The Next Generation', 
				'Deep Space Nine', 
				'Enterprise', 
				'Animated'],
		seasons: 25,
		episodes: 570
	},
	{
		id: 8,
		name: 'Firefly',
		spins: [],
		genre: 'SciFi',
		seasons: 1,
		episodes: 15
	}
];

app.get('/api/shows', function (req, res) {

	if (req.query.name) {
		var arr = [];
		for (var i = 0; i < shows.length; i++) {
			if (shows[i].name.toLowerCase() == req.query.name.toLowerCase())
				arr.push(shows[i]);
		}
		return res.send(arr);
	}
	res.send(shows);
});

app.get('/api/shows/:id', function (req, res) {
	var _id = req.params.id;
	var show;
	for (var i = 0; i < shows.length; i++) {
		if (_id == shows[i].id) {
			show = shows[i];
			break;
		}
	}

	if (!show)
		return res.send('Show does not exist.');
	res.send(show);
});

app.put('/api/shows/:id', function (req, res) {
	var _id = req.params.id;
	var show;
	for (var i = 0; i < shows.length; i++) {
		if (_id == shows[i].id) {
			show = shows[i];
			break;
		}
	}
	
	console.log(req.body);
	res.send('hit');
});

app.post('/api/shows', function (req, res) {
	var _name = req.body;

	_name.id = shows.length + 1;
	shows.push(_name);
	res.send(_name);
});

app.listen(3000, function() {
	console.log('\n... localhost listening on port 3000 ...\n');
});