import axios from 'axios';

import {
  PHONE_NUMBERS_FETCHED
} from '../redux/types';



export const phoneNumbersFetched = phonenumbers => ({
  type: PHONE_NUMBERS_FETCHED,
  phonenumbersList: phonenumbers,
  phonenumbers: phonenumbers.data,
});
export const fetchPhonenumberList = filterInut => dispatch =>
  axios
    .post(`http://localhost:8080/v1.0/phoneNumber`, filterInut)
    .then(response => dispatch(phoneNumbersFetched(response.data)));
