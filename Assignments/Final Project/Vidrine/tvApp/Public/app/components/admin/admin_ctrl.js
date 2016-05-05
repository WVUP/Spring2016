tvApp.controller('adminCtrl', ['$scope', '$location', '$rootScope', '$DataService', '$http',  function ($scope, $location, $rootScope, $DataService, $http) {

	$(document).ready(function() {
		$(".container").css("background-color", "transparent");
	})

	$scope.allTvShows = [];

	$scope.selectedItem;

	$scope.getSelectedText = function() {

		if ($scope.selectedItem !== undefined) {
		  return "You have selected: Item " + $scope.selectedItem;
		} 

		else {
		  return "Please select an item";
		}
	}

	$scope.createShow = function () {
		$http({
			method: 'POST',
			url: '/api/post',
			data: $scope.newShow
		})
	}

	$DataService.shows.findAll()
		.success(function (resp) {
			console.log("Got it");
			console.log(resp);

			$scope.allTvShows = resp.map (function (r) {
				return {
					url: r.url,
					genre: r.genre,
					series: r.series
				}
			})

			console.log($scope.allTvShows);
		})
		.error (function (err) {
			console.log("NOPEEEEEEEEEEEEEEEEEEEEEE");
		})
}]);