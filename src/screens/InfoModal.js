import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Linking, Platform } from 'react-native';
import { MapView, Marker } from 'expo';
import { Icon, Button, Card, Image } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import StarRating from 'react-native-star-rating';

class InfoModal extends Component {
  componentDidMount() {
    console.log(this.props.shop);
  }

  render() {
    const {
      image_url,
      name,
      rating,
      phone,
      display_phone,
      price,
      coordinates
    } = this.props.shop;

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.onBackContainer}>
            <TouchableOpacity onPress={() => Actions.pop()}>
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
            <Text style={styles.titleStyle}>{name}</Text>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <StarRating
                maxStars={5}
                disabled
                rating={rating}
                starSize={18}
                fullStarColor={'#ac7339'}
                emptyStarColor={'#86592d'}
              />
              <Text>{price}</Text>
            </View>
            <TouchableOpacity onPress={() => Linking.openURL(`tel:${phone}`)}>
              <Text
                style={{ color: '#0645AD', textDecorationLine: 'underline' }}
              >
                {display_phone}
              </Text>
            </TouchableOpacity>
            <View style={{ height: 200, paddingTop: 20 }}>
              <MapView
                style={{ flex: 1 }}
                initialRegion={{
                  latitude: coordinates.latitude,
                  longitude: coordinates.longitude,
                  latitudeDelta: 0.015,
                  longitudeDelta: 0.015
                }}
                showsUserLocation={true}
                loadingEnabled={true}
                showsBuildings={false}
                showsPointsOfInterest={false}
                loadingIndicatorColor="brown"
                cacheEnable={Platform.OS === 'android'}
              >
                <MapView.Marker coordinate={coordinates} />
              </MapView>
            </View>
          </View>
        </Card>
      </View>
    );
  }
}

const styles = {
  container: {
    backgroundColor: '#ac7339',
    justifyContent: 'center', // Vertical
    alignItems: 'center', // Horizontal
    height: 80,
    paddingTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative',
    paddingTop: 25
  },
  onBackContainer: {
    backgroundColor: '#ac7339'
  },
  titleStyle: {
    fontSize: 24,
    fontWeight: '300'
  }
};

export default InfoModal;
