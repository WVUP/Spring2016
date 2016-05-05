sampleApp.controller('showsCtrl', ['$scope', '$DataService', function ($scope, $DataService) {//'homeCtrl' - where the data lives
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
}]);