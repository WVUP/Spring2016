sampleApp.controller('homeCtrl', ['$scope','$timeout', function($scope, $timeout) {//'homeCtrl' - where the data lives
				
				$scope.name = 'Alisha';
				var test = 'something'; //won't be shown because not $scoped

				$scope.colors = ['blue', 'red', 'green', 'yellow', 'orange'];

				$scope.users = [
					{
						firstName: 'alisha',
						lastName: 'jozwick'
					},
					{
						firstName: 'adam',
						lastName: 'jozwick'
					}
				];

				$scope.show_alert = function () {
					alert('Yes omg');
				};

				$scope.showLogo = true;

				$timeout(function () {
					$scope.name = 'Jozwick';
				}, 1000);
		
}]);