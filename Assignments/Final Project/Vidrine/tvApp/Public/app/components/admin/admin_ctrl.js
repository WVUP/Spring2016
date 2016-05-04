tvApp.controller('adminCtrl', ['$scope', '$location', '$rootScope', '$DataService', function ($scope, $location, $rootScope, $DataService) {

	$(document).ready(function() {
		$(".container").css("background-color", "transparent");
	})

	$scope.allTvShows = [];

	$DataService.shows.findAll()
		.success(function (resp) {
			console.log("Got it");
			console.log(resp);

			$scope.allTvShows = resp.map (function (r) {
				return {
					url: r.url,
					genre: r.genre
				}
			})

			console.log($scope.allTvShows);
		})
		.error (function (err) {
			console.log("NOPEEEEEEEEEEEEEEEEEEEEEE");
		})
}]);