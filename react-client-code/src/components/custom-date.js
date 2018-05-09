import React from 'react';
import {Segment, Button} from 'semantic-ui-react';
import {Row, Input} from 'react-materialize';
const customDate = ({dateCallback, buttonCallback, date})=>{
  return (<div>
    <h3>
      Select Earth Date
    </h3>
    <Row>
       <div>
         <Input name='on' type='date' onChange={(e) => dateCallback(e)}/>
       </div>
     </Row>

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
