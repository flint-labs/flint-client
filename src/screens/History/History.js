import React, { Component } from 'react';
import {
  SafeAreaView, View, FlatList, Text, AsyncStorage, ActivityIndicator,
} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import sendRequest from '../../modules/sendRequest';
import HistoryEntry from './HistoryEntry';
import styles from './style';

class History extends Component {
  state = {
    completeList: [],
    isLoading: false,
  };

  handleWillFocus = async () => {
    const { id } = JSON.parse(await AsyncStorage.getItem('userInfo'));

    try {
      const { data } = await sendRequest('get', `/api/history/completeList/${id}`);
      this.setState({ isLoading: true, completeList: data || [] });
    } catch (err) {
      console.log(err.message);
    }
  };

  render = () => {
    const { completeList, isLoading } = this.state;
    const { switchScreen } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <NavigationEvents onWillFocus={this.handleWillFocus} />
        {isLoading ? (
          <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
              <FlatList
                data={completeList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={itemData => (
                  <HistoryEntry data={itemData.item} handlePress={switchScreen} />
                )}
              />
            </View>
          </SafeAreaView>
        ) : (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator />
          </View>
        )}
      </View>
    );
  };
}

export default History;
