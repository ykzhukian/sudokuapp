import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Alert, Dimensions, Image } from 'react-native';

import Util from '../helpers/Util';

import Cell from './Cell';
import InputModal from './InputModal';
import RestoreList from './RestoreList';
import { Font } from 'expo';


const style = require('./styles/Sudoku');

export default class Sudoku extends Component {

	constructor(props) {
    super(props)
  
    this.state = {
     inputModal: false,
     selected: {},
     sudoku: '',
     currentSudoku: '',
     prefilledArr: '',
     errors: [],
     flags: [],
     highlight: {}
    }
  }

  componentWillMount() {
    this.initialiseSudoku(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.finished) {
      this.initialiseSudoku(nextProps);
    }
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Dosis': require('../assets/fonts/Dosis-ExtraBold.ttf'),
      'Dosis-Light': require('../assets/fonts/Dosis-Bold.ttf'),
    });
    //Setting the state to true when font is loaded.
    this.setState({ fontLoaded: true });
  }

  initialiseSudoku(props) {
    let prefilledArr = Util.generatePrefilled(props.prefilled);

    let newSudoku = Util.newSudoku();
    let currentSudoku = newSudoku.slice();
    newSudoku.forEach((row, rowIndex) => {
      currentSudoku[rowIndex] = newSudoku[rowIndex].slice();
      row.forEach((value, index) => {
        if (!Util.checkDuplicate(prefilledArr, [rowIndex, index])) {
          currentSudoku[rowIndex][index] = ''; 
        }
      })
    });

    this.setState({
      sudoku: newSudoku,
      prefilledArr: prefilledArr,
      currentSudoku: currentSudoku,
      errors: [],
      initial: true,
      saved: []
    });
  }

  save() {
    let currentSudoku = this.state.currentSudoku;
    let saved = this.state.saved;

    if (saved.length > 8) {
      Alert.alert(
        'Sorry',
        'Can only store 9 progress.',
        [
            {text: 'OK', onPress: () => console.log('Cancel Pressed')},
        ]
    )
      return;
    }

    let toBeSavedSudoku = currentSudoku.slice();
    currentSudoku.forEach((row, rowIndex) => {
      toBeSavedSudoku[rowIndex] = currentSudoku[rowIndex].slice();
      row.forEach((value, index) => {
        toBeSavedSudoku[rowIndex][index] = value;
      })
    });

    let toBeSaved = {
      id: Date.now(),
      sudoku: toBeSavedSudoku
    }
    saved.push(toBeSaved);
    this.setState({
      saved: saved
    })
  }

  delete(id) {
    Alert.alert(
        'Deleting',
        'Cannot recover, sure?',
        [
            {text: 'Go on', onPress: () => {
              var saved = this.state.saved.filter(function(el) { return el.id != id; }); 
              this.setState({
                saved: saved
              })
            }},
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
        ]
    )
  }

  restore(sudoku) {
    let toBeRestored = sudoku.slice();
    sudoku.forEach((row, rowIndex) => {
      toBeRestored[rowIndex] = sudoku[rowIndex].slice();
      row.forEach((value, index) => {
        toBeRestored[rowIndex][index] = value;
      })
    });

    let errors = Util.verifyValue(toBeRestored);

    this.setState({
      currentSudoku: toBeRestored,
      errors: errors
    })
  }

  clear() {
    Alert.alert(
        'Warning',
        'Cannot recover, sure?',
        [
            {text: 'Sure', onPress: () => {
              let currentSudoku = this.state.currentSudoku;
              currentSudoku.forEach((row, rowIndex) => {
                row.forEach((value, index) => {
                  if (
                      !Util.checkDuplicate(this.state.prefilledArr, [rowIndex, index]) &&
                      !Util.checkDuplicate(this.state.flags, [rowIndex, index])
                    ) {
                    currentSudoku[rowIndex][index] = ''; 
                  }
                })
              });
              let errors = Util.verifyValue(currentSudoku);
              this.setState({
                currentSudoku: currentSudoku,
                errors: errors
              });
            }},
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
        ]
    )
  }

  addFlag(position) {
    let flags = this.state.flags;
    flags.push([position.row, position.col]);
    this.setState({
      flags: flags
    })
  }

  removeFlag(position) {
    let flags = this.state.flags;
    Util.removeFromArr(flags,[position.row, position.col]);
    this.setState({
      flags: flags
    })
  }

  showInputModal(position) {

    let axis = Util.checkAxis(position);
    let highlight = {
      axis: axis,
      row: position.row,
      col: position.col
    }
    // console.log('axis ',axis)
    
    this.setState({
      inputModal: true,
      selected: position,
      highlight: highlight
    })
  }

  hideInputModal() {
    this.setState({
      inputModal: false,
      selected: {},
      highlight: {}
    })
  }

  update(val) {

    let currentSudoku = this.state.currentSudoku.map((row, rowIndex) => {
      row.map((value, index) => {
        if (this.state.selected && this.state.selected.row === rowIndex && this.state.selected.col === index) {
          row[index] = val;
          this.removeFlag({row: this.state.selected.row, col: this.state.selected.col});
        }
      })
      return row;
    });

    let errors = Util.verifyValue(currentSudoku);

    this.setState({
      currentSudoku: currentSudoku,
      errors: errors,
      initial: false
    })
  }


  render() {

    // let error = Util.checkDuplicate(this.props.data.errors, [this.state.row, this.state.col]);

    const sudokuBlock = this.state.currentSudoku.length
    ?
    this.state.currentSudoku.map((row, rowIndex) => (
      <View key={rowIndex} style={style.row}>
        {row.map((value, index) => (
          <Cell 
            key={index} 
            data={{
              value: value,
              activated: !Util.checkDuplicate(this.state.prefilledArr, [rowIndex, index]) && !this.props.finished,
              errors: this.state.errors,
              row: rowIndex,
              col: index,
              selected: this.state.selected && this.state.selected.row === rowIndex && this.state.selected.col === index,
              flag: Util.checkDuplicate(this.state.flags, [rowIndex, index]),
              highlight: this.state.highlight,
              inputModal: this.state.inputModal,
              selectedLink: (this.state.selected.row || this.state.selected.row === 0 ? this.state.currentSudoku[this.state.selected.row][this.state.selected.col] : '')
            }} 
            showInput={(position) => this.showInputModal(position)}
            // updateSudoku={ (value, position) => this.update(value, position) } 
            removeFlag={ (value, position) => this.removeFlag(value, position) } 
            addFlag={ (position) => this.addFlag(position) }
            /> 
        ))}
      </View>
    ))
    : (<View><Text>Loading...</Text></View>);


    return (
      <View style={style.container} >

        <View style={[style.toolBar, {width: Util.deviceWidth()}]}>
          <TouchableWithoutFeedback
            style={style.clear}
            onPress={() => this.props.cancelGame()}
            >
            <View style={style.clearWrapper} >
              <Image style={style.clearImage} source={require('../assets/img/arrow.png')} />
            </View>
          </TouchableWithoutFeedback>

          {
            this.state.fontLoaded ? (
              <Text style={style.title}>Simple</Text>
            ) : null
          }

          <TouchableWithoutFeedback
            style={style.clear}
            onPress={() => this.clear()}
            >
            <View style={style.clearWrapper} >
              <Image style={style.clearImage} source={require('../assets/img/clear.png')} />
            </View>
          </TouchableWithoutFeedback>
        </View>

        <View style={[style.wrapper, {width: Util.deviceWidth(), height: Util.deviceWidth()}]}>
          {sudokuBlock}
          <View style={style.board}></View>
          <View style={style.boardShadow}></View>
        </View>

        <InputModal 
          active={this.state.inputModal}
          selected={this.state.selected.row || this.state.selected.row === 0 ? this.state.currentSudoku[this.state.selected.row][this.state.selected.col] : ''}
          hideInput={() => this.hideInputModal()} 
          update={(val) => this.update(val)} />

      </View>
    );
  }
}

/*
<TouchableWithoutFeedback
            style={style.clear}
            onPress={() => this.save()}
          ><View><Text>Save Current Progress</Text></View></TouchableWithoutFeedback>
          
          <RestoreList delete={(index) => this.delete(index)} stores={this.state.saved} restore={(sudoku) => this.restore(sudoku)} />
          */

