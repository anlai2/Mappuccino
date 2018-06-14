import React from 'react';
import { MapView, Marker } from 'expo';
import { Button } from 'react-native-elements';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class MapScreen extends React.Component {
  // Component's state, cannot be accessed cross screens
  // Good for data that is minimal
  // this.state.region refers to the object
  // this.setState({ region: data }) to change the state
  state = {
    region: {
      longitude: -122.45213824240618,
      latitude: 37.738948026999054,
      longitudeDelta: 0.15,
      latitudeDelta: 0.15
    }
  };

  // ES6 function that is ran when we call it on a UI
  // We are calling it on the onPress property of Button in the render method
  onButtonPress = () => {
    fetch(
      `https://api.foursquare.com/v2/venues/search?&client_id=WEYIOWBHF4SHVIGRYQDB2Q5EUXEUCRPUFEDOAH0L3ZM31WFO&client_secret=YZK3BHOG5XBMF4C2VJLKUQCZ5GF51SKOI4WQMU3YBTYRWHWO&v=20180613&ll=${
        this.state.region.latitude
      },${this.state.region.longitude}&query=coffee`
    )
      .then(res => res.json())
      .then(data => console.log(data.response.venues[0].location));
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
        />
        <View style={styles.buttonContainer}>
          <Button
            large
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
