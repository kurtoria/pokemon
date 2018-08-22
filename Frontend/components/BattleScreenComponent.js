import React from 'react';
import { Font } from 'expo';
import { styles } from '../styles.js'
import { StyleSheet, Text, View, Image, TouchableHighlight, TouchableOpacity, Flatlist } from 'react-native';
const battleSound = new Expo.Audio.Sound();

export class BattleScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pokeName: undefined,
      pokePic: null,
      cp: undefined,
      fontLoaded: false
    }
    this._throwPokeball = this._throwPokeball.bind(this)
  }
  static navigationOptions = {
    title: 'Battle',
    header: null
  }

  //Victoria skolIP: 192.168.1.88
  //Moas skolIP: 192.168.1.89
  _throwPokeball() {
    console.log('You threw the ball!')
    fetch('http://192.168.1.88:3000/', {
      body: JSON.stringify({
        pokeName: this.state.pokeName,
        pokePic: this.state.pokePic
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    }).catch(function(error) {
      console.log("Error: " + error);
    })
  }
  async componentDidMount() {
    await Font.loadAsync({
      'fipps-regular': require('../Assets/Fipps-Regular.otf'),
    });
    this.setState({ fontLoaded: true });

    let nr = Math.floor(Math.random() * 151) + 1
    console.log(nr);

    fetch('https://pokeapi.co/api/v2/pokemon/' + nr + '/')
    .then(response => response.json())
    .then(result => {
      console.log(result.forms[0].name);
      console.log(result.sprites.front_default);

      this.setState({
        pokeName: result.forms[0].name.toUpperCase(),
        pokePic: result.sprites.front_default
      })
    })

    try {
      await battleSound.loadAsync(require('../Assets/battle.mp3'))
      await battleSound.playAsync()
      console.log("Playing sound")
    } catch (error) {
      console.log("Error playing sound")
    }

  }
  render() {
    console.log("IN RENDER: " + this.state.pokePic)
    //this.state.pokePic ? {uri: this.state.pokePic} : null
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>

        {/*Background image*/}
        <Image style={styles.backgroundImage}
               source={require('../Assets/background2.png')}>
        </Image>

        {/*Name of pokemon*/}
        {this.state.fontLoaded ? (
        <Text style={styles.text}>{this.state.pokeName}</Text>
        ) : null}

        {/*Pokemon pic*/}
        <Image style={styles.pokemon}
               source={this.state.pokePic ? {uri: this.state.pokePic} : require('../Assets/glitter.gif')}></Image>

        {/*Pokebal pic*/}
        <TouchableOpacity style={styles.clickArea} onPress={this._throwPokeball}>
          <Image style={styles.ball}
                 source={require('../Assets/pokeball.png')}></Image>
        </TouchableOpacity>

        {/*Back arrow*/}
        <TouchableOpacity style={styles.exitArea} onPress={ ()=> navigate('Home') }>
          <Image style={styles.arrow}
                 source={require('../Assets/arrow.png')}></Image>
        </TouchableOpacity>
      </View>
    );
  }
}
