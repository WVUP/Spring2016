videoApp.controller('genreCtrl', ['$scope', '$stateParams','$DataService', function($scope, $stateParams, $DataService){
	$scope.pagetitle = $stateParams.genre;
	var k = $DataService.display;
	$scope.async_specificGenre = [];
	$scope.async_details = [];
	$DataService.show.getGenre($stateParams.genre).success(function(resp){
		console.log(resp);
		$scope.async_specificGenre = resp.map(function(r){
			return{
				title: r.franchiseName,
				img: r.franchiseImg
			}
		})

	}).error(function(err){
		console.log(err);
	})

	//$DataService.show.getShowCount($)
}]);