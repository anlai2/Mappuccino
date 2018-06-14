import React from 'react';
import { Scene, Router, Actions, Stack } from 'react-native-router-flux';
import MapScreen from './screens/MapScreen';
import TestScreen from './screens/TestScreen';

// Component that we call in Home.js, when called we go through the stack and we see that
// MapScreen is our first valid screen to display
const RouterComponent = () => (
  <Router>
    <Scene key="root" hideNavbar>
      <Scene key="map" hideNavBar component={TestScreen} />
    </Scene>
  </Router>
);

export default RouterComponent;
