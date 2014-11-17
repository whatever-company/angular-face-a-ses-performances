'use strict';

angular.module('app.author', [])

.directive('appAuthor', function () {
	return {
		restrict: 'A',
		templateUrl: 'components/author/author.html',
		scope: {
			user: '=appAuthor'
		}
	};
});
