import React from 'react';
import { DeviceEventEmitter } from 'react-native';
import { Font } from 'expo';
import { styles } from '../styles.js'
import { StyleSheet, Text, View, Image, TouchableHighlight, TouchableOpacity, Flatlist } from 'react-native';
const battleSound = new Expo.Audio.Sound();
const victorySound = new Expo.Audio.Sound();

export class BattleScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pokeName: undefined,
      pokePic: null,
      /*cp: undefined,*/
      fontLoaded: false,
      isCatching: false,
      isCaught: false,
      lengthOfName: 0,
      didFlee: false
    }
    this._throwPokeball = this._throwPokeball.bind(this)
  }
  static navigationOptions = {
    title: 'Battle',
    header: null
  }

  _throwPokeball() {
    console.log('You threw the ball!')
    let nr = Math.floor(Math.random() * 3) + 1
    console.log("NR is " + nr);

    this.setState({
      isCatching: true
    })

    setTimeout(() => {


      this.setState({
        isCatching: false
      })
      console.log("catching after: " + this.state.isCatching);
      console.log("3 sec after");

      if (nr <= 2) {
        console.log('You caught it')
        fetch('http://192.168.1.84:3000/', {
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

        this.setState({
          isCaught: true,
          pokeName: "Gotcha!",
          lengthOfName: 7
        })

        //this._playVictorySound()

      } else {
        console.log("It ran away");
        this.setState({
          isCaugth: false,
          pokeName: "The wild pokemon fled",
          lengthOfName: 21,
          didFlee: true
        })
      }


    }, 3000)

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
      this.setState({
        lengthOfName: this.state.pokeName.length
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
/*
  async _playVictorySound() {
    console.log("Should play victory music");
    DeviceEventEmitter.addListener('startVictoryMusic', (e)=>{
      battleSound.playAsync()
    })

    try {
      await victorySound.loadAsync(require('../Assets/victory.mp3'))
      await victorySound.playAsync()
      console.log("Playing sound")
      battleSound.stopAsync()
    } catch (error) {
      console.log("Error playing sound")
    }
  }*/

  componentWillMount() {
    console.log("i componentwillmount inventory");
    DeviceEventEmitter.addListener('startBattleMusic', (e)=>{
      console.log("Hej inv")
      battleSound.playAsync()
    })
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

        {/*Text view*/}
        {this.state.isCatching  ? null :
        <View style={
          {
            backgroundColor: '#FFFFFF70',
            borderRadius: 10,
            borderWidth: 0,
            position: 'absolute',
            top: '26%',
            height: 45,
            width: this.state.lengthOfName * 26
          }
        }/>
    }

        {/*Name of pokemon*/}
        {this.state.fontLoaded && !this.state.isCatching ? (
        <Text style={styles.text}>{this.state.pokePic ? this.state.pokeName : ""}</Text>
        ) : null}

        {/*Pokemon pic*/}
        {this.state.isCatching || this.state.isCaught ?
        <Image style={styles.pokemon}
                 source={require('../Assets/pokeball.png')}></Image> :

        <Image style={styles.pokemon}
               source={this.state.pokePic && !this.state.didFlee ? {uri: this.state.pokePic} : require('../Assets/glitter.gif')}></Image>
           }

        {/*Glitter while catching*/}
        {this.state.isCatching ?
        <Image style={styles.pokemon}
                    source={require('../Assets/glitter.gif')}></Image> : null }

        {/*Pokeball pic*/}
        {this.state.isCatching || this.state.isCaught || this.state.didFlee ? null :
        <TouchableOpacity style={styles.bollArea} onPress={this._throwPokeball}>
          <Image style={styles.ball}
                 source={require('../Assets/pokeball.png')}></Image>
        </TouchableOpacity>
        }

        {/*Back arrow*/}
        <TouchableOpacity style={styles.exitArea} onPress={ ()=> {
            battleSound.stopAsync()
            DeviceEventEmitter.emit('startHomeMusic',  {})
            this.props.navigation.goBack()
          }
         }>
          <Image style={styles.arrow}
                 source={require('../Assets/arrow.png')}></Image>
        </TouchableOpacity>
      </View>
    );
  }
}
