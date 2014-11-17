
'use strict';

angular.module('app.feed', [
	'ngRoute',
	'app.author',
	'app.monitor',
	'app.timeSince',
	'app.twittr'
])

.config(function($routeProvider) {
	$routeProvider.when('/feed', {
		templateUrl: 'feed/feed.html',
		controller: 'FeedCtrl'
	});
})

.controller('FeedCtrl', function($scope, Twittr) {
	$scope.textFilter = '';
	$scope.tweetFilter = null;

	Twittr.getFeed().then(function (tweets) {
		$scope.tweets = tweets;
	});

	$scope.filterTweets = function () {
		$scope.tweetFilter = $scope.textFilter ? {
			text: $scope.textFilter
		} : null;
	};
})

.controller('TweetCtrl', function ($scope, Monitor) {
	$scope.showReply = false;

	$scope.getTweetContent = function (tweet) {
		var content = tweet.text;

		Monitor.sleep(1); // this is time consuming!

		for(var i = tweet.entities.urls.length - 1; i >= 0; i--) {
			var url = tweet.entities.urls[i];
			content = content.substring(0, url.indices[0]) + url.expanded_url + content.substring(url.indices[1]);
		}
		return content;
	};

	$scope.initReply = function () {
		Monitor.sleep(1);

		$scope.reply = "@" + ($scope.tweet.retweeted_status || $scope.tweet).user.screen_name;
	};
});
