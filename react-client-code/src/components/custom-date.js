import React from 'react';
import {Segment, Button} from 'semantic-ui-react';
import DatePicker from 'material-ui/DatePicker';

const customDate = ({dateCallback, buttonCallback, dates})=>{
  return (<div>
    <h3>
      Select Earth Date
    </h3>

    <DatePicker
        hintText="Date Input"
        onChange={(event, date) => dateCallback(event, date)}

      />

    {dateCheck(dates)}

    <div>
      <Button color='facebook' onClick={() => buttonCallback()}>Submit
      </Button>
    </div>
  </div>);
}

const dateCheck = (dates)=>{
  if(dates === ''){
    return(
      <p>
        Please Enter A Valid Date
      </p>
    );
  }
}

export default customDate;
