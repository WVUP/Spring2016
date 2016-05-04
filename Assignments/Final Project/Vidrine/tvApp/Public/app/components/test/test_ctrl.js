tvApp.controller('testCtrl', ['$scope', '$location', '$rootScope', '$DataService', function ($scope, $location, $rootScope, $DataService) {

	$scope.submit = function()
	{

		if ($scope.username == 'isaacvidrine' && $scope.password == 1234) {
			$rootScope.loggedIn = true;
			$location.path('/administrator')
		}
		else
		{
			console.log("NOPE")
		}
	}
	
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