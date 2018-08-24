import React from 'react';
import { DeviceEventEmitter } from 'react-native';
import { styles } from '../styles.js'
import { StyleSheet, Text, View, Image, TouchableHighlight, TouchableOpacity, Flatlist } from 'react-native';
const themeSound = new Expo.Audio.Sound();

export class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
    header: null
  }

  async componentDidMount() {
    try {
      await themeSound.loadAsync(require('../Assets/theme.mp3'))
      await themeSound.playAsync()
      console.log("Playing sound")
    } catch (error) {
      console.log("Error playing sound")
    }
  }
  componentWillMount() {
    console.log("i componentwillmount home");
    DeviceEventEmitter.addListener('startHomeMusic', (e)=>{
      console.log("Hej hem")
      themeSound.playAsync()
    })
  }
  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        <Image style={styles.backgroundImage}
               source={require('../Assets/background4.png')}>
        </Image>
        <Image style={styles.logo}
               source={require('../Assets/logo.png')}>
        </Image>
        <Image style={styles.pika}
               source={require('../Assets/pikachu.gif')} />
             <TouchableOpacity style={styles.questionArea} onPress={ ()=> {
                 themeSound.stopAsync()
                 DeviceEventEmitter.emit('startBattleMusic',  {})
                 navigate('Battle')
               }
              }>
          <Image style={styles.question}
                 source={require('../Assets/questionmark.gif')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bagArea} onPress={ ()=> {
            themeSound.stopAsync()
            DeviceEventEmitter.emit('startInventoryMusic',  {})
            navigate('Inventory')}
           }>
            <Image style={styles.bag}
                 source={require('../Assets/backpack.png')} />
        </TouchableOpacity>
      </View>
    )
  }
}
