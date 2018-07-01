import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { Icon, Button, Card } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

const { width, height } = Dimensions.get('window');

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = width - 75;

class FilterModal extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    filter: {
      price: []
    },
    priceOne: false,
    priceTwo: false
  };

  handleFinishFilter = () => {
    Actions.pop({ refresh: { filter: this.state.filter } });
  };

  priceFilterOne = () => {
    if (this.state.priceOne) {
      this.state.filter.price.shift();
      this.setState({
        priceOne: false
      });
    } else {
      this.setState({
        filter: {
          price: [this.state.filter.price.unshift(1)]
        },
        priceOne: true
      });
    }
  };

  render() {
    console.log(this.state);
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.onBackContainer}>
            <TouchableOpacity onPress={() => this.handleFinishFilter}>
              <Icon
                type="entypo"
                name="chevron-thin-down"
                color="black"
                size={28}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.priceContainer}>
          <Card title="Filter Search" wrapperStyle={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 18 }}>Price</Text>
            <View style={styles.priceButtonContainer}>
              <View style={styles.priceButtonStyle}>
                <Button
                  title="$"
                  textStyle={{ color: 'black' }}
                  buttonStyle={styles.offPriceButtonStyle}
                  onPress={this.priceFilterOne}
                />
              </View>
              <View style={styles.priceButtonStyle}>
                <Button
                  title={'$$'}
                  buttonStyle={styles.offPriceButtonStyle}
                  textStyle={{ color: 'black' }}
                />
              </View>
            </View>
          </Card>
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
  },
  priceContainer: {
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  priceButtonContainer: {
    height: 60,
    width: CARD_WIDTH,
    flexDirection: 'row',
    alignContent: 'space-around',
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  priceButtonStyle: {
    flex: 1
  },
  offPriceButtonStyle: {
    backgroundColor: '#D3D3D3'
  },
  onPriceButtonStyle: {
    backgroundColor: 'brown'
  }
};

export default FilterModal;
