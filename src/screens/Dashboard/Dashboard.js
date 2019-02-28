import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity, Image,
} from 'react-native';
import styles from './style';
import DoIt from './DoIt';

const runIcon = require('../../../assets/images/Dashboard/run.png');
// const lineIcon = require('../../../assets/images/Dashboard/line.png');

class Dashboard extends Component {
  state = { modalVisible: false };

  doItHandler = () => {
    this.setState({
      modalVisible: true,
    });
  };

  hideModal = () => {
    this.setState({
      modalVisible: false,
    });
  };

  render() {
    const { modalVisible } = this.state;
    return (
      <View style={styles.container}>
        <DoIt modalVisible={modalVisible} hideModal={this.hideModal} />
        <View style={styles.sloganContainer}>
          <Text style={styles.sloganText}>내가 이번엔 살 진짜 꼭 뺀다.</Text>
        </View>
        <View style={styles.progressContainer}>
          <Image style={styles.runImage} source={runIcon} />
          <View style={{ flex: 0.1, flexDirection: 'row', margin: '5%' }}>
            <View style={{ flex: 1, backgroundColor: '#32CD32', margin: '0.5%' }} />
            <View style={{ flex: 1, backgroundColor: '#32CD32', margin: '0.5%' }} />
            <View style={{ flex: 1, backgroundColor: 'red', margin: '0.5%' }} />
            <View style={{ flex: 1, backgroundColor: '#32CD32', margin: '0.5%' }} />
          </View>
        </View>
        <View style={styles.doItContainer}>
          <TouchableOpacity onPress={this.doItHandler} style={styles.submitBtn}>
            <Text style={styles.submitText}>했다!</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Dashboard;
