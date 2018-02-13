import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Animated, Easing } from 'react-native';
import { Font } from 'expo';

const style = require('./styles/SavedProgress');

import Util from '../helpers/Util';
import SavedProgressCard from './SavedProgressCard';
import SavedProgressPreview from './SavedProgressPreview';
import MessageModal from './MessageModal';


export default class SavedProgress extends Component {

	constructor(props) {
    super(props)
    this.state = {
      modal: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Dosis': require('../assets/fonts/Dosis-ExtraBold.ttf'),
      'Dosis-Light': require('../assets/fonts/Dosis-Bold.ttf'),
    });
    //Setting the state to true when font is loaded.
    this.setState({ fontLoaded: true });
  }

  openPreview(sudoku, id) {
    this.setState({
      preview: true,
      previewSudoku: sudoku,
      previewID: id
    })
  }

  closePreview() {
    this.setState({
      preview: false,
      previewSudoku: [],
      previewID: null
    })
  }

  showDeleteModal(id) {
    this.setState({
      modal: true,
      deleteId: id
    });
  }

  confirmFunction() {
    this.props.delete(this.state.deleteId)
    this.setState({
      modal: false
    });
  }

  cancel() {
    this.setState({
      modal: false
    });
  }

  render() {

    const progressCards = this.props.saved.map((progress, index) => (
      <SavedProgressCard showDeleteModal={(id) => this.showDeleteModal(id)} openPreview={(sudoku,id) => this.openPreview(sudoku,id)} key={index} sudoku={progress.sudoku} id={progress.id} />
    ));

    const progressPreview = this.state.preview?
    (<View style={{height: '100%', width: Util.deviceWidth(), backgroundColor: '#282956', position: 'absolute', top: 0, right: 20}}><SavedProgressPreview closePreview={() => this.closePreview()}  sudoku={this.state.previewSudoku} id={this.state.previewID} /></View>)
    : null;

    const modal = this.state.modal? (
      <View style={{width: '100%', height: '100%', position: 'absolute', zIndex: 999, justifyContent:'center',alignItems: 'center'}}>
        <View style={{width: '100%', height: '100%', position: 'absolute', zIndex: 99, backgroundColor: '#000', opacity: 0.6}}></View>
        <MessageModal 
          confirmFunction={() => this.confirmFunction()} 
          cancelFunction={() => this.cancel()}
          message={'Delete?'}
          />
      </View>
    ) : null;

    const progress = !this.state.preview ?
    (
      <View style={style.wrapper}>
      { this.state.fontLoaded ? (
        <Text style={style.savedProgressTitle} >Time Bank</Text>
      ) : null }
      {progressCards}
      {modal}
      </View>
    )
    :(<View style={style.wrapper}>{progressPreview}</View>);

    return (
      <View style={style.wrapper} >
        {progress}
      </View>
    );
  }
}






