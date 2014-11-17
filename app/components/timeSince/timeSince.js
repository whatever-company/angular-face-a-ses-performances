'use strict';

angular.module('app.timeSince', [])

.filter('timeSince', function (Config, Monitor) {
	function filter (input) {
		// let's waste some time
		Monitor.sleep(1);

		return window.moment(new Date(input)).from(Config.now || window.moment());
	}

	filter.$stateful = true;

	return filter;
});
