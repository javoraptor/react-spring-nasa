import React from 'react';
import {Button, List, Icon} from 'semantic-ui-react';

const FileDate = ({callback, dates}) => {
  return (<div>
    <h3>Download Dates From MarsDates.txt</h3>
    <h4>Dates:</h4>
      <List animated="animated" verticalAlign='middle' relaxed={true}>{returnList(dates)}</List>
    <div>
      <Button color='facebook' onClick={() => callback()}>Submit
      </Button>
    </div>
  </div>);
}

const returnList = dates => {

  if(dates !== undefined){
    return dates.map((entry, index) => {
      return (<List.Item key={index}>
        <Icon name='checked calendar'/>
        <List.Content>
          <List.Header>{entry}</List.Header>
        </List.Content>
      </List.Item>);
    });
  }
};

export default FileDate;
