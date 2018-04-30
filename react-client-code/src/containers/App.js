import React, {Component} from 'react';
import logo from '../logo.svg';
import './App.css';
import {Row, Input, Button, Carousel} from 'react-materialize'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      FHAZ: false,
      RHAZ: false,
      MAST: false,
      CHEMCAM: false,
      MAHLI: false,
      MARDI: false,
      NAVCAM: false,
      PANCAM: false,
      MINITES: false,
      response:'',
      imgList:[]
    }
  }

  onDateChange(e) {
    this.setState({date: e.target.value, response:false});
  }

  onRadioSelection(e) {
    let name = e.target.name;
    this.setState({
      [e.target.name]: !this.state[name],
      response:false
    });
  }

  onButtonClick() {
    //make rest call here
    let list = [];
    for (let [key, value] of Object.entries(this.state)) {
       // do something with key|value
       if(value === true){
         list.push(key);
       }
    }

    fetch('http://localhost:9090/images/date/'
    +this.state.date+ '/camera-list?cameras='+list)
      .then((response) => response.json()).then((responseJson) => {
        console.log('response:', responseJson);
        if(responseJson){
          this.setState({
            // imgList:responseJson
            response:'Success! Images have been saved.'
          });
        }else{
          this.setState({
            // imgList:responseJson
            response:'Sorry, there seems to be an issue'
          });
        }

      }).catch((error) => {
        console.error(error);
      });
  }

  fetchCarousel(){
    if(this.state.imgList.length > 0){
      return(
        <Carousel images={this.state.imgList}/>
      );
    }
  }
// <img src={logo} className="App-logo" alt="logo"/>
  render() {
    console.log(this.state);
    return (<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <h1 className="App-title">React App for NASA Rover</h1>
      </header>

      <div className="body-div">
        <h3 className="left-align">
          Select Camera
        </h3>
        <Row>
          <Input name='FHAZ' type='checkbox' value='fhaz' label='FHAZ' onChange={(e) => this.onRadioSelection(e)}/>
          <Input name='RHAZ' type='checkbox' value='rhaz' label='RHAZ' onChange={(e) => this.onRadioSelection(e)}/>
          <Input name='MAST' type='checkbox' value='mast' label='MAST' onChange={(e) => this.onRadioSelection(e)}/>
          <Input name='CHEMCAM' type='checkbox' value='chemcam' label='CHEMCAM' onChange={(e) => this.onRadioSelection(e)}/>
          <Input name='MAHLI' type='checkbox' value='chemcam' label='MAHLI' onChange={(e) => this.onRadioSelection(e)}/>
          <Input name='MARDI' type='checkbox' value='chemcam' label='MARDI' onChange={(e) => this.onRadioSelection(e)}/>
          <Input name='NAVCAM' type='checkbox' value='chemcam' label='NAVCAM' onChange={(e) => this.onRadioSelection(e)}/>
          <Input name='PANCAM' type='checkbox' value='chemcam' label='PANCAM' onChange={(e) => this.onRadioSelection(e)}/>
          <Input name='MINITES' type='checkbox' value='chemcam' label='MINITES' onChange={(e) => this.onRadioSelection(e)}/>
        </Row>

        <Row className="calendar">
          <h3 className="left-align">
            Select Earth Date
          </h3>
          <Input name='on' type='date' onChange={(e) => this.onDateChange(e)}/>
        </Row>
        <div className="left-align">
          <Button waves='light' onClick={() => this.onButtonClick()}>Submit
          <i className="material-icons right">send</i></Button>
        </div>
          {this.fetchCarousel()}
          <h2>
            {this.state.response}
          </h2>
      </div>

    </div>);
  }
}

export default App;
