'use strict';

import { Font } from 'expo';

var React = require('react-native');

var {
  StyleSheet,
} = React;

var colors = require('./colors');

module.exports = StyleSheet.create({

	selected: {
    borderWidth: 1,
    borderColor: 'orange',
  },
  error: {
    backgroundColor: '#fc8585',
  },
  highlistText: {
    color: '#fff'
  },
  activated: {
    fontWeight: 'bold',
    fontFamily: 'Dosis'
  },
  flag: {
    backgroundColor: '#42bcf4'
  },
  cellWrapper: {
    flex: 1,
    aspectRatio: 1,
    margin: 3,
    position: 'relative'
  },
  cell: {
    flex: 1,
    width: '100%',
    aspectRatio: 1,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.colors.darkButton,
    position: 'absolute',
    zIndex: 9
  },
  cellShadow: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 2,
    position: 'absolute',
    width: '100%',
    backgroundColor: colors.colors.darkButtonShadow,
    bottom: -4
  },
  cellText: {
    fontSize: 18,
    fontFamily: 'Dosis',
    color: '#fff'
  },
  lightCell: { 
    backgroundColor: colors.colors.lightButton,
  },
  lightCellShadow: { 
    backgroundColor: colors.colors.lightButtonShadow,
  },

});