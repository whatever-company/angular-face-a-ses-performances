'use strict';

angular.module('app.timeSince', [])

.filter('timeSince', function (Monitor) {
	function filter (input, now) {
		// let's waste some time
		Monitor.sleep(1);

		return window.moment(new Date(input)).from(now || window.moment());
	}

	// filter.$stateful = true;

	return filter;
});
