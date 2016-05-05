var videoApp = angular.module('videoApp', ['ui.router']);


videoApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'app/components/home/home.html',
			controller: 'homeCtrl'
		})
		.state('genre', {
			url: '/genre/:genre',
			templateUrl: 'app/components/genre/genre.html',
			controller: 'genreCtrl'
		})
}]);
videoApp.factory('$DataService', ['$http', function($http){
	return{
		show: {
			findGenres: function(){
				return $http.get('/api/tv/genre/');
			},
			findPopular: function(){
				return $http.get('/api/tv/popular');
			}, 
			findFeatured: function(){
				return $http.get('/api/tv/featured');
			}, 
			getGenre: function(_genre){
				return $http.get('/api/tv/genre/' +  _genre);
			},
			getShowCount: function(_showName){
				return $http.get('/api/tv/count/show/'+ _showName);
			}
		}
	}

}]);

videoApp.directive('homeRows',[function(){
	return {
		restrict: 'A',
		scope: {
			lbl: '@',
			type: '@',
			num: '@',
			show: '='
		},
		templateUrl: 'app/directives/home-row/home-row.html',
		link: function(scope, iElement, iAttrs){
			//body...
		}

	}
}]);
/*videoApp.directive('showInfo', [function(){
	return{
		restrict: 'A',
		scope: {
			lbl: '@',
			show: '=',
		}
		templateUrl: 'app/directives/show-info/show-info.html',
		link: function(scope, iElement, iAttrs){

		}
	}
}])*/

/*sampleApp.directive('searchBar', [function () {
	return{
		restric: 'EA',
		scope: {
			includes: '='
		}, 
		templateUrl: 'app/shared-components/search/search.html',
		link: function (scope, iElement, iAttrs){
			console.log(scope.includes);
			scope.media = [
				{
					
				}
			]
		}
	}
}])*/