import { combineReducers } from 'redux';
import {
  LOAD_VENUES,
  VENUES_LOADED,
  VENUES_LOAD_FAILED,
} from '../actions';

const initialState = {
  loading: false,
  venues: [],
};

const fourSquare = (state = initialState, action) => {
  const {type, loading, venues} = action;
  switch (type) {
    case LOAD_VENUES:
      return {
        ...state,
        loading,
      };
    case VENUES_LOADED:
      return {
        ...state,
        loading,
        venues,
      };
    case VENUES_LOAD_FAILED:
      return {
        ...state,
        loading,
      };
    default:
      return state;
  }
};


export default combineReducers({
  fourSquare,
})