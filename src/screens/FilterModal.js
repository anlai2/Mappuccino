import _ from 'lodash';
import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Switch,
} from 'react-native';
import {
  Icon,
  Button,
  Card,
  Divider,
} from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

const { width, height } = Dimensions.get('window');

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = width - 75;

class FilterModal extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    const {
      filter,
      priceOne,
      priceTwo,
      openNow,
    } = navigation.state.params.refresh.filterData;

    this.state = {
      filter: {
        price: _.isNull(filter.price) ? [] : filter.price,
      },
      priceOne: _.isNull(priceOne) ? false : priceOne,
      priceTwo: _.isNull(priceTwo) ? false : priceTwo,
      openNow: true,
      topRated: false,
    };
  }

  priceFilterOne = () => {
    const { priceOne, filter } = this.state;
    if (priceOne) {
      filter.price.shift();
      this.setState({
        priceOne: false,
      });
    } else {
      filter.price.unshift(1);
      this.setState({
        priceOne: true,
      });
    }
  };

  priceFilterTwo = () => {
    const { priceTwo, filter } = this.state;
    if (priceTwo) {
      filter.price.pop();
      this.setState({
        priceTwo: false,
      });
    } else {
      filter.price.push(2);
      this.setState({
        priceTwo: true,
      });
    }
  };

  handleOpenNow = () => {
    const { openNow } = this.state;
    this.setState({
      openNow: !openNow,
    });
  };

  handleTopRated = () => {
    const { topRated } = this.state;
    this.setState({
      topRated: !topRated,
    });
  };

  render() {
    const { priceOne, priceTwo, openNow } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.headerContainer}>
          <View style={styles.onBackContainer}>
            <TouchableOpacity
              onPress={() => Actions.pop({ refresh: { filterData: this.state } })}
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
        <View>
          <Card
            titleStyle={{ fontWeight: '400', fontSize: 24 }}
            title="Filter Search"
          >
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text style={styles.filterTextStyle}>
                Price
              </Text>
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-around' }}
              >
                <Button
                  title="$"
                  textStyle={{ color: 'black' }}
                  buttonStyle={
                    priceOne
                      ? styles.onPriceButtonStyle
                      : styles.offPriceButtonStyle
                  }
                  onPress={this.priceFilterOne}
                />
                <Button
                  title="$$"
                  buttonStyle={
                    priceTwo
                      ? styles.onPriceButtonStyle
                      : styles.offPriceButtonStyle
                  }
                  textStyle={{ color: 'black' }}
                  onPress={this.priceFilterTwo}
                />
              </View>
            </View>
            <Divider style={{ backgroundColor: '#D0D0D0', margin: 15 }} />
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text style={styles.filterTextStyle}>
                Open Now
              </Text>
              <Switch
                onValueChange={this.handleOpenNow}
                onTintColor="#86592d"
                value={openNow}
              />
            </View>
            <Divider style={{ backgroundColor: '#D0D0D0', margin: 15 }} />
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text style={styles.filterTextStyle}>
                More coming soon...
              </Text>
            </View>
          </Card>
        </View>
      </View>
    );
  }
}

FilterModal.defaultProps = {
  filterData: {
    filter: {
      price: [],
      priceOne: null,
      priceTwo: null,
    },
  },
};

const styles = {
  headerContainer: {
    backgroundColor: '#ac7339',
    justifyContent: 'center', // Vertical
    alignItems: 'center', // Horizontal
    height: 100,
    paddingTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative',
  },
  onBackContainer: {
    backgroundColor: '#ac7339',
  },
  priceButtonContainer: {
    height: 60,
    width: CARD_WIDTH,
    flexDirection: 'row',
    alignContent: 'space-around',
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  priceButtonStyle: {
    flex: 1,
  },
  offPriceButtonStyle: {
    backgroundColor: '#D3D3D3',
  },
  onPriceButtonStyle: {
    backgroundColor: '#86592d',
  },
  filterTextStyle: {
    fontSize: 20,
    fontWeight: '300',
  },
};

export default FilterModal;
