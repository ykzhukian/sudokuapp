import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Alert, Dimensions, Image, ScrollView } from 'react-native';

import Util from '../helpers/Util';

import Cell from './Cell';
import ControlButton from './ControlButton';
import InputModal from './InputModal';
import RestoreList from './RestoreList';
import Loading from './Loading';
import { Font, AdMobRewarded, AdMobBanner } from 'expo';
import Swiper from 'react-native-swiper';
import SavedProgress from './SavedProgress';
import MessageModal from './MessageModal';
import MessageNotification from './MessageNotification';

const style = require('./styles/Sudoku');
const progressStyle = require('./styles/SavedProgress');

const REWARDED_ID = `ca-app-pub-5515970670639994/6924581132`;
AdMobRewarded.setAdUnitID(REWARDED_ID);

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
     highlight: {},
     modal: false,
     saved: [],
     adLoading: false,
     messageEmptyCell: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.restoring) {
      // Reading from storage
      Util.fetchData('progress', (err, result) => {
        if (result.sudoku) {
          this.setState({
            sudoku: result.sudoku,
            prefilledArr: result.prefilledArr,
            currentSudoku: result.currentSudoku,
            errors: result.errors,
            initial: result.inital,
            saved: result.saved,
            flags: result.flags
          })
        }
      });
    } else {
      if (!nextProps.finished) {
        this.initialiseSudoku(nextProps);
      }
    }
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Dosis': require('../assets/fonts/Dosis-ExtraBold.ttf'),
      'Dosis-Light': require('../assets/fonts/Dosis-Bold.ttf'),
    });
    //Setting the state to true when font is loaded.
    this.setState({ fontLoaded: true });

    if (this.props.restoring) {
      // Reading from storage
      Util.fetchData('progress', (err, result) => {
        if (result.sudoku) {
          this.setState({
            sudoku: result.sudoku,
            prefilledArr: result.prefilledArr,
            currentSudoku: result.currentSudoku,
            errors: result.errors,
            initial: result.inital,
            saved: result.saved,
            flags: result.flags
          })
        }
      });
    } else {
      this.initialiseSudoku(this.props);
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
    }, () => {
      Util.storeData('progress', {
        sudoku: newSudoku,
        prefilledArr: prefilledArr,
        currentSudoku: currentSudoku,
        errors: [],
        initial: true,
        saved: []
      });
    });
  }

  _openRewarded = () => {
    // Show loading screen
    this.setState({
      adLoading: true
    })

    // Request AdMob
    AdMobRewarded.requestAd((data) => {
      AdMobRewarded.showAd(() => {
        this.setState({
          adLoading: false
        })
      })
    });
    AdMobRewarded.addEventListener('rewardedVideoDidRewardUser', (type, amount) => 
      {this.hint();}
    );
    AdMobRewarded.addEventListener('rewardedVideoDidFailToLoad', () => 
      console.log('failed')
    );
  };

  save() {
    let currentSudoku = this.state.currentSudoku;
    let saved = this.state.saved;

    if (saved.length > 7) {
      this.messageEmptyCell('Cannot save more than 8 progress.');
      return
    }

    this.refs.slider.scrollBy(1)

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
    setTimeout(() => {
      this.setState({
      saved: saved
      }, () => {
        Util.storeData('progress', {
          saved: saved
        });
      });
    }, 300)
  }

  delete(id) {
    var saved = this.state.saved.filter(function(el) { return el.id != id; }); 
    this.setState({
      saved: saved
    }, () => {
      Util.storeData('progress', {
        saved: saved
      });
    });
  }

  restore(sudoku) {

    this.refs.slider.scrollBy(-1);

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
      errors: errors,
      modal: false
    }, () => {
      Util.storeData('progress', {
        currentSudoku: currentSudoku,
        errors: errors
      });
    });
  }

  hint() {
    // Check selected
    if (this.state.selected.row || this.state.selected.row === 0) {

      // Update prefilled array
      let prefilledArr = this.state.prefilledArr;
      prefilledArr.push([this.state.selected.row, this.state.selected.col]);

      // Update current sudoku
      let currentSudoku = this.state.currentSudoku;
      currentSudoku[this.state.selected.row][this.state.selected.col] = this.state.sudoku[this.state.selected.row][this.state.selected.col];

      this.setState({
        prefilledArr: prefilledArr,
        currentSudoku: currentSudoku
      }, () => {
        Util.storeData('progress', {
          prefilledArr: prefilledArr,
          currentSudoku: currentSudoku
        });

        let errors = Util.verifyValue(currentSudoku);

        this.setState({
          currentSudoku: currentSudoku,
          errors: errors,
          initial: false
        }, () => {
          Util.storeData('progress', {
            currentSudoku: currentSudoku,
            errors: errors,
            initial: false
          });
        });

        if (errors === 'finished') {
          this.props.win();
        }
      });
    }
  }

  clearModal() {
    this.setState({
      confirmFunction: 'clear',
      messageModalText: 'Do you want to reset the current game?',
      modal: true
    });
  }

  cancelGame() {
    this.setState({
      confirmFunction: 'close',
      messageModalText: 'Do you want to leave the current game?',
      modal: true
    });
  }

  cancel() {
    this.setState({
      modal: false
    });
  }

  addFlag(position) {
    let flags = this.state.flags;
    flags.push([position.row, position.col]);
    this.setState({
      flags: flags
    }, () => {
      Util.storeData('progress', {
        flags: flags
      });
    });
  }

  removeFlag(position) {
    let flags = this.state.flags;
    Util.removeFromArr(flags,[position.row, position.col]);
    this.setState({
      flags: flags
    }, () => {
      Util.storeData('progress', {
        flags: flags
      });
    });
  }

  showInputModal(position) {

    let axis = Util.checkAxis(position);
    let highlight = {
      axis: axis,
      row: position.row,
      col: position.col
    }
    
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
    }, () => {
      Util.storeData('progress', {
        currentSudoku: currentSudoku,
        errors: errors,
        initial: false
      });
    });

    if (errors === 'finished') {
      this.props.win();
    }


  }

  confirmFunction() {
    if (this.state.confirmFunction === 'clear') {
      this.clear()
    } else if (this.state.confirmFunction === 'close') {
      this.props.cancelGame()
    }
  }

  messageEmptyCell(notification) {
    this.setState({
      messageEmptyCell: true,
      messageNotification: notification
    })
  }

  closeMessageEmptyCell() {
    this.setState({
      messageEmptyCell: false
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
            messageEmptyCell={(notification) => this.messageEmptyCell(notification)}
            /> 
        ))}
      </View>
    ))
    : (<Loading />);

    const modal = this.state.modal? (
      <View style={{width: '100%', height: '100%', position: 'absolute', zIndex: 999, justifyContent:'center',alignItems: 'center'}}>
        <View style={{width: '100%', height: '100%', position: 'absolute', zIndex: 99, backgroundColor: '#000', opacity: 0.6}}></View>
        <MessageModal 
          confirmFunction={() => this.confirmFunction()} 
          cancelFunction={() => this.cancel()}
          message={this.state.messageModalText}
          />
      </View>
    ) : null;

    const adLoading = this.state.adLoading?
    (<View style={{width: '100%', height: '100%', position: 'absolute', zIndex: 999, justifyContent:'center',alignItems: 'center'}}><Loading /></View>) : null;

    const messageEmptyCell = this.state.messageEmptyCell?
    (
      <View style={{width: '100%', height: '100%', position: 'absolute', zIndex: 999, justifyContent:'center',alignItems: 'center'}}>
        <View style={{width: '100%', height: '100%', position: 'absolute', zIndex: 99, backgroundColor: '#000', opacity: 0.6}}></View>
        <MessageNotification
          cancelFunction={() => this.closeMessageEmptyCell()}
          message={this.state.messageNotification}
          />
      </View>
    ) : null;

    return this.state.adLoading? (adLoading) : (
      <Swiper loop={false} showsPagination={true} ref="slider" 
        activeDot={
          (
            <View style={{
              backgroundColor:'#D1887A', 
              width: '40%', 
              height: 3,
              borderRadius: 3, 
              bottom: -15,
              marginRight: 5,
              marginLeft: 5
            }}
            />
          )
        }
        dot={
          (
            <View style={{
              backgroundColor:'#434596', 
              width: '40%', 
              height: 3,
              borderRadius: 3, 
              bottom: -15,
              marginRight: 5,
              marginLeft: 5
              }} 
            />
          )
        }
      >
        <View style={style.container} >
          <View style={[style.toolBar, {width: Util.deviceWidth()}]}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: 90}}>
              <ControlButton active={true} buttonFunction={() => this.cancelGame()} icon={require('../assets/img/close.png')} />
              <ControlButton active={true} buttonFunction={() => this.clearModal()} icon={require('../assets/img/clear.png')} />
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: 90}}>
              <ControlButton active={this.state.selected.row || this.state.selected.row === 0} buttonFunction={() => this._openRewarded()} icon={require('../assets/img/hint.png')} />
              <ControlButton active={true} buttonFunction={() => this.save()} icon={require('../assets/img/save.png')} />
            </View>
          </View>

          <InputModal 
            active={this.state.inputModal}
            selected={this.state.selected.row || this.state.selected.row === 0 ? this.state.currentSudoku[this.state.selected.row][this.state.selected.col] : ''}
            hideInput={() => this.hideInputModal()} 
            update={(val) => this.update(val)} />
            
          <View style={[style.wrapper, {width: Util.deviceWidth(), height: Util.deviceWidth()}]}>
            {sudokuBlock}
            <View style={style.board}></View>
            <View style={style.boardShadow}></View>
          </View>

          {modal}
          {adLoading}
          {messageEmptyCell}

        </View>

        <View>
          <SavedProgress prefilledArr={this.state.prefilledArr} delete={(id) => this.delete(id)} saved={this.state.saved} restore={(sudoku) => this.restore(sudoku)} />
        </View>

      </Swiper>
    );
  }
}

