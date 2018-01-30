import React, { Component } from 'react';
// import Util from '../helpers/Util';

import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

export default class Cell extends Component {

	constructor(props) {
    super(props)
  
    this.state = {
      // correctValue: this.props.data.value,
      // row: this.props.data.row,
      // col: this.props.data.col,
      // flag: false
    }
  }

  onClick(e) {
    console.log('input');
  }

  onChange(event) {
    const numbers = new RegExp("[0-9]");
    let value = parseInt(event.target.value, 10);
    if (this.props.data.activated && (numbers.test(value) || !value)) {
      if (!value) {
        value = '';
      }
      this.setState({value: value, flag: false});
      this.props.removeFlag({row: this.state.row, col: this.state.col});
      this.props.updateSudoku(value, {row: this.state.row, col: this.state.col});
    }
  }

  onDoubleClick(event) {
    if (this.props.data.value !== '') {
      if (!this.state.flag) {
        this.props.addFlag({row: this.state.row, col: this.state.col});
      } else {
        this.props.removeFlag({row: this.state.row, col: this.state.col});
      }
      this.setState({
        flag: !this.state.flag
      })
    } else if (this.props.data.value === '') {
      Util.message("It's empty.");
    }
  }

  render() {

    // let error = Util.checkDuplicate(this.props.data.errors, [this.state.row, this.state.col]);

    return (
      <TouchableHighlight style={styles.cell} onPress={(e) => this.onClick(e)}>
        <Text style={styles.cellText} >1</Text>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  cell: {
    width: 50,
    height: 50,
    borderWidth: 0.5,
    borderColor: '#3d3d3d',
    alignItems: 'center',
    justifyContent: 'center'
  },
  cellText: {
    fontSize: 24
  }
});



