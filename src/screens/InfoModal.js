import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Icon, Button, Card } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

class InfoModal extends Component {
  componentDidMount() {
    console.log(this.props.shop);
  }

  render() {
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
  }
};

export default InfoModal;
