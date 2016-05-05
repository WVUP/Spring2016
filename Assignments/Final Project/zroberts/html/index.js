var express = require('express');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var passwordHash = require('password-hash')

var app = express();
var MongoClient = mongodb.MongoClient;
var _db;
var tvShows = "";

var hasehdPassword = passwordHash.generate('testPassword');

console.log(hasehdPassword);

app.use(express.static('public'));
app.use(bodyParser.json());

var PasswordTest = "sha1$73b3563d$1$b1f1162b95d7b58a0c0672aa9da11306b9babd1b"

if(passwordHash.verify('testPassword', PasswordTest)){
	console.log("password is correct");
}else{
	console.log("password is not correct, WTF!!");
}

app.get('/api/tv', function (req,res){
	//var collection = _db.collection('tv_shows');
	
	tvShows.find({}, function (err, cursor){
		if(err){
			return res.send(err);
		}
		cursor.toArray(function(err, docs){
			if(err)
				return res.send(err)

			res.send(docs)
		});
	});
});
/*app.get('/api/tv/genre/', function(req, res){
	genres.find
})*/
app.get('/api/tv/count/show/:showName', function (req, res){
	var _show = req.params.showName;
	tvShows.count({"franchise.franchiseName": _show}, function (err, docs){
		if(err)
			return res.send(err);
		res.sendStatus(docs);
	})
});
app.get('/api/tv/popular', function (req, res){
	tvShows.distinct("franchise",{"rating": {$gte: "4"}}, function (err, docs){
		if(err){
			return res.send(err);
		}
		res.send(docs);
		/*cursor.toArray(function (err, docs){
			if(err){
				return res.send(err);
			}
			res.send(docs);
		});*/
	})
});
app.get('/api/tv/genre/', function (req, res){
	tvShows.distinct("genre", function (err, docs){
		if(err){
			return res.send(err);
		}
		res.send(docs);
		/*cursor.toArray(function (err, docs){
			if(err){
				return res.send(err);
			}
			res.send(docs);
		});*/

	});
});
app.get('/api/tv/genre/:genre', function (req, res){
	var _genre = req.params.genre;
	tvShows.distinct("franchise", {"genre.genre": _genre}, function (err, docs){
		if(err)
			return res.send(err)
		res.send(docs);
	});
});
app.get('/api/tv/featured/', function (req, res){
	tvShows.distinct("featured", {"featured.isFeatured": "true"},function (err, docs){
		
		if(err){
			return res.send(err);
		}
		res.send(docs);
		/*cursor.toArray(function(err, docs){
			if(err){
				return res.send(err);
			}
			res.send(docs);
		})*/
	})
})
/*
app.get('/api/tv/genre/', function (req,res){
	genres.find({}, function (err, docs){
		if(err){
			return console.log(err);
		}
		res.send(docs);
	});
});
/*app.get('/api/tv/genre/:name', function (req,res){
	var _genre = req.params.name;

	var query = {
		genre: _genre
	}
	genres.distinct("franchise", query, function (err, docs){
		if(err){
			return console.log(err);
		}
		/*cursor.toArray(function (err, docs){
			if(err){
				return res.send(err);
			}
			res.send(docs);
		//});
	});
});*/



var connString = "mongodb://zroberts:test123@ds061395.mlab.com:61395/wvup_shows";

MongoClient.connect(connString, function (err, db){
	if(err){
		return console.log(err);
	}
	console.log("Connected correctly to the Database");
	app.listen(8080, function(){
		console.log('App is now lisiening on port 8080')
	});

	_db = db;
	tvShows = _db.collection('tvShows');
});