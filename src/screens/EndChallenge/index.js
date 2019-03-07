import React from 'react';
import { Text } from 'react-native';
import axios from 'axios';
import Success from './Success';
import Failure from './Failure';

const EndChallenge = ({ reports }) => {
  reports = reports.map(el => {
    if (el.isConfirmed === 'pending') {
      return { ...el, isConfirmed: 'true' };
    }
    return { ...el };
  });
  axios.put('요청');
  console.log(reports);
  // if()
  return <Text>건</Text>;
};

export default EndChallenge;
