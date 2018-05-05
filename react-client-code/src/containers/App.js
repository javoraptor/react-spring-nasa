import React, {Component} from 'react';
import logo from '../logo.svg';
import './App.css';
import {Row, Input, Button, Carousel, Table} from 'react-materialize';
import {RingLoader} from 'react-spinners';
import Calendar from '../components/calendar';
import CustomDate from '../components/custom-date';
import FileDate from '../components/file-date';
import ImageCarousel from '../components/image-carousel';

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

  onCalendarButtonClick() {
    if (this.state.date === '') {
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

  render() {
    console.log(this.state);
    
    return (<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <h1 className="App-title">React App for NASA Rover</h1>
      </header>

      <div className="body-div">
        <Calendar callback={(e) => this.onRadioSelection(e)}/>

        <div className="center-text">
          <CustomDate dateCallback={(e) => this.onDateChange(e)} buttonCallback={() => this.onCalendarButtonClick()} date={this.state.date}/>
          <h3 className="div-padding-top">-- OR --</h3>
          <FileDate callback={() => this.onFileButtonClick()}/>
        </div>

        <ImageCarousel imgList={this.state.imgList} loading={this.state.loading}/>

        <h2>
          {this.state.response}
        </h2>
      </div>

    </div>);
  }
}

export default App;
