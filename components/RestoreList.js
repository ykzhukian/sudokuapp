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
      <View key={index} className="restore-wrapper">
        <View className="restore-time">
          <Text>{index + 1}</Text>
        </View>
        <Restore restore={this.props.restore} sudokuIndex={index + ''} sudoku={store.sudoku} />
      </View>
    ))
    :
    (<View className="restore-no"><Text>No Saved Progress.</Text></View>);

    return (
      <ScrollView 
        contentContainerStyle={styles.restoreList}
        horizontal={true} >
        {restoreList}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  restoreList: {

  }
})


