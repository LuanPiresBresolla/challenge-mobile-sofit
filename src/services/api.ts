import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://sofit-mobile-challenge.herokuapp.com',
});
