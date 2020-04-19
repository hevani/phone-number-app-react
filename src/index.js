import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import './index.css';
import store from './store';
import PhoneNumbersPage from './components/PhoneNumbers/PhoneNumbersPage';
import App from './components/App';
import {
  Router,
  Route,
  IndexRoute,
  browserHistory
} from 'react-router';
console.log('from index.js');

ReactDOM.render(
  <Provider store={store}>
    <Router
      onUpdate={() => {
        document.getElementById('root').focus();
        window.scrollTo({
          top: 0,
          left: 0,
        });
      }}
      history={browserHistory}
    >
      <Route path="/" name="Home" component={App}>
        <Route name="PhoneNumber" path="phoneNumber">
          <IndexRoute
            component={PhoneNumbersPage}
          />
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);