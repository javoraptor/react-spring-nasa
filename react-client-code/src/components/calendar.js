import React from 'react';
import {Row, Input} from 'react-materialize';


const calendar = ({callback}) =>{
  return (<div >
    <h3>
      Select Cameras
    </h3>
    <Row className="center-div">
      <Input name='FHAZ' type='checkbox' value='fhaz' label='FHAZ' onChange={(e) => callback(e)}/>
      <Input name='RHAZ' type='checkbox' value='rhaz' label='RHAZ' onChange={(e) => callback(e)}/>
      <Input name='MAST' type='checkbox' value='mast' label='MAST' onChange={(e) => callback(e)}/>
      <Input name='CHEMCAM' type='checkbox' value='chemcam' label='CHEMCAM' onChange={(e) => callback(e)}/>
      <Input name='MAHLI' type='checkbox' value='chemcam' label='MAHLI' onChange={(e) => callback(e)}/>
      <Input name='MARDI' type='checkbox' value='chemcam' label='MARDI' onChange={(e) => callback(e)}/>
      <Input name='NAVCAM' type='checkbox' value='chemcam' label='NAVCAM' onChange={(e) => callback(e)}/>
      <Input name='PANCAM' type='checkbox' value='chemcam' label='PANCAM' onChange={(e) => callback(e)}/>
      <Input name='MINITES' type='checkbox' value='chemcam' label='MINITES' onChange={(e) => callback(e)}/>
    </Row>
  </div>);
};

export default calendar;
