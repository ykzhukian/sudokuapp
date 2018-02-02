import React, { Component } from 'react';
import Util from '../helpers/Util';
import Restore from './Restore';
import RestoreDetail from './RestoreDetail';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Alert, ScrollView } from 'react-native';

export default class RestoreList extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {

    const stores = this.props.stores;
    const restoreList = stores.length
    ?
    stores.map((store, index) => (
      <View key={index} >
        <View>
          <Text>{index + 1}</Text>
        </View>
        <Restore delete={() => this.props.delete(store.id)} restore={this.props.restore} sudokuIndex={index + ''} sudoku={store.sudoku} />
      </View>
    ))
    :
    (<View><Text>No Saved Progress.</Text></View>);

    return (
      <ScrollView 
        style={styles.restoreList}
        horizontal={true} >
        {restoreList}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  restoreList: {
    height: 100,
    flexGrow: 0
  }
})


