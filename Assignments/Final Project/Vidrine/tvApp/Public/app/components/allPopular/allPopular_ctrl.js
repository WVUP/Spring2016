tvApp.controller('popularCtrl', ['$scope', '$location', '$rootScope', '$DataService', '$http',  function ($scope, $location, $rootScope, $DataService, $http) {

	$(document).ready(function() {
		$(".container").css("background-color", "#e8dcc5");
	})


	$scope.popularShows = [];

	$DataService.shows.findPopular()
		.success(function (resp) {
			console.log("Got it");
			console.log(resp);

			$scope.popularShows = resp.map (function (r) {
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


}]);