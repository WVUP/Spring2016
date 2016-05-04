var tvApp = angular.module('tvApp', ['ui.router', 'ngMaterial']);

tvApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'app/components/home/home.html',
			controller: 'homeCtrl'
		})
		.state('login', {
			url: '/login',
			templateUrl: '/app/components/login/login.html',
			controller: 'logCtrl'
		})
		.state('admin', {
			fix: function () {
				$(".container").css("background-color", "transparent");
			},
			url: '/admin',
			templateUrl: '/app/components/admin/admin.html',
			controller: 'adminCtrl'
		})
		.state('test', {
			url: '/test',
			templateUrl: '/app/components/test/test.html',
			conroller: 'testCtrl'
		})

}]);


tvApp.factory('$DataService', ['$http', function ($http) {
	return {
		shows: {
			findPreview: function() {
			return $http.get('/api/preview');
			},
			findPopular: function() {
				return $http.get('/api/popular');
			},
			findRecent: function() {
				return $http.get('/api/recent');
			},
			findAll: function() {
				return $http.get('/api/all');
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

tvApp.directive('aShows', [function () {
	return {
		restrict: 'A',
		scope: {
			label: '@',
			shows: '='
		},
		templateUrl: 'app/shared_components/all.html'
	}
}])

tvApp.directive('crShow', [function () {
	return {
		restrict: 'A',
		scope: {
			label: '@',
			shows: '='
		},
		templateUrl: 'app/shared_components/create.html'
	}
}])

tvApp.directive('delShow', [function () {
	return {
		restrict: 'A',
		scope: {
			label: '@',
			shows: '='
		},
		templateUrl: 'app/shared_components/delete.html'
	}
}])