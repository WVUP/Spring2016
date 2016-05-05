tvApp.controller('homeCtrl', ['$scope', '$DataService', '$rootScope', function ($scope, $DataService, $rootScope) {

	$(document).ready(function() {
		$(".container").css("background-color", "#e8dcc5");

	})

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
					genre: r.genre,
					series: r.series
				}
			})

			console.log($scope.genres);
		})
		.error (function (err) {
			console.error(err);
			console.log("NOPPEEEEEEE");
		})

	$DataService.shows.findPopular()
		.success(function (resp) {
			console.log("Got it");
			console.log(resp);

			$scope.popular = resp.map (function (r) {
				return {
					url: r.url,
					series: r.series
				}
			})

			console.log($scope.popular);
		})
		.error (function (err) {
			console.error(err);
			console.log("NOPPEEEEEEE");
		})

	$DataService.shows.findRecent()
		.success(function (resp) {
			console.log("Got it");
			console.log(resp);

			$scope.recent = resp.map (function (r) {
				return {
					url: r.url,
					series: r.series
				}
			})

			console.log($scope.recent);
		})
		.error (function (err) {
			console.error(err);
			console.log("NOPPEEEEEEE");
		})
}])