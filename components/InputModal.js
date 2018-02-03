import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

import Util from '../helpers/Util';


export default class InputModal extends Component {

	constructor(props) {
    super(props)
  
    this.state = {
     
    }
  }

  onPress(val) {
    this.props.hideInput();
    this.props.update(val);
  }


  render() {

    // let error = Util.checkDuplicate(this.props.data.errors, [this.state.row, this.state.col]);

    return (
      <View style={[styles.container, {width: Util.deviceWidth()}]}>
        <View style={styles.wrapper}>
          <TouchableHighlight style={styles.cell} onPress={() => this.onPress(1)}>
            <Text style={styles.cellText}>1</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.cell} onPress={() => this.onPress(2)}>
            <Text style={styles.cellText}>2</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.cell} onPress={() => this.onPress(3)}>
            <Text style={styles.cellText}>3</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.cell} onPress={() => this.onPress(4)}>
            <Text style={styles.cellText}>4</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.cell} onPress={() => this.onPress(5)}>
            <Text style={styles.cellText}>5</Text>
          </TouchableHighlight>
        </View>

        <View style={styles.wrapper}>
          <TouchableHighlight style={styles.cell} onPress={() => this.onPress(6)}>
            <Text style={styles.cellText}>6</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.cell} onPress={() => this.onPress(7)}>
            <Text style={styles.cellText}>7</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.cell} onPress={() => this.onPress(8)}>
            <Text style={styles.cellText}>8</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.cell} onPress={() => this.onPress(9)}>
            <Text style={styles.cellText}>9</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.cell} onPress={() => this.onPress('')}>
            <Text style={styles.cellText}>-</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    // start: 0,
    width: '100%',
    zIndex: 999,
    alignItems: 'center',
    
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  cell: {
    // width: 30,
    // height: 30,
    flex: 1,
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: '#3d3d3d',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5
  },
  cellText: {
    fontSize: 14
  }
});



