import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';


import Util from '../helpers/Util';


export default class InputModal extends Component {

	constructor(props) {
    super(props)
  
    this.state = {
     
    }
  }

  render() {

    // let error = Util.checkDuplicate(this.props.data.errors, [this.state.row, this.state.col]);

    return (
      <TouchableWithoutFeedback 
        style={styles.cell} 
        onPress={() => this.props.onPress(this.props.value)}>
        <View>
          <Text>{this.props.value}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  
});



