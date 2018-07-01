import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

class FilterModal extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    filter: {
      price: [2]
    }
  };

  render() {
    console.log(this.props);
    return (
      <View style={styles.container}>
        <View style={styles.onBackContainer}>
          <TouchableOpacity
            onPress={() => {
              Actions.pop({ refresh: { filter: this.state.filter } });
            }}
          >
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
    position: 'relative',
    paddingTop: 25
  },
  onBackContainer: {
    backgroundColor: '#D3D3D3'
  }
};

export default FilterModal;
