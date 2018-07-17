import _ from 'lodash';
import React from 'react';
import { MapView, Marker, Linking } from 'expo';
import {
  Button,
  Card,
  Divider,
  Text as ElementText
} from 'react-native-elements';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Animated,
  Image,
  Dimensions
} from 'react-native';

const COFFEE_MARKER = require('../../assets/coffeeIcon.png');

const { width, height } = Dimensions.get('window');

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = width - 100;

export default class MapScreen extends React.Component {
  // Component's state, cannot be accessed cross screens
  // Good for data that is minimal
  // this.state.region refers to the object
  // this.setState({ region: data }) to change the state
  state = {
    region: {
      longitude: -122.45213824240618,
      latitude: 37.738948026999054,
      longitudeDelta: 0.0015,
      latitudeDelta: 0.0015
    },
    coffeeShops: {}
  };

  componentDidMount() {
    this.animation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= this.state.coffeeShops.length) {
        index = this.state.coffeeShops.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(this.regionTimeout);
      this.regionTimeout = setTimeout(() => {
        if (this.index !== index) {
          this.index = index;
          const { coordinates } = this.state.coffeeShops[index];
          this.map.animateToRegion(
            {
              ...coordinates,
              latitudeDelta: 0.0015,
              longitudeDelta: 0.015
            },
            350
          );
        }
      }, 10);
    });
  }

  componentWillMount() {
    this.index = 0;
    this.animation = new Animated.Value(0);

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
      })
      .then(() => this.renderCards());
  };

  renderCards = () => {
    const interpolations = this.state.coffeeShops.map((marker, index) => {
      const inputRange = [
        (index - 1) * CARD_WIDTH,
        index * CARD_WIDTH,
        (index + 1) * CARD_WIDTH
      ];
      const scale = this.animation.interpolate({
        inputRange,
        outputRange: [1, 2.5, 1],
        extrapolate: 'clamp'
      });
      const opacity = this.animation.interpolate({
        inputRange,
        outputRange: [0.35, 1, 0.35],
        extrapolate: 'clamp'
      });
      return { scale, opacity };
    });
  };

  renderShops = () => {
    const interpolations = this.state.coffeeShops.map((marker, index) => {
      const inputRange = [
        (index - 1) * CARD_WIDTH,
        index * CARD_WIDTH,
        (index + 1) * CARD_WIDTH
      ];
      const scale = this.animation.interpolate({
        inputRange,
        outputRange: [1, 2.5, 1],
        extrapolate: 'clamp'
      });
      const opacity = this.animation.interpolate({
        inputRange,
        outputRange: [0.35, 1, 0.35],
        extrapolate: 'clamp'
      });
      return { scale, opacity };
    });

    return this.state.coffeeShops.map((shop, index) => {
      const scaleStyle = {
        transform: [
          {
            scale: interpolations[index].scale
          }
        ]
      };
      const opacityStyle = {
        opacity: interpolations[index].opacity
      };
      return (
        <MapView.Marker key={index} coordinate={shop.coordinates}>
          <Animated.View style={[styles.markerWrap, opacityStyle]}>
            <Animated.View style={[styles.ring, scaleStyle]} />
            <View style={styles.marker} />
          </Animated.View>
        </MapView.Marker>
      );
    });
  };

  // Main aspect of a react component, essentially handles what is to be displayed
  render() {
    return (
      // Most components/screens must have a root tag, here it is a View tag
      <View style={styles.container}>
        <MapView
          ref={map => (this.map = map)}
          region={this.state.region}
          style={{ flex: 1 }}
          showsUserLocation={true}
          onRegionChangeComplete={coor => this.setState({ region: coor })}
          loadingEnabled={true}
          showsBuildings={false}
          showsPointsOfInterest={false}
          loadingIndicatorColor="brown"
        >
          {!_.isEmpty(this.state.coffeeShops) ? this.renderShops() : null}
        </MapView>
        <Animated.ScrollView
          horizontal
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          snapToAlignment={'center'}
          overScrollMode={'never'}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: this.animation
                  }
                }
              }
            ],
            { useNativeDriver: true }
          )}
          style={styles.scrollView}
          contentContainerStyle={styles.endPadding}
        >
          {!_.isEmpty(this.state.coffeeShops)
            ? this.state.coffeeShops.map((shop, index) => (
                <View style={styles.card} key={index}>
                  <TouchableOpacity
                    useForeground
                    onPress={() => Linking.openURL(shop.url)}
                  >
                    <Card
                      featuredTitle={shop.name}
                      featuredTitleStyle={styles.featuredTitleStyle}
                      image={{
                        uri: shop.image_url
                      }}
                    >
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between'
                        }}
                      />
                    </Card>
                  </TouchableOpacity>
                </View>
              ))
            : null}
        </Animated.ScrollView>
        <View style={styles.buttonContainer}>
          <Button
            title="Find Coffee"
            backgroundColor="brown"
            icon={{ name: 'search' }}
            onPress={this.onButtonPress}
            buttonStyle={{ borderRadius: 10 }}
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
  },
  scrollView: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 10,
    paddingBottom: 45
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH
  },
  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: '#FFF',
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: 'hidden'
  },
  textContent: {
    flex: 1,
    flexDirection: 'column'
  },
  cardTitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: 'bold'
  },
  cardDescription: {
    fontSize: 12,
    color: '#444'
  },
  markerWrap: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'brown'
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#630808',
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'brown'
  },
  featuredTitleStyle: {
    marginHorizontal: 5,
    textShadowColor: '#00000f',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 3
  },
  noteStyle: {
    margin: 5,
    fontSize: 16
  }
});
