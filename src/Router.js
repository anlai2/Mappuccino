import React from 'react';
import { Scene, Router, Actions, Stack, Modal } from 'react-native-router-flux';
import MapScreen from './screens/MapScreen';
import TestScreen from './screens/TestScreen';
import FilterModal from './screens/FilterModal';

// Component that we call in Home.js, when called we go through the stack and we see that
// MapScreen is our first valid screen to display
const RouterComponent = () => (
  <Router>
    <Modal>
      <Scene key="root" hideNavbar>
        <Scene key="map" hideNavBar component={TestScreen} initial />
      </Scene>
      <Scene key="filter" hideNavBar component={FilterModal} />
    </Modal>
  </Router>
);

export default RouterComponent;
