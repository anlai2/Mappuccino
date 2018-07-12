import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo';
import { Actions } from 'react-native-router-flux';

class WelcomeScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity onPress={() => Actions.map()}>
          <LinearGradient
            colors={['#86592d', '#ac7339', '#c68c53']}
            style={{ padding: 15, alignItems: 'center', borderRadius: 5 }}
          >
            <Text
              style={{
                backgroundColor: 'transparent',
                fontSize: 15,
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
