import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Alert } from 'react-native';

import Util from '../helpers/Util';

import Cell from './Cell';
import InputModal from './InputModal';
import RestoreList from './RestoreList';

export default class Sudoku extends Component {

	constructor(props) {
    super(props)
  
    this.state = {
     inputModal: false,
     selected: [],
     sudoku: '',
     currentSudoku: '',
     prefilledArr: '',
     errors: [],
     flags: []
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
    this.setState({
      inputModal: true,
      selected: position
    })
  }

  hideInputModal() {
    this.setState({
      inputModal: false,
      selected: {}
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

    const inputModal = this.state.inputModal
    ?
    (<InputModal 
      hideInput={() => this.hideInputModal()} 
      update={(val) => this.update(val)} />)
    :(<View></View>);


    const sudokuBlock = this.state.currentSudoku.length
    ?
    this.state.currentSudoku.map((row, rowIndex) => (
      <View key={rowIndex} style={styles.row}>
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
              flag: Util.checkDuplicate(this.state.flags, [rowIndex, index])
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
      <View style={styles.container} >
        <View style={styles.wrapper}>{sudokuBlock}</View>
        <TouchableWithoutFeedback
          style={styles.clear}
          onPress={() => this.clear()}
        ><View><Text>Clear (except flagged cell)</Text></View></TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          style={styles.clear}
          onPress={() => this.save()}
        ><View><Text>Save Current Progress</Text></View></TouchableWithoutFeedback>
        {inputModal}
        <View>
          <TouchableWithoutFeedback onPress={(e) => this.props.changeDifficulty(e, 45)} ><View><Text style={this.props.prefilled === 45 ? styles.active : ''}>Beginner</Text></View></TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={(e) => this.props.changeDifficulty(e, 35)} ><View><Text style={this.props.prefilled === 35 ? styles.active : ''}>Normal</Text></View></TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={(e) => this.props.changeDifficulty(e, 25)} ><View><Text style={this.props.prefilled === 25 ? styles.active : ''}>Hard</Text></View></TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={(e) => this.props.changeDifficulty(e, 17)} ><View><Text style={this.props.prefilled === 17 ? styles.active : ''}>Challenging</Text></View></TouchableWithoutFeedback>
        </View>
        <RestoreList delete={(index) => this.delete(index)} stores={this.state.saved} restore={(sudoku) => this.restore(sudoku)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: 10,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  wrapper: {
    height: 315,
    width: '100%',
    alignItems: 'center',
    marginBottom: 50
  },
  row: {
    width: 315,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  clear: {
    marginTop: 50
  },
  active: {
    textDecorationLine: 'underline'
  }
});



