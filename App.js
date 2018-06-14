import { AppRegistry } from 'react-native';
import Home from './src/Home';

// React Native Code's root file is called App.js
// Here we are pointing it over to the Home component in ./src/Home
AppRegistry.registerComponent('auth', () => Home);

export default Home;
