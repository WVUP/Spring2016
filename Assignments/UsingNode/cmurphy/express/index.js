// dependencies
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// every route to parse body if available
app.use(bodyParser.json());
//------------------------------------------------------------------------------
// serves index.html
app.get('/', function (req, res) {
	res.sendFile("./index.html", {root : __dirname});
});
//------------------------------------------------------------------------------
// data
var shows = [
	{
		id: 1,
		name: 'Stargate',
		genre: 'Scifi',
		spins: [
		{
			sName: 'SG1',
			seasons: 10,
			epPerSeason: [21, 22, 22, 22, 22, 22, 22, 20, 20, 20]
		}, 
		{
			sName: 'Atlantis',
			seasons: 5,
			epPerSeason: [20, 20, 20, 20, 20]
		},
		{
			sName: 'Universe',
			seasons: 2,
			epPerSeason: [20, 20]
		}]
	},
	{
		id: 2,
		name: 'Downton Abbey',
		genre: 'Drama',
		spins: [
		{
			sName: 'Downton Abbey',
			seasons: 6,
			epPerSeason: [7, 9, 9, 9, 9, 9]
		}]
	},
	{
		id: 3,
		name: 'Avatar',
		genre: 'Animated',
		spins: [
		{
			sName: 'The Last Airbender', 
			seasons: 3,
			epPerSeason: [16, 19, 17]
		},
		{
			sName: 'Legend of Korra',
			seasons: 4,
			epPerSeason: [10, 14, 12, 12]
		}]
	},
	{
		id: 4,
		name: 'Game of Thrones',
		genre: 'Fantasy',
		spins: [
		{
			sName: 'Game of Thrones',
			seasons: 5,
			epPerSeason: [10, 10, 10, 10, 10]
		}]
	},
	{
		id: 5,
		name: 'Spartacus',
		genre: 'Action',
		spins: [
		{
			sName: 'Blood and Sand',
			seasons: 1,
			epPerSeason: [13]
		},
		{
			sName: 'Gods of the Arena',
			seasons: 1,
			epPerSeason: [8]
		},
		{
			sName: 'Vengeance',
			seasons: 1,
			epPerSeason: [10]
		},
		{
			sName: 'War of the Damned',
			seasons: 1,
			epPerSeason: [10]
		}]
	},
	{
		id: 6,
		name: 'Big Bang Theory',
		genre: 'Sitcom',
		spins: [
		{
			sName: 'Big Bang Theory',
			seasons: 9,
			epPerSeason: [17, 23, 23, 24, 24, 24, 24, 24, 24]
		}]
	},
	{
		id: 7,
		name: 'Star Trek',
		genre: 'Scifi',
		spins: [
		{
			sName: 'The Original Series',
			seasons: 3,
			epPerSeason: [30, 26, 24]
		},
		{
			sName: 'The Next Generation',
			seasons: 7,
			epPerSeason: [25, 22, 26, 26, 26, 26, 25]
		},
		{
			sName: 'Deep Space Nine',
			seasons: 7,
			epPerSeason: [20, 26, 26, 26, 26, 26, 26]
		},
		{
			sName: 'Voyager',
			seasons: 7,
			epPerSeason: [16, 26, 26, 26, 26, 26, 26]
		},
		{
			sName: 'Enterprise',
			seasons: 4,
			epPerSeason: [26, 26, 24, 22]
		},
		{
			sName: 'The Animated Series',
			seasons: 2,
			epPerSeason: [16, 6]
		}]
	},
	{
		id: 8,
		name: 'Firefly',
		genre: 'SciFi',
		spins: [
		{
			sName: 'Firefly',
			seasons: 1,
			epPerSeason: [15]
		}]
	}
];
//------------------------------------------------------------------------------
// serves server info
app.get('/server', function (req, res) {
	
	var _hostname = req.hostname;
	var _ip = req.ip;

	res.send(_hostname + ' (' + _ip + ') listening on port 3000');
});
//------------------------------------------------------------------------------
// serves list
app.get('/list', function (req, res) {
	var partList = '';
	var htmlList = '';
	for (var i = 0; i < shows.length; i++) {
		var _id = shows[i].id;
		var _name = shows[i].name;
		var _genre = shows[i].genre;
		var _spins = shows[i].spins;
		partList += _id + ': ' + 'Series: ' + _name + ', Genre: ' + _genre + '\n';
		for (var j = 0; j < _spins.length; j++) {
			var _seasons = _spins[j].seasons;
			var _sName = shows[i].spins[j].sName;
			var _episodes = shows[i].spins[j].epPerSeason;
			var _episodeCnt = 0;
			for (var k = 0; k < _episodes.length; k++)
			{
				_episodeCnt += _episodes[k];
			}
			var _info = _sName + ', Seasons: ' + _seasons + ', Total Episodes: ' + _episodeCnt;
			partList += _info + '\n' + '<br/>';
			//htmlList += '<li>' + _info + '</li>';
		}
		partList += '\n' + '<hr/>';
		//htmlList += '<li>' + partList + '</li>';
	}
	//console.log(htmlList);
	res.send(partList);
	// res.render(htmlList, function(err, html) {
	// 	html = "./list";
	// });
});
//------------------------------------------------------------------------------
// name and genre queries
app.get('/shows', function (req, res) {

	if (req.query.name) {
		var qName = [];
		for (var i = 0; i < shows.length; i++) {
			if (shows[i].name.toLowerCase() == req.query.name.toLowerCase())
				qName.push(shows[i]);
		}
		return res.send(qName);
	}

	if (req.query.genre) {
		var qGenre = [];
		for (var i = 0; i < shows.length; i++) {
			if (shows[i].genre.toLowerCase() == req.query.genre.toLowerCase())
				qGenre.push(shows[i]);
		}
		return res.send(qGenre);
	}
	res.send(shows);
});
//------------------------------------------------------------------------------
// get show info with id
app.get('/shows/:id', function (req, res) {
	var _id = req.params.id;
	var show;
	for (var i = 0; i < shows.length; i++) {
		if (_id == shows[i].id) {
			show = shows[i];
			break;
		}
	}

	if (!show)
		return res.send('Entry does not exist.');

	res.send(show);
});
//------------------------------------------------------------------------------
// update show name by id
app.put('/shows/:id/:name', function (req, res) {
	var _id = req.params.id;
	var _name = req.params.name;
	var _status = "id: " + _id + ", updated @ " + Date();
	var show;
	for (var i = 0; i < shows.length; i++) {
		if (_id == shows[i].id) {
			shows[i].name = _name;
			show = shows[i];
			break;
		}
	}

	if (!show)
		return res.send('Entry does not exist.  see /list for current entries.');

	console.log(show);
	res.send(_status);
});
//------------------------------------------------------------------------------
// create show name, increments id
// will break /list because all fields in 'shows' are not completed
app.post('/shows/:name', function (req, res) {
	var _name = req.body;

	_name.id = shows.length + 1;
	_name.name = req.params.name;
	shows.push(_name);
	var _status = "id: " + _name.id + ", created @ " + Date();
	console.log(_name);
	res.send(_status);
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
// run server on PORT 3000, show confirmation in console
app.listen(3000, function() {
	console.log('\n... localhost listening on port 3000 ...\n');
});