var sampleApp = angular.module('sampleApp', ['ui.router']);


sampleApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'app/components/home/home.html',
			controller: 'homeCtrl'
		})
		.state('aboutMe', {
			url: '/about',
			templateUrl: 'app/components/about_me/about.html',
			controller: 'aboutCtrl'
		})
		.state('show', {
			url: '/shows/:teleShowsID',
			template: '<h1>{{show.title}}</h1>',
			controller: function ($scope, $stateParams, $DataService) {
				$scope.test = 'why hello gorgeous';
				console.log($stateParams);

				$scope.show = null;

				// Using the 'DataService' service below and the objects 'shows' and 'findOne' using the route called 'teleShowID.'
				// It knows it needs to be the appropriate _id from the database because of the below service 'findOne' function.
				// So if it's a legitimate _id, it will respond using the 'success' function.
				$DataService.shows.findOne($stateParams.teleShowsID)
					.success (function(resp) {
						console.log(resp);
						$scope.show = resp;
					});
				}
		});

}]);

//Service created called DataService that will organize and share code across my app that a directive will depend on.
sampleApp.factory('$DataService', ['$http', function($http) {
	var k = 'private';
	var test = 'Hello';

	return {
		display: test,
		test: test,
		shows: { // 'shows' comes from the attribute listed in the about html file, which can be the array of whatever 'shows' equals in the html file.
			find: function() {
				return $http.get('/teleshows');
			},
			findOne: function(_id) {
				return $http.get('/teleshows/' + _id);
			},
			//tie in my node js on fetching the genre data
			findCarousel_genre: function() {
				return $http.get('/teleshows/genre');
			}
		}
	}
}]);
//In the template, 'dataservice.test' should give you 'Hello"'

//Widget
sampleApp.directive('genreRow', [function () {
	return {
		restrict: 'A',
		scope: {
			label: '@',
			shows: '='
		},
	template: 'app/shared_components/genreshows.html',

	
	};
}]);

