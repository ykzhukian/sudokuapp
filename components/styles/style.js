'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;

var colors = require('./colors');

console.log(colors);

module.exports = StyleSheet.create({

	container: {
	  backgroundColor: colors.colors.background,
	  height: '100%',
    width: '100%',
    paddingTop: 20,

	}

});