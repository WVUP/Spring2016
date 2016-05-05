tvApp.controller('recentCtrl', ['$scope', '$location', '$rootScope', '$DataService', '$http',  function ($scope, $location, $rootScope, $DataService, $http) {

	$(document).ready(function() {
		$(".container").css("background-color", "#e8dcc5");
	})


	$scope.recentShows = [];

	$DataService.shows.findRecent()
		.success(function (resp) {
			console.log("Got it");
			console.log(resp);

			$scope.recentShows = resp.map (function (r) {
				return {
					url: r.url,
					genre: r.genre,
					series: r.series
				}
			})

			console.log($scope.recentShows);
		})
		.error (function (err) {
			console.log("NOPEEEEEEEEEEEEEEEEEEEEEE");
		})


}]);