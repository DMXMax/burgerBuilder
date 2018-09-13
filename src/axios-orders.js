import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-burger-test-4ac3e.firebaseio.com/',
});


export default instance;
