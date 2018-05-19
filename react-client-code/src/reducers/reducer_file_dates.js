import {FETCH_FILE_DATES} from '../actions';

export default function(state = null, action){

  switch(action.type){
    case: FETCH_FILE_DATES
    return action.payload;

    default:
    return state;
  }
}
