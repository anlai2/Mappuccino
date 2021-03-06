import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Linking,
  Platform,
  ScrollView,
} from 'react-native';
import { MapView, Marker } from 'expo';
import {
  Icon,
  Button,
  Card,
  Image,
} from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import StarRating from 'react-native-star-rating';

class InfoModal extends Component {
  render() {
    const { shop } = this.props;
    const {
      image_url,
      name,
      rating,
      categories,
      phone,
      display_phone,
      price,
      coordinates,
      location,
      is_closed,
    } = shop;

    return (
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.onBackContainer}>
            <TouchableOpacity
              onPress={() => Actions.pop()
              }
            >
              <Text style={{ paddingTop: 15 }}>
                Back to Map
              </Text>
              <Icon
                type="entypo"
                name="chevron-thin-down"
                color="black"
                size={28}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Card image={{ uri: image_url }}>
          <View
            style={{ flexDirection: 'column', justifyContent: 'space-around' }}
          >
            <Text style={styles.titleStyle}>
              {name}
            </Text>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <StarRating
                maxStars={5}
                disabled
                rating={rating}
                starSize={18}
                fullStarColor="#ac7339"
                emptyStarColor="#86592d"
              />
              <Text>
                {price}
              </Text>
            </View>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <TouchableOpacity onPress={() => Linking.openURL(`tel:${phone}`)}>
                <Text
                  style={{ color: '#0645AD', textDecorationLine: 'underline' }}
                >
                  {display_phone}
                </Text>
              </TouchableOpacity>
              <Text>
                {categories[0].title}
              </Text>
            </View>
            {is_closed ? (
              <Text style={{ color: 'red' }}>
                Closed
              </Text>
            ) : (
              <Text style={{ color: 'green' }}>
                Open Now
              </Text>
            )}
            <View
              style={{
                padding: 15,
                marginTop: 10,
                backgroundColor: '#F5F5F5',
                borderRadius: 25,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <View>
                <Text>
Monday
                </Text>
                <Text>
Tuesday
                </Text>
                <Text>
Wednesday
                </Text>
                <Text>
Thursday
                </Text>
                <Text>
Friday
                </Text>
                <Text>
Saturday
                </Text>
                <Text>
Sunday
                </Text>
              </View>
              <View>
                <Text>
6:00 AM - 6:00 PM
                </Text>
                <Text>
6:00 AM - 6:00 PM
                </Text>
                <Text>
6:00 AM - 6:00 PM
                </Text>
                <Text>
6:00 AM - 6:00 PM
                </Text>
                <Text>
6:00 AM - 8:00 PM
                </Text>
                <Text>
6:00 AM - 8:00 PM
                </Text>
                <Text>
6:00 AM - 8:00 PM
                </Text>
              </View>
            </View>
            <View
              style={{
                height: 200,
                paddingTop: 20,
              }}
            >
              <MapView
                style={{ flex: 1 }}
                initialRegion={{
                  latitude: coordinates.latitude,
                  longitude: coordinates.longitude,
                  latitudeDelta: 0.0055,
                  longitudeDelta: 0.0055,
                }}
                showsUserLocation
                loadingEnabled
                showsBuildings={false}
                showsPointsOfInterest={false}
                loadingIndicatorColor="brown"
                cacheEnable={Platform.OS === 'android'}
                scrollEnabled={false}
              >
                <MapView.Marker coordinate={coordinates} />
              </MapView>
            </View>
            <View
              style={{
                padding: 5,
              }}
            >
              <Text>
                {location.display_address.join(' ')}
              </Text>
            </View>
            <View style={{ padding: 5 }}>
              <Button
                backgroundColor="rgb(0, 122, 255)"
                title="Directions"
                icon={{ name: 'directions' }}
                buttonStyle={{ borderRadius: 10, height: 42 }}
                onPress={() => {
                  Platform.OS === 'ios'
                    ? Linking.openURL(
                      `http://maps.apple.com/?address=${location.display_address.join(
                        ' ',
                      )}`,
                    )
                    : Linking.openURL(
                      `comgooglemaps://?addr=${
                        coordinates.latitude
                      },${coordinates.longitude}`,
                    );
                }}
              />
            </View>
          </View>
        </Card>
      </ScrollView>
    );
  }
}

const styles = {
  container: {
    backgroundColor: '#ac7339',
    justifyContent: 'center', // Vertical
    alignItems: 'center', // Horizontal
    height: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative',
    paddingTop: 25,
  },
  onBackContainer: {
    backgroundColor: '#ac7339',
  },
  titleStyle: {
    fontSize: 24,
    fontWeight: '300',
  },
};

export default InfoModal;
