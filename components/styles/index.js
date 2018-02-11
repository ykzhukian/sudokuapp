'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;

var colors = require('./colors');

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
		width: 220,
		zIndex: 999
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

	buttonWrapper: {
		position: 'relative',
		marginTop: 20,
		height: 60,
	},

	button: {
		width: '100%',
		borderRadius: 4,
		backgroundColor: colors.colors.green,
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 3,
		position: 'absolute',
		top: 0,
		height: 60
	},

	buttonReflection: {
		position: 'absolute',
		width: '96%',
		backgroundColor: colors.colors.white,
		top: 2,
		height: '50%',
		borderRadius: 3,
		opacity: 0.2
	},

	buttonReflectionRound: {
		position: 'absolute',
		width: 10,
		height: 5,
		borderRadius: 3,
		right: '2%',
		top: 2,
		backgroundColor: colors.colors.white,
		opacity: 0.3,
	},

	buttonReflectionLarge: {
		position: 'absolute',
		width: '50%',
		height: 5,
		borderRadius: 3,
		right: '5%',
		top: 2,
		backgroundColor: colors.colors.white,
		marginRight: 8,
		opacity: 0.3,
	},

	buttonPressed: {
		marginTop: 5
	},

	buttonText: {
		color: '#fff',
		fontSize: 28,
		fontFamily: 'Dosis-Light'
	},

	buttonShadow: {
		position: 'absolute',
		width: '100%',
		height: 30,
		borderRadius: 4,
		backgroundColor: colors.colors.greenShadow,
		marginBottom: -5,
		bottom: 0
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
	},

	bg: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		zIndex: 3
	},

	bgImg: {
		width: '100%',
		height: '100%',
		position: 'absolute',
		top: 25,
		start: 0
	},

	loadingWrapper: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
    position: 'absolute',
    top: 0,
    left: 0,
    
  }

});