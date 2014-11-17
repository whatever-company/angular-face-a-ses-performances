#!/usr/bin/env node

'use strict';

var express = require('express'),
	compression = require('compression'),
	morgan = require('morgan'),
	serveIndex = require('serve-index');


var oneYear = 86400000 * 364;

function slowness(req, res, next) {
	/* jshint unused: true */
	setTimeout(function () {
		next();
	}, /author\.html$/.test(req.url) ? 2000 : 0);
}

// Production server with compression and caching enabled.
express()
	.use(morgan('dev'))
	.use(compression())
	.use(slowness)
	.use(serveIndex(__dirname + '/..'))
	.use(express['static'](__dirname + '/..', {maxAge: oneYear }))
	.listen(8000);

console.log('Listening on http://localhost:8000/ for ' + __dirname);
