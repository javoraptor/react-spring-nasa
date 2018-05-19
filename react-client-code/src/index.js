import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//redux imports
import {Provider} from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';

const Application = () => (<Provider store={createStoreWithMiddleware(reducers)}>
  <MuiThemeProvider>
    <App/>
  </MuiThemeProvider>
</Provider>);

ReactDOM.render(<Application/>, document.getElementById('root'));
registerServiceWorker();
