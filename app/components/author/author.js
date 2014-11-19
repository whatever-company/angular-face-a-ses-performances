'use strict';

angular.module('app.author', [])

.run(function ($templateCache) {
	$templateCache.put('components/author/author.html',
		'<a href="http://twitter.com/{{ user.screen_name }}">' +
			'{{ user.name }}' +
			'<span class="desc">' +
				'({{ user.screen_name }})' +
			'</span>' +
		'</a>'
	);
})

.directive('appAuthor', function () {
	return {
		restrict: 'A',
		templateUrl: 'components/author/author.html',
		scope: {
			user: '=appAuthor'
		}
	};
});
