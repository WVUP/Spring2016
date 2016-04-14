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

				// Using the 'DataService' service below and the objects 'shows' and 'findOne' using the route called 'teleShowsID.'
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
				return $http.get('/teleshows' + _id);
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
	template:
		'<div class="row">' +
			'<div class="col-md-3 first-box box"><h1 class="list-label">{{label}}</h1></div>' +
			'<div class="col-md-3 box" ng-repeat="s in shows">' +
				'{{s.title}}' +
				'<img src="{{s.src}}" alt="{{s.title}}"/>' +
			'</div>' +
		'</div>' +
		'</div>',


// 		'<div class"well">' +
// 			'<div id="myCarousel" class="carousel slide" data-ride="carousel">' +
 
//   			//Wrapper for slides
//   			'<div class="carousel-inner" role="listbox">' +
//     			'<div class="item active">' +
//     				'<div class="row">' +
//       					'<div class="col-sm-3 first-box box"><h1 class="list-label">{{label}}</h1></div> '+
//       					'<div class="col-sm-3 box" ng-repeat="s in shows">' +
//       						'<img src="{{s.src}}" alt="image">' +
//       					'</div>' +
// 					'</div>' +// /row
// 				'</div>' +// /item active

//     '<div class="item">' +
//     	'<div class="row">' +
//       		'<div class="col-sm-3">' +
//       			'<img src="http://placehold.it/280x180" alt="image">' +
//       		'</div>' +
//       		'<div class="carousel-caption">...' +
        		
//       		'</div>' + // /col-sm-3 --> 
//     	'</div>' + ///row -->
//     '</div'> ... + ///item -->
    
//   '</div>' + ///carousel-inner -->

//   // <!-- Controls -->
//   // <a class="right carousel-control" href="#myCarousel" role="button" data-slide="next">
//   //   <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
//   //   <span class="sr-only">Next</span>
//   // </a><!--/controls-->

// '</div>' + ///myCarousel-->
// '</div>', ///well-->
	link: function (scope, iElement, iAttrs) {
		}
	};
}]);

