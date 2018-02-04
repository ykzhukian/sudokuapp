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
		height: '104%',
		width: '104%',
		top: '-2%',
		start: '-2%',
		position: 'absolute',
		borderRadius: 8,
		zIndex: 2
	},

	boardShadow: {
		backgroundColor: colors.colors.boardShadow,
		height: '104%',
		width: '104%',
		top: 10,
		start: '-2%',
		position: 'absolute',
		borderRadius: 8,
	}

});