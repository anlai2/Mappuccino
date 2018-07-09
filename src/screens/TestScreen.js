import _ from 'lodash';
import React from 'react';
import { MapView, Marker, LinearGradient } from 'expo';
import {
  Button,
  Card,
  Divider,
  Icon,
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
  Dimensions,
  ActivityIndicator,
  Platform,
  Linking
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import StarRating from 'react-native-star-rating';

const COFFEE_MARKER = require('../../assets/coffeeIcon.png');

const { width, height } = Dimensions.get('window');

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = width - 75;

export default class TestScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        longitude: -122.45213824240618,
        latitude: 37.738948026999054,
        longitudeDelta: 0.0015,
        latitudeDelta: 0.0015
      },
      coffeeShops: {},
      filter: {
        price: !_.isNull(this.props.filterData.filter.price)
          ? this.props.filterData.filter.price
          : []
      },
      loading: false
    };
  }

  // Component's state, cannot be accessed cross screens
  // Good for data that is minimal
  // this.state.region refers to the object
  // this.setState({ region: data }) to change the state

  componentWillReceiveProps(nextProps) {
    console.log('THIS IS NEXT PROPS');
    console.log(nextProps);
    this.setState({ filter: nextProps.filterData.filter });
    console.log('THIS IS NEXT PROPS');
  }

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
    this.setState({ loading: true });
    fetch(
      `https://api.yelp.com/v3/businesses/search?&latitude=${
        this.state.region.latitude
      }&longitude=${
        this.state.region.longitude
      }&open_now=true&term=coffee&radius=2500&offset=25&sort_by=distance&price=${this.state.filter.price.join(
        ','
      )}`,
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
        console.log(data);
        this.setState({ coffeeShops: data.businesses });
      })
      .then(() => this.renderCards())
      .then(() => this.setState({ loading: false }))
      .catch(err => console.log(err));
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

  renderButton = () => {
    if (!this.state.loading) {
      return (
        <TouchableOpacity
          style={{ alignItems: 'center', justifyContent: 'center' }}
          onPress={this.onButtonPress}
        >
          <LinearGradient
            style={styles.searchGradientStyle}
            colors={['#86592d', '#ac7339', '#c68c53']}
          >
            <Text style={styles.searchButtonStyle}>Search Coffee</Text>
          </LinearGradient>
        </TouchableOpacity>
      );
    } else {
      return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <LinearGradient
            style={styles.loadingGradientStyle}
            colors={['#86592d', '#ac7339', '#c68c53']}
          >
            <ActivityIndicator color="#FFFFFF" />
          </LinearGradient>
        </View>
      );
    }
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
          snapToInterval={CARD_WIDTH + 20}
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
                <View
                  key={index}
                  style={styles.card}
                  // title={shop.name + shop.price}
                  // titleStyle={{ alignContent: 'flex-start' }}
                  // image={{
                  //   uri: shop.image_url
                  // }}
                >
                  <View
                    style={{
                      flexDirection: 'row'
                    }}
                  >
                    <View
                      style={{
                        padding: 5
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: 'bold'
                        }}
                      >
                        {shop.name}
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignContent: 'flex-end'
                        }}
                      >
                        <Text>{shop.price + '    '}</Text>
                        <StarRating
                          maxStars={5}
                          disabled
                          rating={shop.rating}
                          starSize={18}
                          fullStarColor={'#ac7339'}
                          emptyStarColor={'#86592d'}
                        />
                      </View>
                      <View
                        style={{
                          paddingTop: 10,
                          paddingBottom: 10
                        }}
                      >
                        <Image
                          resizeMode={'cover'}
                          style={{
                            width: CARD_WIDTH - 175,
                            height: CARD_HEIGHT - 75
                          }}
                          source={{ uri: shop.image_url }}
                        />
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'space-evenly'
                      }}
                    >
                      <Button
                        backgroundColor="rgb(76, 217, 100)"
                        title="Call"
                        icon={{ name: 'phone' }}
                        buttonStyle={{ borderRadius: 10, height: 42 }}
                        onPress={() => Linking.openURL(`tel:${shop.phone}`)}
                      />
                      <Button
                        backgroundColor="rgb(0, 122, 255)"
                        title="Directions"
                        icon={{ name: 'directions' }}
                        buttonStyle={{ borderRadius: 10, height: 42 }}
                        onPress={() => {
                          Platform.OS === 'ios'
                            ? Linking.openURL(
                                `http://maps.apple.com/?address=${shop.location.display_address.join(
                                  ' '
                                )}`
                              )
                            : console.log('ANDROID');
                        }}
                      />
                    </View>
                    {/* <View
                    style={{
                      justifyContent: 'space-between',
                      paddingTop: 10,
                      flexDirection: 'row'
                    }}
                  >
                    <Button
                      backgroundColor="rgb(0, 122, 255)"
                      title="Directions"
                      icon={{ name: 'directions' }}
                      buttonStyle={{ borderRadius: 10, height: 42 }}
                    />
                  </View> */}
                  </View>
                </View>
              ))
            : null}
        </Animated.ScrollView>
        <View style={styles.buttonContainer}>{this.renderButton()}</View>
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={{ alignItems: 'center', justifyContent: 'center' }}
            onPress={() =>
              Actions.filter({ refresh: { filterData: this.props.filterData } })
            }
          >
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-around' }}
            >
              <Icon
                type="entypo"
                name="chevron-thin-up"
                color="black"
                size={18}
              />
              <Text style={styles.filterButtonStyle}> Filter</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

TestScreen.defaultProps = {
  filterData: {
    filter: {
      price: null
    }
  }
};

// We can create a styles object to keep track of multiple styles
// Can also be implemented in the JSX tag, but this way is cleaner
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0
  },
  filterContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0
  },
  scrollView: {
    position: 'absolute',
    bottom: 60,
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
    width: CARD_WIDTH
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
    backgroundColor: '#86592d'
  },
  ring: {
    width: 18,
    height: 18,
    borderRadius: 12,
    backgroundColor: '#ac7339',
    position: 'absolute',
    borderWidth: 1,
    borderColor: '#86592d'
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
  },
  searchButtonStyle: {
    color: 'white'
  },
  filterButtonStyle: {
    color: 'black',
    fontSize: 16
  },
  searchGradientStyle: {
    justifyContent: 'center',
    backgroundColor: 'transparent',
    alignItems: 'center',
    width: 300,
    height: 45,
    padding: 15,
    borderRadius: 20,
    shadowOffset: { width: 3, height: 3 },
    shadowColor: 'black',
    shadowOpacity: 0.2
  },
  loadingGradientStyle: {
    justifyContent: 'center',
    backgroundColor: 'transparent',
    alignItems: 'center',
    width: 300,
    height: 45,
    padding: 15,
    borderRadius: 20,
    shadowOffset: { width: 3, height: 3 },
    shadowColor: 'black',
    shadowOpacity: 0.2
  }
});
