import {FETCH_CUSTOM_DATE} from '../actions';

export default function(state = null, action){

  switch(action.type){
    case: FETCH_CUSTOM_DATE
    return action.payload;

    default:
    return state;
  }
}
