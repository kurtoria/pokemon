import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, TouchableOpacity, Flatlist } from 'react-native';
import { createStackNavigator } from 'react-navigation'
import { Font } from 'expo';
import { styles } from './styles.js'
import { HomeScreen } from './components/HomeScreenComponent.js'
import { BattleScreen } from './components/BattleScreenComponent.js'
import { InventoryScreen } from './components/InventoryScreenComponent.js'

const NavigationApp = createStackNavigator({
  Home: { screen: HomeScreen },
  Battle: { screen: BattleScreen },
  Inventory: { screen: InventoryScreen }
},
{
    headerMode: 'none',
    mode: 'modal',
},
 {
  navigationOptions: {
    headerStyle: {
      marginTop: 26
    }
  }
})

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fontLoaded: false
    }
  }
  async componentDidMount() {
      await Font.loadAsync({
        'fipps-regular': require('../Frontend/Assets/Fipps-Regular.otf'),
      });
      this.setState({ fontLoaded: true });
    }
  render() {
    return <NavigationApp/>
  }
}
