var tvApp = angular.module('tvApp', ['ui.router', 'ngMaterial', 'ui.bootstrap', 'ngSanitize']);

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
			resolve: {
				"check": function($location, $rootScope) {
					if (!$rootScope.loggedIn) {
						$location.path('/login');
					}
				}
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
		.state('show', {
			url: '/shows/:showID',
			templateUrl: '/app/components/show/show.html',
			controller: 'showCtrl'
		})
		.state('allShows', {
			url: '/shows',
			templateUrl: '/app/components/allShows/allShows.html',
			controller: 'showCtrl'
		})
		.state('allGenres', {
			url: '/genres',
			templateUrl: '/app/components/allGenres/allGenres.html',
			controller: 'genresCtrl'
		})
		.state('allRecent', {
			url: '/recent',
			templateUrl: '/app/components/allRecent/allRecent.html',
			controller: 'recentCtrl'
		})
		.state('allPopular', {
			url: '/popular',
			templateUrl: '/app/components/allPopular/allPopular.html',
			controller: 'popularCtrl'
		})

}]);


tvApp.factory('$DataService', ['$http', function ($http) {
	return {
		shows: {
			findOne: function(_id) {
				return $http.get('/api/shows/' + _id);
			},
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
			},
			findComedy: function() {
				return $http.get('/api/comedy');
			},
			findThriller: function() {
				return $http.get('/api/thriller');
			},
			findAction: function() {
				return $http.get('/api/action');
			},
			findDrama: function() {
				return $http.get('/api/drama');
			},
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

tvApp.directive('rShow', [function () {
	return {
		restrict: 'A',
		scope: {
			label: '@',
			shows: '='
		},
		templateUrl: 'app/shared_components/recent.html'
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