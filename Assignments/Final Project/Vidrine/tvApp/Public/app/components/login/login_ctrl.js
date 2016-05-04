tvApp.controller('logCtrl', ['$scope', '$location', '$rootScope', function ($scope, $location, $rootScope) {

	$(document).ready(function() {
		$(".container").css("background-color", "#e8dcc5");
	})

	$scope.submit = function()
	{

		if ($scope.username == 'isaacvidrine' && $scope.password == 1234) {
			$rootScope.loggedIn = true;
			$location.path('/admin')
		}
		else
		{
			console.log("NOPE")
		}
	}
	
}]);