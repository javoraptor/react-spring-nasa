import React from 'react';
import {Row, Input, Button} from 'react-materialize';


const customDate = ({dateCallback, buttonCallback, date})=>{
  return (<div className="div-padding-top">
    <h3>
      Select Earth Date
    </h3>
    <Row className="calendar">
      <div className="center-div">
        <Input name='on' type='date' onChange={(e) => dateCallback(e)}/>
      </div>
    </Row>

    {dateCheck(date)}

    <div>
      <Button waves='light' onClick={() => buttonCallback()}>Submit
        <i className="material-icons right">send</i>
      </Button>
    </div>
  </div>);
}

const dateCheck = (date)=>{
  if(date === ''){
    return(
      <div>
        Please Enter A Valid Date
      </div>
    );
  }
}

export default customDate;
