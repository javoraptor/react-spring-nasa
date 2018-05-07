import React from 'react';
import {Segment, Input, Button} from 'semantic-ui-react';

const customDate = ({dateCallback, buttonCallback, date})=>{
  return (<div>
    <h3>
      Select Earth Date
    </h3>
      <div>
        <Input name='on' type='date' onChange={(e) => dateCallback(e)}/>
      </div>

    {dateCheck(date)}

    <div>
      <Button color='facebook' onClick={() => buttonCallback()}>Submit
      </Button>
    </div>
  </div>);
}

const dateCheck = (date)=>{
  if(date === ''){
    return(
      <p>
        Please Enter A Valid Date
      </p>
    );
  }
}

export default customDate;
