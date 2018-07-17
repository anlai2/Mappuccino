import React from 'react';
import { Scene, Router, Actions, Stack, Modal } from 'react-native-router-flux';
import MapScreen from './screens/MapScreen';
import TestScreen from './screens/TestScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import FilterModal from './screens/FilterModal';
import InfoModal from './screens/InfoModal';

// Component that we call in Home.js, when called we go through the stack and we see that
// MapScreen is our first valid screen to display
const RouterComponent = () => (
  <Router>
    <Modal>
      <Scene key="welcome" hideNavBar component={WelcomeScreen} initial />
      <Scene key="root" hideNavbar>
        <Scene key="map" hideNavBar component={TestScreen} />
      </Scene>
      <Scene key="filter" hideNavBar component={FilterModal} />
      <Scene key="info" hideNavBar component={InfoModal} />
    </Modal>
  </Router>
);

export default RouterComponent;
