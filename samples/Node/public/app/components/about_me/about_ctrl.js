sampleApp.controller('aboutCtrl', ['$scope', function($scope) {

	$scope.test = 'It works =)';

	$scope.custom_includes = [
		{
			name: 'GitHub',
			src: 'http://www.datanucleus.org/images/GitHub-Mark-64px.png'
		}
	];
	
}]);
