import axios                 from 'axios';
import {getToken, getApiUrl} from './access';

axios.defaults.baseURL = getApiUrl()

export const getWeather = (cityID) => {
  return axios({
    method: 'post',
    url: '/api/weather',
    data: {
      city: cityID
    },
    headers: {
      "Content-Type": "application/json",
      "Authorization": getToken()
    }
  })
}

export const auth = (login, pwd) => {
  console.log('L = ', login);
  return axios({
    method: 'post',
    url: 'http://127.0.0.1:3030/login',
    data: {
      login: login,
      pwd: pwd
    },
    headers: {
      "Content-Type": "application/json"
    }
  })
}

export const registration = (login, pwd, name, reppwd) => {
  return axios({
    method: 'post',
    url: 'http://127.0.0.1:3030/registration',
    data: {
      login: login,
      pwd: pwd,
      name: name,
      reppwd: reppwd
    },
    headers: {
      "Content-Type": "application/json"
    }
  })
}

export const getCity = () => {
  console.log('werwerewrwerewrwr');
  // return axios({
  //   method: 'get',
  //   url: '/api/city',
  //   headers: {
  //     "Content-Type": "application/json",
  //     "Authorization": getToken()
  //   }
  // })
}

