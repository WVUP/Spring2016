tvApp.controller('homeCtrl', ['$scope', '$DataService', function ($scope, $DataService) {

	$scope.tv_shows = [];

	$scope.genres = [];

	$scope.comedyShows = [];

	$scope.actionShows = [];

	$scope.thrillerShows = [];

	$scope.dramaShows = [];

	$scope.popular = [];

	$scope.recent = [];
	
	$DataService.shows.findPreview()
		.success(function (resp) {
			console.log("Got it");
			console.log(resp);

			$scope.genres = resp.map (function (r) {
				return {
					url: r.url,
					genre: r.genre
				}
			})

			console.log($scope.genres);
		})
		.error (function (err) {
			console.error(err);
		})

	$DataService.shows.findPopular()
		.success(function (resp) {
			console.log("Got it");
			console.log(resp);

			$scope.popular = resp.map (function (r) {
				return {
					url: r.url
				}
			})

			console.log($scope.popular);
		})
		.error (function (err) {
			console.error(err);
		})

	$DataService.shows.findRecent()
		.success(function (resp) {
			console.log("Got it");
			console.log(resp);

			$scope.recent = resp.map (function (r) {
				return {
					url: r.url
				}
			})

			console.log($scope.recent);
		})
		.error (function (err) {
			console.error(err);
		})
}])