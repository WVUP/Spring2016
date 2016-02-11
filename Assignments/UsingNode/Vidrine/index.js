var express = require("express");
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.json());

app.get('/', function (req, res) {
	res.send("Check out these bands son");
})

var bands = [
	{
		name: "DreamTheatre",
		albums: [
			{
				albumName: "Awake",
				tracks: ["(1) Pull Me Under", "(2) In the Name of God", "(3) Metropolis"]
			},
			{
				albumName: "ImagesAndWords",
				tracks: ["(1) Another Day", "(2) Ashes to New"]
			}
		],
		id: 1
	},
	{
		name: "Polyphia",
		albums: [
			{
				albumName: "Muse",
				tracks: ["(1) James Franco", "(2) Champagne", "(3) Sweet Tea", "(4) Baditude"]
			},
			{
				albumName: "Inspire",
				tracks: ["(1) Impassion", "(2) Finale", "(3) Aviator", "(4) Hourglass" ]
			}
		],
		id: 2
	},
	{
		name: "Chon",
		albums: [
			{
				albumName: "NewbornSun",
				tracks: ["(1) Bubble Dream", "(2) Perfect Pillow", "(3) Splash"]
			},
			{
				albumName: "Grow",
				tracks: ["(1) Book", "(2) Suda", "(3) Fluffy"]
			}
		],
		id: 3
	},
	{
		name: "AnimalsAsLeaders",
		albums: [
			{
				albumName: "Weightless",
				tracks: ["(1) Song of Solomon", "(2) The Woven Womb", "(3) Tempting Time"]
			},
			{
				albumName: "TheJoyOfMotion",
				tracks: ["(1) CAFO", "(2) Physical Education", "(3) Toothe and Claw", "(4) Kascade"]
			}
		],
		id: 4
	},
	{
		name: "Periphery",
		albums: [
			{
				albumName: "Alpha",
				tracks: ["(1) Mile Zero", "(2) Make Total Destroy", "(3) Psychosphere", "(4) Jetpack Was Yes"]
			},
			{
				albumName: "TheIcarus",
				tracks: ["(1) Icarus Lives", "(2) Scarlet", "(3) The Bad Thing"]
			}
		],
		id: 5
	}
];

app.get('/bands', function (req, res) {
	var names = [];
	for (var i = 0; i < bands.length; i++) {
		names.push(bands[i].name);
	}
	res.send(names);
});

app.get('/bands/:bandID', function (req, res) {
	var _id = req.params.bandID;
	var band;
	for (var i = 0; i < bands.length; i++) {
		if (_id.toLowerCase() == bands[i].name.toLowerCase()) {
			band = bands[i];
			break;
		}
	}

	if (!band) {
		return res.send("That band does not exist");
	}

	res.send(band);
});

app.get('/bands/:bandID/albums', function (req, res) {
	var _id = req.params.bandID;
	var band;
	var albumNames = [];
	for (var i = 0; i < bands.length; i++) {
		if (_id.toLowerCase() == bands[i].name.toLowerCase()) {
			band = bands[i];
			break;
		}
	}
	if (!band) {
		return res.send("That band doesn't exist")
	}
	for (var i = 0; i < band.albums.length; i++) {
		albumNames.push(band.albums[i].albumName)
	}
	res.send(albumNames);
});

app.get('/bands/:bandID/albums/:albumID', function (req, res) {
	var _id = req.params.bandID;
	var albumNum = req.params.albumID;
	var band;
	var album;
	for (var i = 0; i < bands.length; i++) {
		if (_id.toLowerCase() == bands[i].name.toLowerCase()) {
			band = bands[i];
			break;
		}
	}
	if (!band) {
		return res.send("That band doesn't exist")
	}
	for (var i = 0; i < band.albums.length; i++) {
		if (albumNum.toLowerCase() == band.albums[i].albumName.toLowerCase()) {
			album = band.albums[i];
			break;
		}
	}

	res.send(album.tracks);
});

app.listen(3000, "0.0.0.0", function () {
	console.log("Listening on port 3000");
});