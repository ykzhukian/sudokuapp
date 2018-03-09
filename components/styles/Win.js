'use strict';

import { Font } from 'expo';

var React = require('react-native');

var {
  StyleSheet,
} = React;

var colors = require('./colors');

module.exports = StyleSheet.create({

  bg: {
    backgroundColor: colors.colors.background,
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 3
  }, 

  wrapper: {
    width: '80%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  messageText: {
    color: colors.colors.white,
    fontSize: 32,
    fontFamily: 'Dosis',
    textAlign: 'center'
  }

});