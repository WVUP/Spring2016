tvApp.controller('showCtrl', ['$scope', '$stateParams', '$DataService', '$sce', function($scope, $stateParams, $DataService, $sce) {

	$(document).ready(function() {
		$(".container").css("background-color", "#e8dcc5");
	})


	console.log($stateParams);

	$scope.show = [];

	$scope.rating = "";

	 $scope.trustSrc = function(src) {

    	return $sce.trustAsResourceUrl(src);
  	}

	$scope.iframe = "";

	$DataService.shows.findOne($stateParams.showID)
		.success(function(resp) {
			console.log(resp);
			$scope.show = resp;
			$scope.rating = resp.rating;
			$scope.iframe = resp.iframeSrc;
		})
		.error(function(err) {
			console.error(err);
		})
		.finally(function() {
			console.log("POOP");
		});

}]);