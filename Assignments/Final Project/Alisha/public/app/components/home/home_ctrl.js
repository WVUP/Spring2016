sampleApp.controller('homeCtrl', ['$scope','$timeout', '$DataService', function ($scope, $timeout, $DataService) {//'homeCtrl' - where the data lives
				
				$scope.name = 'Alisha';
				var test = 'something'; //won't be shown because not $scoped

				$scope.colors = ['blue', 'red', 'green', 'yellow', 'orange'];

				$scope.users = [
					{
						firstName: 'alisha',
						lastName: 'jozwick'
					},
					{
						firstName: 'adam',
						lastName: 'jozwick'
					}
				];

				$scope.show_alert = function () {
					alert('Yes omg');
				};

				$scope.showLogo = true;

				$timeout(function () {
					$scope.name = 'Jozwick';
				}, 1000);


				// Creating 'genres' and 'popular' arrays for displaying Genres row and Popular row.
				$scope.genres = [];
				$scope.populars = [];
				$scope.recent = [];

				//Set my controller to use dataservice and grab the genres from my database
				$DataService.shows.findCarousel_genre()
					.success(function (resp) {
						console.log('Found');
						console.log(resp);
						$scope.genres = resp.map(function (r) {
								return {
									genre: r.genre,
									title: r.title,
									carousel_genre: r.carousel_genre,
									url: r.url
								};
							})

						console.log($scope.genres);

					})

					.error (function (err) {
					console.error(err);
					});

				// Creating array to use my findPopular service so it will pull data from my index.js to return the url value. 
				// This will specifically return the thumbnails.
				$DataService.shows.findPopular()
					.success(function (resp) {
						console.log(resp);
						$scope.populars = resp.map(function (r) {
							return {
								title: r.title,
								rating: r.rating,
								url: r.url
							};
						})

						console.log($scope.populars);

					})

					.error (function (err) {
					console.error(err);
					});


				// Create array for the recently added shows. 
				$DataService.shows.findRecent ()
					.success(function (resp) {
						console.log(resp);
						$scope.recent = resp.map(function (r) {
							return {
								title: r.title,
								recent: r.recent,
								url_new: r.url_new
							};
						})

							console.log($scope.recent);
					})

					.error (function (err) {
					console.error(err);
					});

		
}]);