sampleApp.controller('homeCtrl', ['$scope', '$timeout', function($scope, $timeout) {
	
	$scope.name = 'Aaron';
	var test = 'something';

	$scope.colors = ['blue', 'red', 'green', 'yellow', 'orange'];

	$scope.users = [
		{
			firstName: 'Aaron',
			lastName: 'Freeland'
		},
		{
			firstName: 'Josh',
			lastName: 'Pepper'
		},
		{
			firstName: 'Lane',
			lastName: 'Katris'
		}
	];

	$scope.show_alert = function () {
		$scope.showLogo = !$scope.showLogo;
	};

	$scope.showLogo = true;

	$timeout(function () {
		$scope.name = 'Freeland';
	}, 1000);
	
}]);
