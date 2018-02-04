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
		justifyContent: 'center',
		alignItems: 'center',
	},

	wrapper: {
		width: 220
	},

	title: {
		fontSize: 64,
		fontFamily: 'Dosis',
		color: '#fff',
		textAlign: 'center',
		marginBottom: 10,
		zIndex: 3
	},

	titleShadow: {
		marginTop: -85,
		color: colors.colors.lightButtonShadow,
		zIndex: 2
	},

	titleWrapper: {
		position: 'relative',

	},

	button: {
		height: 55,
		width: '100%',
		marginTop: 20,
		borderRadius: 4,
		backgroundColor: colors.colors.green,
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 3
	},

	buttonText: {
		color: '#fff',
		fontSize: 28,
		fontFamily: 'Dosis-Light'
	},

	buttonShadow: {
		width: '100%',
		height: 16,
		borderRadius: 4,
		backgroundColor: colors.colors.greenShadow,
		marginTop: -10
	},

	yellow: {
		backgroundColor: colors.colors.yellow,
	},

	yellowShadow: {
		backgroundColor: colors.colors.yellowShadow,
	},

	orange: {
		backgroundColor: colors.colors.orange,
	},

	orangeShadow: {
		backgroundColor: colors.colors.orangeShadow,
	},

	red: {
		backgroundColor: colors.colors.error,
	},

	redShadow: {
		backgroundColor: colors.colors.errorShadow,
	}

});