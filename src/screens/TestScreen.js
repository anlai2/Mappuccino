import _ from 'lodash';
import React from 'react';
import { MapView, Marker } from 'expo';
import { Button } from 'react-native-elements';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const COFFEE_MARKER = require('../../assets/coffeeIcon.png');

export default class TestScreen extends React.Component {
  // Component's state, cannot be accessed cross screens
  // Good for data that is minimal
  // this.state.region refers to the object
  // this.setState({ region: data }) to change the state
  state = {
    region: {
      longitude: -122.45213824240618,
      latitude: 37.738948026999054,
      longitudeDelta: 0.015,
      latitudeDelta: 0.015
    },
    coffeeShops: {}
  };

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        region: {
          ...position.coords,
          longitudeDelta: 0.015,
          latitudeDelta: 0.015
        }
      });
    });
  }

  // ES6 function that is ran when we call it on a UI
  // We are calling it on the onPress property of Button in the render method
  onButtonPress = () => {
    fetch(
      `https://api.yelp.com/v3/businesses/search?&latitude=${
        this.state.region.latitude
      }&longitude=${
        this.state.region.longitude
      }&open_now=true&term=coffee&radius=2500&offset=25&sort_by=distance`,
      {
        method: 'GET',
        headers: {
          Authorization:
            'Bearer 5F0CNLMUSDk9BKJMgGuCLKcrmZbkv3oRIiV0FeAjfJWCSenFQNKUinFuLHkx1nnCUb9FIbqedxhOwqJoEnpm7QxS-RAPsbuKlpX2lnNy_uGLGpshjV19AX0_BuQhW3Yx'
        }
      }
    )
      .then(res => res.json())
      .then(data => {
        this.setState({ coffeeShops: data.businesses });
      });
  };

  renderShops = () => {
    return this.state.coffeeShops.map(shop => (
      <MapView.Marker
        key={shop.id}
        title={shop.name}
        description={shop.rating + '/5 ' + shop.price}
        coordinate={shop.coordinates}
        image={COFFEE_MARKER}
      />
    ));
  };

  // Main aspect of a react component, essentially handles what is to be displayed
  render() {
    return (
      // Most components/screens must have a root tag, here it is a View tag
      <View style={styles.container}>
        <MapView
          region={this.state.region}
          style={{ flex: 1 }}
          showsUserLocation={true}
          onRegionChangeComplete={coor => this.setState({ region: coor })}
          loadingEnabled={true}
          showsBuildings={false}
          showsPointsOfInterest={false}
          loadingIndicatorColor='brown'
        >
          {!_.isEmpty(this.state.coffeeShops) ? this.renderShops() : null}
        </MapView>
        <View style={styles.buttonContainer}>
          <Button
            title="Find Coffee"
            backgroundColor="brown"
            icon={{ name: 'search' }}
            onPress={this.onButtonPress}
          />
        </View>
      </View>
    );
  }
}

// We can create a styles object to keep track of multiple styles
// Can also be implemented in the JSX tag, but this way is cleaner
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0
  }
});
