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
		.state('tv', {
			url: '/tv/:teleShowsID',
			template: '<h1>{{shows.tv.title}}</h1>' +
			'{{test}}',
			controller: function ($scope, $stateParams, $DataService) {
				$scope.test = 'why hello gorgeous';
				console.log($stateParams);

				$scope.tv = null;

				// Using the 'DataService' service below and the objects 'shows' and 'findOne' using the route called 'teleShowID.'
				// It knows it needs to be the appropriate _id from the database because of the below service 'findOne' function.
				// So if it's a legitimate _id, it will respond using the 'success' function.
				$DataService.shows.findOne($stateParams.teleShowsID)
					.success (function(resp) {
						console.log(resp);
						$scope.tv = resp.map(function (r) {
							return {
								title = r.title
							}
						});
					});
				}
		})
		.state('genres', {
			url:'/browse_genre',
			template: '<h1>{{name}}</h1>' +
			'<div ng-repeat="s in shows"></div>' +
			'<img src={{s.url}}>' +
			'<div data-genre-row label="Genres" shows="genres"></div>',
			controller: 'homeCtrl'
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
				return $http.get('/teleshows/genre/');
			},
			// popular shows
			findPopular: function() {
				return $http.get('/teleshows/popular/');
			},
			// recently added shows
			findRecent: function() {
				return $http.get('/teleshows/recently-added/');
			}
		}
	}
}]);
//In the template, 'dataservice.test' should give you 'Hello"'

//Widget for the front page "Genres"
sampleApp.directive('genreRow', [function () {
	return {
		restrict: 'A',
		scope: {
			label: '@',
			shows: '='
		},
	template: 
	'<div class="row">' +
		'<div class="col-sm-2 first-box">' +
			'<h1 class="list-label">{{label}}</h1>' +
		'</div>' +
		'<div class="col-sm-2" ng-repeat="s in shows">' +
			'<img src={{s.url}}>' +
		'</div>' +
	'</div>',
	
	link: function (scope, iElement, iAttrs) {
		}
			
	};
}]);

// Widget for the front page Popular row
sampleApp.directive('popularRow', [function() {
	return {
		restrict: 'A',
		scope: {
			label: '@',
			shows: '='
		},
		template: 
		'<div class="row">' +
			'<div class="col-sm-2 first-box"><h1 class="list-label">{{label}}</h1></div>' +
			'<div class="col-sm-2" ng-repeat="s in shows">' +
				'<img src={{s.url}}>' +
			'</div>' +
		'</div>',
		link: function (scope, iElement, iAttrs) {
		}
	};

}]);

// Widget for the front page Recently Added row
sampleApp.directive('recentRow', [function() {
	return {
		restrict: 'A',
		scope: {
			label: '@',
			shows: '='
		},
		template: 
		'<div class="row">' +
			'<div class="col-sm-2 first-box"><h1 class="list-label">{{label}}</h1></div>' +
			'<div class="col-sm-2" ng-repeat="s in shows">' +
				'<img src={{s.url_new}}>' +
			'</div>' +
		'</div>',
	}
}]);


