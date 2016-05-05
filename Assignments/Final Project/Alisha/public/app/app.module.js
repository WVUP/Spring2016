var sampleApp = angular.module('sampleApp', ['ui.router','angular.filter']);


sampleApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'app/components/home/home.html',
			controller: 'homeCtrl'
		})

		.state('tv', {
			url: '/tv/:teleShowsID',
			templateUrl: 'app/components/shows/shows.html', 
			
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
						$scope.tv = resp;

						if (tv.rating == 5) {
			return res.send('.star-rating .fa');
		};
						
					});
				}
		})
		.state('browsegenres', {
			url:'/browsegenres',
			templateUrl: 'app/components/browse/genre.html',
			controller: 'browseCtrl'
		})

		.state('browsepopular', {
			url:'/browsepopular',
			templateUrl: 'app/components/browse/popular.html',
			controller: 'homeCtrl'
		})
		.state('browserecent', {
			url:'/browserecent',
			templateUrl: 'app/components/browse/recent.html',
			controller:'homeCtrl'
		})

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
			},
			findGenre: function() {
				return $http.get('/teleShows/browseGenre');
			}
		}
	}
}]);

//Widget for the front page "Genres"
sampleApp.directive('genreRow', [function () {
	return {
		restrict: 'A',
		scope: {
			label: '@',
			shows: '='
		},
	templateUrl: 'app/shared_components/browsegenres.html',
	
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
		templateUrl:'app/shared_components/browsepopular.html',
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
		templateUrl:'app/shared_components/browserecent.html',
	}
}]);

sampleApp.directive('socialMedia', [function () {
	return {
		restrict: 'A',
		scope: {
			includes: '=sample',
			label: '@'
		},
		templateUrl: 'app/shared_components/footer.html',
		link: function (scope, iElement, iAttrs) {
			console.log(scope.includes);
			scope.media = [
				{
					name: 'google+',
					src: 'https://cdn1.iconfinder.com/data/icons/logotypes/32/circle-google-plus-128.png'
				},
				{
					name: 'facebook',
					src: 'http://huboncampus.com/wp-content/themes/hub-tucson2/images/social/facebook/facebook-256-black.png'
				},
				{
					name: 'twitter',
					src: 'http://icon-icons.com/icons2/67/PNG/128/twitter_13327.png'
				}

			];

			}
		}
	}]);



