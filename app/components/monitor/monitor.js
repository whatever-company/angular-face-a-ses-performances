'use strict';

var _this;

angular.module('app.monitor', [])

.service('Monitor', function ($rootScope) {
	return {
		slowDown: true,

		digest: function () {
			setTimeout(function () {
				$rootScope.$apply();
			}, 0);
		},

		getNWatchers: function () {
			_this = this;
			var elts = document.getElementsByClassName('ng-scope');
			var watches = 0;
			var visited_ids = {};
			for (var i=0; i < elts.length; i++) {
				 var scope = angular.element(elts[i]).scope();
				 if (scope.$id in visited_ids)
					 continue;
				 visited_ids[scope.$id] = true;
				 watches += scope.$$watchers && scope.$$watchers.length || 0;
			}
			return watches;
		},

		sleep: function (ms) {
			if (!this.slowDown) return;

			ms += new Date().getTime();
			while (new Date() < ms) {}
		}
	};
})

.controller('MonitorCtrl', function ($scope, Config) {
	$scope.Config = Config;
})

.directive('appMonitorWatchers', function (Monitor) {
	return {
		restrict: 'A',

		link: function (scope, element) {
			scope.$watch(function () {
				setTimeout(function() {
					element.text(Monitor.getNWatchers());
				}, 10);
			});
		}
	};
})

.directive('appMonitorDigest', function () {
	return {
		restrict: 'A',

		link: function (scope, element, attrs) {
			scope.$watch(function () {
				setTimeout(function() {
					var digest = attrs.appMonitorDigest === 'max' ? '_maxDigest' : '_digest';
					element.text( (Math.round(angular[digest] * 100) / 100) + 'ms' );
				}, 10);
			});
		}
	};
});
