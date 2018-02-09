'use strict';

import { Font } from 'expo';

var React = require('react-native');

var {
  StyleSheet,
} = React;

var colors = require('./colors');

module.exports = StyleSheet.create({

	wrapper: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },

  cardWrapper: {
    width: '90%',
    backgroundColor: colors.colors.orange,
    borderRadius: 4,
    position: 'relative',
    zIndex: 1,
  },

  card: {
    padding: 10,
    
  },

  cardContainer: {
    width: '90%',
    borderRadius: 4,
    position: 'relative',
    zIndex: 1,
    alignItems: 'center',
  },

  cardShadow: {
    width: '90%',
    height: 20,
    position: 'relative',
    marginTop: -17,
    backgroundColor: colors.colors.orangeShadow,
    borderRadius: 4,
    alignItems: 'center',
  },

  cardReflectionLarge: {
    position: 'absolute',
    width: '50%',
    height: 5,
    backgroundColor: colors.colors.white,
    right: 12,
    top: 3,
    borderRadius: 4,
    opacity: 0.2,

  },

  cardReflectionRound: {
    position: 'absolute',
    width: 5,
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
    height: 20,
    backgroundColor: colors.colors.white,
    right: '1%',
    top: 3,
    borderRadius: 4,
    opacity: 0.2,

  },

  cardText: {
    fontFamily: 'Dosis',
    color: colors.colors.white,
  },

  savedProgressTitle: {
    fontFamily: 'Dosis',
    color: colors.colors.white,
    fontSize: 24,
    marginTop: 20,
    marginBottom: 20,

  },

  cardBar: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

});