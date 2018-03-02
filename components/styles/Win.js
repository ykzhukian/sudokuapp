'use strict';

import { Font } from 'expo';

var React = require('react-native');

var {
  StyleSheet,
} = React;

var colors = require('./colors');

module.exports = StyleSheet.create({

  control: {
    marginTop: 50
  },

	controlWrapper: {
    height: 50,
    width: 50,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },

  controlImage: {
    height: 50,
    width: 50,
    zIndex: 2,
    position: 'absolute',
    start: 0,
    bottom: 0
  },

  pressed: {
    marginBottom: -4
  },

  controlShadow: {
    backgroundColor: colors.colors.boardShadow,
    height: 10,
    width: '100%',
    position: 'absolute',
    bottom: -4,
    start: 0,
    borderRadius: 4,
  },

});