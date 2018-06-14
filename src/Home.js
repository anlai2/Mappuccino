import React, { Component } from 'react';
import Router from './Router';

// Acts as the root file for React Native Code
class Home extends Component {
  render() {
    // Since we don't have much user navigation we are using a basic routing library
    // The library is called react-native-router-flux
    // We return a router component that handles which screen to show as users use our app
    return <Router />;
  }
}

export default Home;
