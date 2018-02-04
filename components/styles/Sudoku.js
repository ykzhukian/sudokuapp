'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;

var colors = require('./colors');

console.log(colors);

module.exports = StyleSheet.create({

	container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },

  wrapper: {
    marginBottom: 50,
    position: 'relative'
  },

  row: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 3
  },

  clear: {
    marginTop: 50
  },

  active: {
    textDecorationLine: 'underline'
  },

  board: {
		backgroundColor: colors.colors.board,
		height: '108%',
		width: '106%',
		top: '-4%',
		start: '-3%',
		position: 'absolute',
		borderRadius: 8,
		zIndex: 2
	},

	boardShadow: {
		backgroundColor: colors.colors.boardShadow,
		height: '104%',
		width: '106%',
		top: 20,
		start: '-3%',
		position: 'absolute',
		borderRadius: 8,
	},

	toolBar: {
		paddingTop: 20,
		flex: 1, 
		flexDirection: 'row', 
		maxHeight: 100,
		justifyContent: 'space-between',
	},

	clearWrapper: {
		backgroundColor: colors.colors.board,
		height: 50,
		width: 50,
		borderRadius: 4,
		alignItems: 'center',
		justifyContent: 'center'
	},

	title: {
		fontFamily: 'Dosis',
		fontSize: 28,
		height: 50,
		lineHeight: 50,
		color: colors.colors.lightButton
	}

});