'use strict'

import { Font } from 'expo'

var React = require('react-native')

var {
  StyleSheet
} = React

var colors = require('./colors')

module.exports = StyleSheet.create({

  selected: {
    backgroundColor: colors.colors.selected
  },
  selectedShadow: {
    backgroundColor: colors.colors.selectedShadow
  },
  error: {
    backgroundColor: colors.colors.error
  },
  errorShadow: {
    backgroundColor: colors.colors.errorShadow
  },
  highlistText: {
    color: '#fff'
  },
  activated: {
    fontWeight: 'bold',
    fontFamily: 'Dosis'
  },
  flag: {
    backgroundColor: colors.colors.flag
  },
  flagShadow: {
    backgroundColor: colors.colors.flagShadow
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
    bottom: -3
  },
  cellText: {
    fontSize: 20,
    fontFamily: 'Dosis',
    color: colors.colors.white
  },
  lightCell: {
    backgroundColor: colors.colors.lightButton
  },
  lightCellShadow: {
    backgroundColor: colors.colors.lightButtonShadow
  },
  fade: {
    opacity: 0.4
  }

})
