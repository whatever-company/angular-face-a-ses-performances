'use strict';

angular.module('app', [
	'ngRoute',
	'app.feed'
])

.config(function($routeProvider) {
	$routeProvider.otherwise({redirectTo: '/feed'});
})

.value('Config', {
	now: null
});
