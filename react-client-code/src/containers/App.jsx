import React, {Component} from 'react';
import logo from '../logo.svg';
import './App.css';
import {Grid} from 'semantic-ui-react';
import Cameras from '../components/cameras';
import CustomDate from '../components/custom-date';
import FileDate from '../components/file-date';
import BootImageCarousel from '../components/boot-image-carousel';
import * as moment from 'moment';
import SockJsClient from 'react-stomp';
import {Carousel, Col, Row, Thumbnail} from 'react-bootstrap';
import {Grid as BootGrid} from 'react-bootstrap';

const APP_URL = process.env.REACT_APP_SPRING_API;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      date: null,
      oldDateFormat: null,
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
      fileList: []
    }
    this.successResponse = 'Success! If images were found they have been downloaded and will be displayed below.';
    this.errorResponse = 'Sorry, there seems to have been an issue';
  }

  componentWillMount() {
    console.log('app url ', APP_URL);
    fetch(APP_URL + '/files/dates').then((response) => response.json()).then((responseJson) => {
      if (responseJson.list) {
        this.setState({fileList: responseJson.list});
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  onDateChange(event, date) {
    const newDate = moment(date).format('DD-MMM-YY');
    this.setState({date: newDate, oldDateFormat:date, response: ''});
  }

  onCheckBoxSelection(e) {
    const name = e.nativeEvent.target.innerHTML;

    this.setState({
      [name]: !this.state[name],
      response: ''
    });
  }

  onCalendarButtonClick() {
    if (this.state.date === null) {
      return;
    }

    this.setState({response: '', imgList: []});

    let list = [];
    for (let [key, value] of Object.entries(this.state)) {
      // do something with key|value
      if (value === true) {
        list.push(key);
      }
    }

    fetch(APP_URL + '/images/date/' + this.state.date + '?cameras=' + list).then((response) => response.json()).then((responseJson) => {
      if (responseJson.status === 'SUCCESS') {
        this.setState({response: this.successResponse});
      } else {
        this.setState({response: this.errorResponse});
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  onFileButtonClick() {
    this.setState({response: ''});

    let list = [];
    for (let [key, value] of Object.entries(this.state)) {
      // do something with key|value
      if (value === true) {
        list.push(key);
      }
    }

    fetch(APP_URL + '/images/file?cameras=' + list).then((response) => response.json()).then((responseJson) => {
      console.log('json response', responseJson);
      if (responseJson) {
        this.setState({response: this.successResponse});
      } else {
        this.setState({response: this.errorResponse});
      }

    }).catch((error) => {
      console.error(error);
    });
  }

  onMessageReceive = (msg, topic) => {
    this.setState(prevState => ({
      imgList: [
        ...prevState.imgList,
        msg
      ]
    }));
  }

  render() {
    console.log(this.state);
    const socketUri = APP_URL + '/spring-nasa-websocket';
    return (<div>
      <SockJsClient url={socketUri} topics={['/image-topic']} onMessage={this.onMessageReceive} ref={(client) => {
          this.clientRef = client
        }}/>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">React App for NASA Rover</h1>
        </header>
      </div>

      <Grid textAlign='center' container={true} centered="centered" columns={1}>
        <Grid.Column>
          <Cameras callback={(e) => this.onCheckBoxSelection(e)}/>
        </Grid.Column>

        <Grid.Row textAlign='center' columns={4}>
          <Grid.Column>
            <CustomDate
              dateCallback={(e, d) => this.onDateChange(e, d)}
              buttonCallback={() => this.onCalendarButtonClick()}
              dates={this.state.oldDateFormat}/>
          </Grid.Column>
          <Grid.Column>
            <FileDate dates={this.state.fileList} callback={() => this.onFileButtonClick()}/>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row textAlign='center' columns={2}>
          <Grid.Column>
            <h2>
              {this.state.response}
            </h2>
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <BootImageCarousel images={this.state.imgList}/>

    </div>);
  }
}

export default App;
