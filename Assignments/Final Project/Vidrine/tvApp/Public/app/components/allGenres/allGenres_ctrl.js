tvApp.controller('genresCtrl', ['$scope', '$location', '$rootScope', '$DataService', '$http',  function ($scope, $location, $rootScope, $DataService, $http) {

	$(document).ready(function() {
		$(".container").css("background-color", "#e8dcc5");
	})



	$scope.comedies = [];
	$scope.thrillers = [];
	$scope.actions = [];
	$scope.dramas = [];

	$DataService.shows.findComedy()
		.success(function (resp) {
			console.log("Got it");
			console.log(resp);

			$scope.comedies = resp.map (function (r) {
				return {
					url: r.url,
					genre: r.genre,
					series: r.series
				}
			})

			console.log($scope.comedies);
		})
		.error (function (err) {
			console.log("NOPEEEEEEEEEEEEEEEEEEEEEE");
		})

	$DataService.shows.findAction()
		.success(function (resp) {
			console.log("Got it");
			console.log(resp);

			$scope.actions = resp.map (function (r) {
				return {
					url: r.url,
					genre: r.genre,
					series: r.series
				}
			})

			console.log($scope.actions);
		})
		.error (function (err) {
			console.log("NOPEEEEEEEEEEEEEEEEEEEEEE");
		})
	
	$DataService.shows.findThriller()
		.success(function (resp) {
			console.log("Got it");
			console.log(resp);

			$scope.thrillers = resp.map (function (r) {
				return {
					url: r.url,
					genre: r.genre,
					series: r.series
				}
			})

			console.log($scope.thrillers);
		})
		.error (function (err) {
			console.log("NOPEEEEEEEEEEEEEEEEEEEEEE");
		})	

	$DataService.shows.findDrama()
		.success(function (resp) {
			console.log("Got it");
			console.log(resp);

			$scope.dramas = resp.map (function (r) {
				return {
					url: r.url,
					genre: r.genre,
					series: r.series
				}
			})

			console.log($scope.dramas);
		})
		.error (function (err) {
			console.log("NOPEEEEEEEEEEEEEEEEEEEEEE");
		})



}]);