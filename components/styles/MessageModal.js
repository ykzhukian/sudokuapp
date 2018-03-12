'use strict'

import { Font } from 'expo'

var React = require('react-native')

var {
  StyleSheet
} = React

var colors = require('./colors')

module.exports = StyleSheet.create({

  container: {
    borderWidth: 2,
    borderColor: colors.colors.lightButton,
    borderRadius: 4,
    padding: 20,
    backgroundColor: colors.colors.darkButtonShadow,
    position: 'absolute',
    zIndex: 999
  },

  messageText: {
    color: colors.colors.white,
    fontFamily: 'Dosis',
    fontSize: 18,
    textAlign: 'center'
  },

  buttonsWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },

  notificationModal: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20
  },

  buttonWrapper: {
    width: '48%',
    position: 'relative',
    height: 50
  },

  button: {
    width: '100%',
    backgroundColor: colors.colors.flag,
    borderRadius: 4,
    height: 50,
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 1
  },

  buttonShadow: {
    position: 'absolute',
    backgroundColor: colors.colors.flagShadow,
    bottom: -5,
    width: '100%',
    height: 20,
    borderRadius: 4
  },

  reflection: {
    width: '96%',
    height: '50%',
    backgroundColor: colors.colors.white,
    opacity: 0.2,
    zIndex: 2,
    borderRadius: 3,
    position: 'absolute',
    left: '2%',
    top: 2
  },

  reflectionLarge: {
    height: 5,
    width: '50%',
    backgroundColor: colors.colors.white,
    opacity: 0.2,
    zIndex: 2,
    position: 'absolute',
    right: '12%',
    top: 2,
    borderRadius: 3
  },

  reflectionRound: {
    height: 5,
    width: 8,
    backgroundColor: colors.colors.white,
    opacity: 0.2,
    zIndex: 2,
    position: 'absolute',
    right: '2%',
    top: 2,
    borderRadius: 3
  },

  cancel: {
    backgroundColor: colors.colors.error
  },

  cancelShadow: {
    backgroundColor: colors.colors.errorShadow
  }

})
