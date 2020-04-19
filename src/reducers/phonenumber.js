import _ from 'lodash';

import {
  PHONE_NUMBERS_FETCHED
} from '../redux/types';

const initialState = {
  total: 0,
  phonenumbersList: {
    data: [],
    limit: 0,
    page: 0,
    total: -1,
  },
  active: {
    key: 0,
    pageTitle: '',
  }
};

export default function phonenumber(state = initialState, action) {
  switch (action.type) {
    case PHONE_NUMBERS_FETCHED: {
      return {
        ...state,
        phonenumbersList: action.phonenumbersList,
        total: action.phonenumbersList.total,
        message: {},
      };
    }
    default:
      return state;
  }
}
