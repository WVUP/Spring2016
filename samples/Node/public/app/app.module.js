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
		});

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
}])