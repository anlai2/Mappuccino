import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo';
import { Actions } from 'react-native-router-flux';

import WelcomeImage from '../../assets/coffeeImage.jpg';
class WelcomeScreen extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-evenly',
          backgroundColor: '#FFFFFF'
        }}
      >
        <View style={{ padding: 25 }}>
          <Text
            style={{ textAlign: 'center', fontWeight: '500', fontSize: 48 }}
          >
            Mappuccino
          </Text>
        </View>
        <Image
          source={WelcomeImage}
          style={{
            resizeMode: 'cover',
            width: 400,
            height: 400,
            marginBottom: 10
          }}
        />
        <View style={{ padding: 25 }}>
          <Text
            style={{ textAlign: 'center', fontWeight: '500', fontSize: 25 }}
          >
            Find coffee shops near you with a single button!
          </Text>
        </View>
        <TouchableOpacity onPress={() => Actions.map()}>
          <LinearGradient
            colors={['#86592d', '#ac7339', '#c68c53']}
            style={{ padding: 15, alignItems: 'center', borderRadius: 5 }}
          >
            <Text
              style={{
                backgroundColor: 'transparent',
                fontSize: 18,
                color: '#fff'
              }}
            >
              Get Started
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }
}

export default WelcomeScreen;
