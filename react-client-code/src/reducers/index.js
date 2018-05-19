import { combineReducers } from 'redux';
import CustomeDate from './reducer_custom_date';
import FileDates from './reducer_file_dates';

const rootReducer = combineReducers({
  customDate: CustomeDate,
  fileDates: FileDates
});

export default rootReducer;
