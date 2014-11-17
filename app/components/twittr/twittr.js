'use strict';

angular.module('app.twittr', [])

.run(['$q', '$rootScope', function ($q, $rootScope) {
	/* jshint unused: false */

	function oauth() {
		var deferred = $q.defer();

		window.OAuth.initialize('Z691BzOXc2_iELTA4e8x5mrYfBc');

		window.OAuth.popup('twitter', { cache: true }).done(function (result) {
			$rootScope.$apply(function () {
				deferred.resolve(result);
			});
		}).fail(function (error) {
			$rootScope.$apply(function () {
				deferred.reject(error);
			});
		});

		return deferred.promise;
	}

	function getFeed() {
		oauth().then(function (twittr) {
			twittr.get('https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=LaFeWeb&count=200').done(function (result) {

				console.log("n results=", result.length);
				console.log(angular.toJson(result));
				console.log(result);

			}).fail(function (error) {
				console.log(error);
			});
		});
	}

	// getFeed();
}])

.service('Twittr', ['$http', function ($http) {
	return {
		getFeed: function () {
			return $http.get('components/twittr/tweets.json').then(function (response) {
				return response.data;
			});
		}
	};
}]);
