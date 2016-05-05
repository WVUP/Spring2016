videoApp.controller('homeCtrl', ['$scope', '$DataService',  function($scope, $DataService){
	/*$scope.featured_shows = [
		{
			title: 'It\'s Always Sunny in Philedelphia',
			sliderImg: '/img/slides/always-sunny.jpg',
			sliderColor: '#fecb29'
		},
		{
			title: 'Fear the Walking Dead',
			sliderImg: '/img/slides/fear-walking-dead.jpg',
			sliderColor: '#2e2e2d'
		}
	]*/
	var k =  $DataService.display;
	$scope.async_popular = [];
	$scope.async_genre = [];
	$scope.async_featured = [];
	$DataService.show.findFeatured().success(function(resp){
		console.log('success');
		$scope.async_featured = resp.map(function(r){
			return {
				color: r.slideColor,
				slideImg: r.featuredSlide
			}
		});
	}).error(function(err){
		console.error(err);
	});
	$DataService.show.findGenres().success(function(resp){
		$scope.async_genre = resp.map(function(r){
			return {
				title: r.genre,
				imgUrl: r.genreImg
			};
		});
	}).error(function(err){
		console.error(err);
	});

	$DataService.show.findPopular().success(function(resp){
		
		$scope.async_popular = resp.map(function(r){
			return {
				title: r.franchiseName,
				imgUrl: r.franchiseImg
			}
		});
	}).error(function(err){
		console.error(err);
	});
}]);