//use fetch instead of axios

export const FETCH_CUSTOM_DATE = 'FETCH_CUSTOM_DATE';
export const FETCH_FILE_DATES = 'FETCH_FILE_DATES';

const ROOT_URI = process.env.REACT_APP_SPRING_API;

export function fetchCustomDates(date, camerasList){
  fetch(APP_URI + '/images/date/' + date + '?cameras=' + camerasList)
  .then((response) => response.json() )
  .then((responseJson) => {
    return {
      type: FETCH_CUSTOM_DATE,
      payload: responseJson
    };
  })
  .catch((error) => {
    console.error(error);
  });
}

export function fetchFileDates(){
  fetch(APP_URI + '/images/file?cameras=' + list))
  .then((response) => response.json())
  .then((responseJson) =>{
    return {
      type: FETCH_FILE_DATES,
      payload: responseJson
    }
  })
  .catch((error)=>{
    console.log(error)
  });
}
