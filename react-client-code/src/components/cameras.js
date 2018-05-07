import React from 'react';
import {Segment, Checkbox} from 'semantic-ui-react';


const cameras = ({callback}) =>{
  return (<div>
    <h3>
      Select Cameras
    </h3>
    <Segment className="center-div">
      <Checkbox name='FHAZ'  value='fhaz' label='FHAZ' onChange={(e) => callback(e)}/>
      <Checkbox name='RHAZ'  value='rhaz' label='RHAZ' onChange={(e) => callback(e)}/>
      <Checkbox name='MAST'  value='mast' label='MAST' onChange={(e) => callback(e)}/>
      <Checkbox name='CHEMCAM'  value='chemcam' label='CHEMCAM' onChange={(e) => callback(e)}/>
      <Checkbox name='MAHLI'  value='chemcam' label='MAHLI' onChange={(e) => callback(e)}/>
      <Checkbox name='MARDI'  value='chemcam' label='MARDI' onChange={(e) => callback(e)}/>
      <Checkbox name='NAVCAM'  value='chemcam' label='NAVCAM' onChange={(e) => callback(e)}/>
      <Checkbox name='PANCAM'  value='chemcam' label='PANCAM' onChange={(e) => callback(e)}/>
      <Checkbox name='MINITES'  value='chemcam' label='MINITES' onChange={(e) => callback(e)}/>
    </Segment>
  </div>);
};

export default cameras;
