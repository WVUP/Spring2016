var sampleApp = angular.module('sampleApp', ['ui.router']);


sampleApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('home', {
			url: '/',
			template:
				'<h2>hello from your {{name}} {{test}}</h2>' +
				'<input type="text" ng-model="name" /> updates two fields <span ng-bind="name"></span><br />' +
				'{{colors}} <br /><br />' +
				'<div ng-repeat="c in colors">I like the color: <span style="color:{{c}}">{{c}}</span></div><br /> <br/>' +
				'<div ng-repeat="user in users">{{user.firstName}} {{user.lastName}}</div><br /><br />' +
				'<div class="btn btn-success" ng-click="show_alert()">Do Something</div> <br /><br />' +
				'<img ng-if="showLogo" src="http://careerservices.wvu.edu/files/b60b08ca-8fe2-48ad-a924-2d6c88c7d3bc/128x128?cb=1432305394" alt=""/>',
			controller: function($scope, $timeout) {
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
			}
		});

}]);