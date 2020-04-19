import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import PhoneNumbersPage from './PhoneNumbers/PhoneNumbersPage';

class App extends Component {
  state = {
    alertVisible: true,
  };

  handleAlertDismiss() {
    this.setState({ alertVisible: false });
  }

  render() {
    return (
      <>
        <PhoneNumbersPage></PhoneNumbersPage>
      </>
    );
  }
}

const mapStateToProps = state => ({
  
});

export default connect(mapStateToProps, {})(App);
