import React from 'react';
import { Button } from 'semantic-ui-react';
import DatePicker from 'material-ui/DatePicker';

const customDate = ({dateCallback, buttonCallback, dates})=>{
  return (<div>
    <h3>
      Select Earth Date
    </h3>

    <DatePicker
        hintText="Date Input"
        onChange={(event, date) => dateCallback(event, date)}
        value={dates}
      />

    <div>
      <Button color='facebook' onClick={() => buttonCallback()}>Submit
      </Button>
    </div>
  </div>);
}

export default customDate;
