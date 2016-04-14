var tvApp = angular.module('tvApp', ['ui.router']);

tvApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'app/components/home/home.html',
			controller: 'homeCtrl'
		})

}]);


tvApp.factory('$DataService', ['$http', function ($http) {
	return {
		shows: {
			findPreview: function() {
			return $http.get('/preview');
			},
			findPopular: function() {
				return $http.get('/popular');
			},
			findRecent: function() {
				return $http.get('/recent');
			}
		}
	};
}]);

tvApp.directive('genrePreview', [function () {
	return {
		restrict: 'A',
		scope: {
			label: '@',
			shows: '='
		},
		templateUrl: 'app/shared_components/genres.html'
	}
}])

tvApp.directive('prShow', [function () {
	return {
		restrict: 'A',
		scope: {
			label: '@',
			shows: '='
		},
		templateUrl: 'app/shared_components/popularAndRecent.html'
	}
}])