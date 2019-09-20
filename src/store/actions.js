
import {getWeather} from '../utils/api';
import firebase, {db} from "../components/firebase";
import {setAuth} from '../utils/access';

export const setUser = (userID) => {
  return function action (dispatch) {
    db.collection("users").where('uid', '==', userID).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          const user =  doc.data();
          dispatch({type: 'setUser', currentUseri: user});
      });
    }).catch((error) => {
      console.log('ERROR! User not found@#!');
      console.log(error.message);
    });
  }
}

