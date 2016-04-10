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
			url: '/shows/:showID',
			template: '<h1> {{show.name}}</h1>',
			controller: function($scope, $stateParams, $DataService) {
				$scope.test = 'yo momma';
				console.log($stateParams);

				$scope.show = null;

				var dialog = bootbox.alert("Loading Movie...");

				$DataService.shows.findOne($stateParams.showID)
					.success(function(resp) {
						console.log(resp);
						$scope.show = resp;
					})
					.error(function(err) {
						console.error(err);
					})
					.finally(function() {
						setTimeout(function() {
							dialog.modal('hide');
						}, 1000);
						
					});

			}
		});

}]);


// sampleApp.service('Repo', [function(){

// 	var k = 'private';
// 	this.test = 'Hello';

// }]);


sampleApp.factory('$DataService', ['$http', function($http){
	var k = 'private';
	var test = 'Hello';


	return {
		display: test,
		test: test,
		shows: {
			find: function() {
				return $http.get('/api/tvshows');
			},

			findOne: function(_id) {
				return $http.get('/api/tvshows/' + _id);
			}
		}
	};
}]);


sampleApp.directive('rowPreview', [function() {
	return {
		restrict: 'A',
		scope: {
			label: '@',
			shows: '='
		},
		template: 
			'<div class="row">' +
				'<div class="col-md-2 leading-box box">{{label}}</div>' +
				'<div class="col-md-2 box" ng-repeat="s in shows">' +
					'{{s.title}}' +
					'<img src="{{s.src}}"  alt="{{s.title}}"/>' + 
				'</div>' +
			'</div>',
		link: function(scope, iElement, iAttrs) {
			// body...
		}
	};
}]);


sampleApp.directive('socialBar', [function () {
	return {
		restrict: 'EA',
		scope: {
			includes: '=sample',
			label: '@'
		},
		templateUrl: 'app/shared_components/social_bar/bar.html',
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

			// Test if developer passed something in...add it to our list
			if(scope.includes && scope.includes.length > 0){

				for (var i = 0; i < scope.includes.length; i++) {
					
					// push their custom into our list =)
					scope.media.push(scope.includes[i]);
				}
			}
		}
	};
}]);