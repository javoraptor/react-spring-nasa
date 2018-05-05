import React from 'react';
import {Button} from 'react-materialize';

const FileDate = ({callback}) =>{
  return (<div className="div-padding-top">
    <h3>Download Dates From MarsDates.txt</h3>
    <div>
      <Button waves='light' onClick={() => callback()}>Submit
        <i className="material-icons right">send</i>
      </Button>
    </div>
  </div>);
}

export default FileDate;
