sampleApp.controller('aboutCtrl', ['$scope', '$DataService', function ($scope, $DataService) {

	$scope.test = 'It works';

	$scope.custom_includes = [
		{
			name: 'GitHub',
			src: 'http://www.datanucleus.org/images/GitHub-Mark-64px.png'
		}
	];

//Genres that equals to the attribute of 'shows' in the html file
	$scope.tShows = [
		{
			//title: 'Bob's Burgers',
			src:'/assets/libs/images/bburgers.jpg',
			_id: 1
		},
		{
			//title: 'Cadfael',
			src: '/assets/libs/images/cadfael.jpg',
			_id: 2
		},
		{
			//title: 'Merlin',
			src: '/assets/libs/images/merlin.jpg',
			_id: 3
		},
		{
			//title: 'Grand Designs',
			src: '/assets/libs/images/granddesigns.jpg',
			_id: 4
		}
	]

// Class example of data for Comedy Shows 
		$scope.comedy_shows = [
		{
			title: 'merlin',
			src: 'http://vignette1.wikia.nocookie.net/defenderoftexel/images/c/c7/Merlin_the_Sage_Icon.png/revision/latest?cb=20140520111942',
			_id: 3 // This might be a mongodb _id =)
		},
		{
			title: 'rick and morty',
			src: 'http://orig05.deviantart.net/b754/f/2015/236/0/c/ezgif_3180472066_by_bloody_uragiri-d96zyyh.gif',
			_id: 4 // This might be a mongodb _id =)
		}
	]
	

// Grabs data from my tele_show database and logs twice in the console. This data is inserted into the row (runs in console)in the about html file. 
$scope.async_shows = [];

var k = $DataService.display;

$DataService.shows.find()
	.success(function (resp) {
		console.log('Loaded');
		
		$scope.async_shows = resp.map(function(r) {
			return {
				_id: r._id,
				title: r.title
			};
		});

		console.log($scope.async_shows);
	});

}]);