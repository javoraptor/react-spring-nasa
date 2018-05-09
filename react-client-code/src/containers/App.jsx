import React, {Component} from 'react';
import logo from '../logo.svg';
import './App.css';
import {Grid} from 'semantic-ui-react';
import {RingLoader} from 'react-spinners';
import Cameras from '../components/cameras';
import CustomDate from '../components/custom-date';
import FileDate from '../components/file-date';
import ImageCarousel from '../components/image-carousel';
import * as moment from 'moment';

const APP_URL = process.env.REACT_APP_SPRING_API;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      date: null,
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
      loading: false,
      fileList: []
    }
    this.succesResponse = 'Success! If images were found they have been downloaded and will be displayed below.';
    this.errorResponse = 'Sorry, there seems to have been an issue';
  }

  componentWillMount() {

    fetch(APP_URL + '/files/dates').then((response) => response.json()).then((responseJson) => {
      if (responseJson) {
        this.setState({fileList: responseJson});
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  onDateChange(event, date) {
    const newDate =  moment(date).format('DD-MMM-YY');
    this.setState({date:newDate , response: ''});
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

    this.setState({response: '', loading: true, imgList:[]});

    let list = [];
    for (let [key, value] of Object.entries(this.state)) {
      // do something with key|value
      if (value === true) {
        list.push(key);
      }
    }

    fetch(APP_URL + '/images/date/' + this.state.date + '?cameras=' + list)
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson) {
        this.setState({imgList: responseJson, response: this.succesResponse, loading: false});
      } else {
        this.setState({imgList: responseJson, response: this.errorResponse, loading: false});
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
      //filter out loading
      if (value === true) {
        list.push(key);
      }
    }

    //make rest call here
    fetch(APP_URL + '/images/file' + '?cameras=' + list).then((response) => response.json()).then((responseJson) => {
      if (responseJson) {
        this.setState({imgList: responseJson, response: this.succesResponse, loading: false});
      } else {
        this.setState({imgList: responseJson, response: this.errorResponse, loading: false});
      }

    }).catch((error) => {
      console.error(error);
    });
  }

  render() {
    console.log(this.state);

    return (<div>
      what the actual fuck
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">React App for NASA Rover</h1>
        </header>
      </div>

      <Grid textAlign='center' centered container columns={1}>
        <Grid.Column>
          <Cameras callback={(e) => this.onCheckBoxSelection(e)}/>
        </Grid.Column>

        <Grid.Row textAlign='center' container columns={4}>
          <Grid.Column>
            <CustomDate dateCallback={(e,d) => this.onDateChange(e,d)} buttonCallback={() => this.onCalendarButtonClick()} dates={this.state.date}/>
          </Grid.Column>
          <Grid.Column>
            <FileDate dates={this.state.fileList} callback={() => this.onFileButtonClick()}/>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row textAlign='center' container columns={2}>
          <Grid.Column>
            <h2>
              {this.state.response}
            </h2>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row textAlign='center' container columns={4}>
          <Grid.Column>
            <ImageCarousel imgList={this.state.imgList} loading={this.state.loading}/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>);
  }
}

export default App;
