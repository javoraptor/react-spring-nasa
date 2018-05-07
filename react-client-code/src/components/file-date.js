import React from 'react';
import {Button} from 'semantic-ui-react';

const FileDate = ({callback, dates}) =>{
  return (<div>
    <h3>Download Dates From MarsDates.txt</h3>
    <h4>Dates:</h4>
    <h5>{dates}</h5>
    <div>
      <Button color='facebook' onClick={() => callback()}>Submit
      </Button>
    </div>
  </div>);
}

export default FileDate;
