import { AsyncStorage } from 'react-native';
import axios from 'axios';
import { SecureStore } from 'expo';

const BASE_URL = 'http://13.209.19.196:3000';

/**
 * 매개변수로 받은 Property 들로 axios 요청을 보낸다.
 *
 * @param {string} method Example : `get` || `post` || `put` || `delete`
 * @param {string} endPoint Example : `/api/users/detail/2`
 * @param {object} setHeaders Example : `{ email: 'test@test.com', password: 'Qwer1234' }`, 없으면 `null`
 * @param {object} setBody Example : `{ challenge }`, 없으면 `null`
 */
const sendRequest = async (method, endPoint, setHeaders, setBody) => {
  const setHeader = token => {
    if (setHeaders)
      return Object.assign(setHeaders, { 'x-access-token': token });
    return { 'x-access-token': token };
  };
  const request = token => {
    const params = [
      `${BASE_URL}${endPoint}`,
      setBody,
      { headers: setHeader(token) },
    ];
    if (method === 'get' || method === 'delete') params.splice(1, 1);
    return axios[method](...params);
  };

  let result;
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    // const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJraW1zajk0ODRAZ21haWwuY29tIiwibmlja25hbWUiOiLquYDshKDsnqwiLCJnZW5kZXIiOiJtYW4iLCJiaXJ0aCI6MTk5NCwibG9jYXRpb24iOiIiLCJjaGFuZ2UiOjAsImNyZWF0ZWRBdCI6IjIwMTktMDMtMDFUMDQ6NDI6MzYuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMTktMDMtMDFUMDQ6NDI6MzYuMDAwWiIsImlhdCI6MTU1MTY4MzM5NCwiZXhwIjoxNTUxNjgzNDA0LCJpc3MiOiJmbGludCIsInN1YiI6IngtYWNjZXNzLXRva2VuIn0.7YfNHuRVIAa5cB-OYUYJq-1GxTnrXrOZiOHsnsGG0I0';
    result = await request(accessToken);
  } catch (error) {
    console.log('Access Token Error');
    console.log(error);
  }

  if (result) return result;
  try {
    const refreshToken = await SecureStore.getItemAsync('refreshToken');
    // const refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJraW1zajk0ODRAZ21haWwuY29tIiwibmlja25hbWUiOiLquYDshKDsnqwiLCJnZW5kZXIiOiJtYW4iLCJiaXJ0aCI6MTk5NCwibG9jYXRpb24iOiIiLCJjaGFuZ2UiOjAsImNyZWF0ZWRBdCI6IjIwMTktMDMtMDFUMDQ6NDI6MzYuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMTktMDMtMDFUMDQ6NDI6MzYuMDAwWiIsImlhdCI6MTU1MTY4MzM5NCwiZXhwIjoxNTUxNjgzNDA0LCJpc3MiOiJmbGludCIsInN1YiI6IngtcmVmcmVzaC10b2tlbiJ9.tHXrqLNBoPrgSq6e7bXyInJDKL4ZMy2mTsNwmoeCb0U';
    const { headers } = await axios.get(`${BASE_URL}/oauth/accessToken`, {
      headers: { 'x-refresh-token': refreshToken },
    });
    const accessToken = headers['x-access-token'];
    result = await request(accessToken);
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.setItem('accessToken', accessToken);
  } catch (error) {
    console.log('Refresh Token Error');
    console.log(error);
  }

  if (result) return result;
  try {
    const keyChain = await SecureStore.getItemAsync('keyChain');
    const { email, password } = JSON.parse(keyChain);
    const { headers, data } = await axios.get(`${BASE_URL}/oauth/signIn`, {
      headers: { email, password },
    });
    const accessToken = headers['x-access-token'];
    const refreshToken = headers['x-refresh-token'];
    result = await request(accessToken);
    await AsyncStorage.setItem('userInfo', JSON.stringify(data.user));
    await AsyncStorage.setItem('accessToken', accessToken);
    await SecureStore.setItemAsync('refreshToken', refreshToken);
    await SecureStore.setItemAsync(
      'keyChain',
      JSON.stringify({ email, password }),
    );
  } catch (error) {
    console.log('Auto Sign In Error');
    console.log(error);
  }

  return result;
};

export default sendRequest;
