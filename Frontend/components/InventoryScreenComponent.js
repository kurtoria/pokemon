import React from 'react';
import { styles } from '../styles.js'
import { Font } from 'expo';
import { StyleSheet, Text, View, Image, TouchableHighlight, TouchableOpacity, Flatlist } from 'react-native';
const inventorySound = new Expo.Audio.Sound();

export class InventoryScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pokeName: undefined,
      pokePic: null,
      fontLoaded: false,
      pokeArray: null,
      pokeArrayIsFetched: false
    }

  }
  static navigationOptions = {
    title: 'Inventory',
    header: null
  }
  async componentDidMount() {
    try {
      await inventorySound.loadAsync(require('../Assets/inventory.mp3'))
      await inventorySound.playAsync()
      console.log("Playing sound")
    } catch (error) {
      console.log("Error playing sound")
    }

    //Victoria skolIP: 192.168.1.88
    //Moas skolIP: 192.168.1.89
    fetch('http://192.168.1.88:3000/').then(function (response) {
      return response.json();
    })
    .then(result => {
      console.log(result);
      this.setState({
        pokeArray: result
      })/*.bind(this)/*.bind(this).catch(function (error){
        console.log("Error: " + error);
      })*/
    })
  }

  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        <Image style={styles.backgroundImage}
               source={require('../Assets/background5.png')}>
        </Image>


        <TouchableOpacity style={styles.exitArea} onPress={ ()=> navigate('Home') }>
          <Image style={styles.arrow}
                 source={require('../Assets/arrow.png')}></Image>
        </TouchableOpacity>

      </View>
    )
  }
}
