sampleApp.controller('browseCtrl', ['$scope', '$stateParams', '$DataService', function ($scope, $stateParams, $DataService) {

	$scope.name = 'Alisha';

// 	$scope.allGenres.reduce(function(sum, a) {
//   if (sum.indexOf( a.category ) < 0) sum.push( a.category );
//   return sum;
// }, []);

	$scope.allGenres = [];

	$DataService.shows.findGenre() 
		.success(function (resp) {
			console.log('Here is your list of genres...');
			console.log(resp);
			$scope.allGenres = resp.map(function (r) {
				return {
					title: r.title,
					genre: r.genre,
					release_date: r.release_date,
					_id: r._id,
					thumbnail: r.thumbnail,
					rated_symbol: r.rated_symbol,
					synopsis:r.synopsis,
					actors:r.actors,
					director:r.director,
					director:r.directors
					
				};
			})

			console.log($scope.allGenres);
		})

		.error (function (err) {
			console.error(err);
		});
	
}]);

