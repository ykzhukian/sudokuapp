'use strict';

import { Font } from 'expo';

var React = require('react-native');

var {
  StyleSheet,
} = React;

var colors = require('./colors');

module.exports = StyleSheet.create({

  progressWrapper: {
    width: '100%',
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginBottom: 15,
  },

	wrapper: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },

  cardWrapper: {
    width: '100%',
    backgroundColor: colors.colors.lightButton,
    borderRadius: 4,
    position: 'relative',
    zIndex: 1,
    height: 48,
    flexDirection: 'column',
    justifyContent: 'center',
  },

  card: {
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 20,
  },

  cardContainer: {
    width: '80%',
    borderRadius: 4,
    position: 'relative',
    zIndex: 1,
    alignItems: 'center',
  },

  cardShadow: {
    width: '100%',
    height: 20,
    position: 'relative',
    marginTop: -15,
    backgroundColor: colors.colors.lightButtonShadow,
    borderRadius: 4,
    alignItems: 'center',
  },

  cardReflectionLarge: {
    position: 'absolute',
    width: '50%',
    height: 5,
    backgroundColor: colors.colors.white,
    right: 16,
    top: 3,
    borderRadius: 4,
    opacity: 0.2,

  },

  cardReflectionRound: {
    position: 'absolute',
    width: 8,
    height: 5,
    backgroundColor: colors.colors.white,
    right: '1%',
    top: 3,
    borderRadius: 4,
    opacity: 0.2,

  },

  cardReflection: {
    position: 'absolute',
    width: '98%',
    height: '50%',
    backgroundColor: colors.colors.white,
    right: '1%',
    top: 3,
    borderRadius: 4,
    opacity: 0.2,

  },

  cardText: {
    fontFamily: 'Dosis',
    color: colors.colors.white,
    fontSize: 18,

  },

  savedProgressTitle: {
    fontFamily: 'Dosis',
    color: colors.colors.white,
    fontSize: 24,
    marginTop: 20,
    marginBottom: 20,

  },

  previewWrapper: {
    height: '100%',
  }


});