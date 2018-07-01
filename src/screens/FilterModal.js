import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

class FilterModal extends Component {
  render() {
    return (
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
    );
  }
}

const styles = {
  container: {
    backgroundColor: '#D3D3D3',
    justifyContent: 'center', // Vertical
    alignItems: 'center', // Horizontal
    height: 60,
    paddingTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative'
  },
  onBackContainer: {
    backgroundColor: '#D3D3D3'
  }
};

export default FilterModal;
