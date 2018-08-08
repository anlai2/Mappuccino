import _ from 'lodash';
import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Switch,
  Slider,
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
    const {
      filter,
      priceOne,
      priceTwo,
    } = this.props.navigation.state.params.refresh.filterData;

    this.state = {
      filter: {
        price: _.isNull(filter.price) ? [] : filter.price,
      },
      priceOne: _.isNull(priceOne) ? false : priceOne,
      priceTwo: _.isNull(priceTwo) ? false : priceTwo,
      openNow: true,
      topRated: false,
      hot: true,
      cold: true,
    };
  }

  priceFilterOne = () => {
    if (this.state.priceOne) {
      this.state.filter.price.shift();
      this.setState({
        priceOne: false,
      });
    } else {
      this.state.filter.price.unshift(1);
      this.setState({
        priceOne: true,
      });
    }
  };

  priceFilterTwo = () => {
    if (this.state.priceTwo) {
      this.state.filter.price.pop();
      this.setState({
        priceTwo: false,
      });
    } else {
      this.state.filter.price.push(2);
      this.setState({
        priceTwo: true,
      });
    }
  };

  handleOpenNow = () => {
    this.setState({
      openNow: !this.state.openNow,
    });
  };

  handleTopRated = () => {
    this.setState({
      topRated: !this.state.topRated,
    });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
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
                  textStyle={{ color: this.state.priceOne ? 'white' : 'black' }}
                  buttonStyle={
                    this.state.priceOne
                      ? styles.onPriceButtonStyle
                      : styles.offPriceButtonStyle
                  }
                  onPress={this.priceFilterOne}
                />
                <Button
                  title="$$"
                  buttonStyle={
                    this.state.priceTwo
                      ? styles.onPriceButtonStyle
                      : styles.offPriceButtonStyle
                  }
                  textStyle={{ color: this.state.priceTwo ? 'white' : 'black' }}
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
                value={this.state.openNow}
              />
            </View>
            <Divider style={{ backgroundColor: '#D0D0D0', margin: 15 }} />
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text style={styles.filterTextStyle}>
                Top Rated
              </Text>
              <Switch
                onValueChange={this.handleTopRated}
                onTintColor="#86592d"
                value={this.state.topRated}
              />
            </View>
            <Divider style={{ backgroundColor: '#D0D0D0', margin: 15 }} />
            <View>
              <Text style={styles.filterTextStyle}>
                Caffeine Content
              </Text>
              <Slider
                minimumTrackTintColor="#86592d"
                minimumValue={0}
                maximumValue={250}
                step={5}
                value={125}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Text>
                  0 mg
                </Text>
                <Text>
                  125 mg
                </Text>
                <Text>
                  250 mg
                </Text>
              </View>
              <Divider style={{ backgroundColor: '#D0D0D0', margin: 15 }} />
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-between' }}
              >
                <Text style={styles.filterTextStyle}>
                  Drink Temperature
                </Text>
                <View
                  style={{ flexDirection: 'row', justifyContent: 'space-around' }}
                >
                  <Button
                    title="Hot"
                    textStyle={{ color: this.state.hot ? 'white' : 'black' }}
                    buttonStyle={
                    this.state.hot
                      ? styles.onPriceButtonStyle
                      : styles.offPriceButtonStyle
                  }
                    onPress={() => this.setState({ hot: !this.state.hot })}
                  />
                  <Button
                    title="Cold"
                    buttonStyle={
                    this.state.cold
                      ? styles.onPriceButtonStyle
                      : styles.offPriceButtonStyle
                  }
                    textStyle={{ color: this.state.cold ? 'white' : 'black' }}
                    onPress={() => this.setState({ cold: !this.state.cold })}
                  />
                </View>
              </View>
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
