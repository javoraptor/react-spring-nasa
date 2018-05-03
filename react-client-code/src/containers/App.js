import React, {Component} from 'react';
import logo from '../logo.svg';
import './App.css';
import {Row, Input, Button, Carousel, Table} from 'react-materialize';
import {RingLoader} from 'react-spinners';

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
      response: '',
      imgList: [],
      loading: false
    }
  }

  onDateChange(e) {
    this.setState({date: e.target.value, response: ''});
  }

  onRadioSelection(e) {
    let name = e.target.name;
    this.setState({
      [e.target.name]: !this.state[name],
      response: ''
    });
  }

  onButtonClick() {
    if(this.state.date === ''){
      return;
    }
    this.setState({response: '', loading: true});

    let list = [];
    for (let [key, value] of Object.entries(this.state)) {
      // do something with key|value
      if (value === true) {
        list.push(key);
      }
    }

    fetch('http://localhost:9090/images/date/' + this.state.date + '?cameras=' + list).then((response) => response.json()).then((responseJson) => {
      console.log('JSONresponse: ', responseJson);
      if (responseJson) {
        this.setState({imgList: responseJson, response: 'Success! Images have been saved', loading: false});
      } else {
        this.setState({imgList: responseJson, response: 'Sorry, there seems to be an issue', loading: false});
      }

    }).catch((error) => {
      console.error(error);
    });
  }

  onFileButtonClick() {
    this.setState({response: '', loading: true});

    let list = [];
    for (let [key, value] of Object.entries(this.state)) {
      // do something with key|value
      if (value === true) {
        list.push(key);
      }
    }

    //make rest call here
    fetch('http://localhost:9090/images/file' + '?cameras=' + list).then((response) => response.json()).then((responseJson) => {
      console.log('response:', responseJson);
      if (responseJson) {
        this.setState({imgList: responseJson, response: 'Success! Images have been saved', loading: false});
      } else {
        this.setState({imgList: responseJson, response: 'Sorry, there seems to be an issue', loading: false});
      }

    }).catch((error) => {
      console.error(error);
    });
  }

  fetchCarousel() {
    console.log('logging carousel', this.state.imgList);

    if (this.state.loading) {
      return (<div className="center-div div-padding-top">
        <div className='sweet-loading'>
          <RingLoader color={'#123abc'} loading={this.state.loading}/>
        </div>
      </div>);
    }

    if (this.state.imgList.length > 0) {
      return (<Carousel images={this.state.imgList}/>);
    }
  }

  dateCheck(){
    if(this.state.date === ''){
      return(
        <div>
          Please Enter A Valid Date
        </div>
      );
    }

  }
  customDate() {
    return (<div className="div-padding-top">
      <h3>
        Select Earth Date
      </h3>
      <Row className="calendar">
        <div className="center-div">
          <Input name='on' type='date' onChange={(e) => this.onDateChange(e)}/>
        </div>
      </Row>

      {this.dateCheck()}

      <div>
        <Button waves='light' onClick={() => this.onButtonClick()}>Submit
          <i className="material-icons right">send</i>
        </Button>
      </div>
    </div>);
  }

  fileDate() {
    return (<div className="div-padding-top">
      <h3>Download Dates From MarsDates.txt</h3>
      <div>
        <Button waves='light' onClick={() => this.onFileButtonClick()}>Submit
          <i className="material-icons right">send</i>
        </Button>
      </div>
    </div>);
  }

  renderTable() {
    return (<div className="center-text">
    {this.customDate()}
    <h3 className="div-padding-top">-- OR --</h3>
    {this.fileDate()}

    </div>);
  }

  renderCameraList() {
    return (<div className="center-text">
      <h3>
        Select Cameras
      </h3>
      <Row className="center-div">
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
    </div>);
  }

  render() {
    console.log(this.state);
    return (<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <h1 className="App-title">React App for NASA Rover</h1>
      </header>

      <div className="body-div">
        {this.renderCameraList()}

        {this.renderTable()}

        {this.fetchCarousel()}
        <h2>
          {this.state.response}
        </h2>
      </div>

    </div>);
  }
}

export default App;
