sampleApp.controller('aboutCtrl', ['$scope', '$DataService', function($scope, $DataService) {

	$scope.test = 'It works =)';

	$scope.custom_includes = [
		{
			name: 'GitHub',
			src: 'http://www.datanucleus.org/images/GitHub-Mark-64px.png'
		}
	];
	// This is MOCK data...typically this will come from a service that uses $http
	$scope.tv_shows = [
		{
			title: 'Alf',
			src: 'http://90ie.ru/wp-content/uploads/2008/09/alf.thumbnail.jpg',
			_id: 1 // This might be a mongodb _id =)
		},
		{
			title: 'TMNT',
			src: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSezxkZentQfd0pAPXYM-QtaQHHxOShxcHzx6Gh6To0ljJUkbtZ',
			_id: 2 // This might be a mongodb _id =)
		}
	]

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

	$scope.async_shows = [];

	var k = $DataService.display;

	$DataService.shows.find()
		.success(function(resp) {
			console.log('Loaded');
			console.log(resp);
			$scope.async_shows = resp.map(function(r) {
				return {
					_id: r._id,
					title: r.name
				};
			});

			console.log($scope.async_shows);

		})
		.error(function(err) {
			console.error(err);
		});

	
}]);
