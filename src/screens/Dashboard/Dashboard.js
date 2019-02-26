import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity, Image,
} from 'react-native';
import styles from './style';
import DoIt from './DoIt';

const runIcon = require('../../../assets/images/Dashboard/run.png');
const lineIcon = require('../../../assets/images/Dashboard/line.png');

class Dashboard extends Component {
  static navigationOptions = {
    title: 'Home',
  };

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
          <Image style={styles.lineImage} source={lineIcon} />
        </View>
        <View style={styles.doItContainer}>
          <TouchableOpacity onPress={this.doItHandler}>
            <Text style={styles.doItText}>했다!</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Dashboard;
