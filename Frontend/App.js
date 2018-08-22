import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableHighlight, TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation'
import { Font } from 'expo';
const themeSound = new Expo.Audio.Sound();

class BattleScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pokeName: undefined,
      pokePic: null,
      cp: undefined,
      fontLoaded: false
    }
    //this._randomizePokemon = this._randomizePokemon.bind(this)
  }
  static navigationOptions = {
    title: 'Battle',
    header: null
  }
  _throwPokeball() {
    console.log('You threw the ball!')
  }
  async componentDidMount() {
    await Font.loadAsync({
      'fipps-regular': require('../Frontend/Assets/Fipps-Regular.otf'),
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

    const battleSound = new Expo.Audio.Sound();

    try {
      await battleSound.loadAsync(require('../Frontend/Assets/battle.mp3'))
      await battleSound.playAsync()
      console.log("Playing sound")
    } catch (error) {
      console.log("Error playing sound")
    }

  }
  render() {
    console.log("IN RENDER" + this.state.pokePic)
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>

        {/*Background image*/}
        <Image style={styles.backgroundImage}
               source={require('../Frontend/Assets/background2.png')}>
        </Image>

        {/*Name of pokemon*/}
        {this.state.fontLoaded ? (
        <Text style={styles.text}>{this.state.pokeName}</Text>
        ) : null}

        {/*Pokemon pic*/}
        <Image style={styles.pokemon}
               source={{uri: this.state.pokePic}}></Image>

        {/*Pokebal pic*/}
        <TouchableOpacity style={styles.clickArea} onPress={this._throwPokeball}>
          <Image style={styles.ball}
                 source={require('../Frontend/Assets/pokeball.png')}></Image>
        </TouchableOpacity>

        {/*Back arrow*/}
        <TouchableOpacity style={styles.exitArea} onPress={ ()=> navigate('Home') }>
          <Image style={styles.arrow}
                 source={require('../Frontend/Assets/arrow.png')}></Image>
        </TouchableOpacity>
      </View>
    );
  }
}

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
    header: null
  }
  async componentDidMount() {

    try {
      await themeSound.loadAsync(require('../Frontend/Assets/theme.mp3'))
      await themeSound.playAsync()
      console.log("Playing sound")
    } catch (error) {
      console.log("Error playing sound")
    }
  }

  _onPikaPress() {
    themeSound.stopAsync()
  }

  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        <Image style={styles.backgroundImage}
               source={require('../Frontend/Assets/background4.png')}>
        </Image>
        <Image style={styles.logo}
               source={require('../Frontend/Assets/logo.png')}>
        </Image>
        <Image style={styles.pika}
               source={require('../Frontend/Assets/pikachu.gif')} />
             <TouchableOpacity style={styles.questionArea} onPress={ ()=> {
                 themeSound.stopAsync() 
                 navigate('Battle')
               }
              }>
          <Image style={styles.question}
                 source={require('../Frontend/Assets/questionmark.gif')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bagArea} onPress={ ()=> navigate('Inventory') }>
            <Image style={styles.bag}
                 source={require('../Frontend/Assets/backpack.png')} />
        </TouchableOpacity>
      </View>
    )
  }
}

class InventoryScreen extends React.Component {
  static navigationOptions = {
    title: 'Inventory',
    header: null
  }
  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        <Image style={styles.backgroundImage}
               source={require('../Frontend/Assets/background5.png')}>
        </Image>
        <TouchableOpacity style={styles.exitArea} onPress={ ()=> navigate('Home') }>
          <Image style={styles.arrow}
                 source={require('../Frontend/Assets/arrow.png')}></Image>
        </TouchableOpacity>
      </View>
    )
  }
}

const NavigationApp = createStackNavigator({
  Home: { screen: HomeScreen },
  Battle: { screen: BattleScreen },
  Inventory: { screen: InventoryScreen }
},
{
    headerMode: 'screen'
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
    //this._randomizePokemon = this._randomizePokemon.bind(this)
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
      position: 'absolute'
  },
  backgroundImage: {
        flex: 1,
        width: 500,
        height: 100,
        resizeMode: 'cover'
    },
    logo: {
      position: 'absolute',
      top: '5%',
      justifyContent: 'center',
      width: 400,
      height: 100
    },
    ball: {
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      width: 100,
      height: 100
    },
    arrow: {
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      width: 100,
      height: 50
    },
    clickArea: {
      position: 'absolute',
      top: '80%',
      left: '40%',
      width: 100,
      height: 100
    },
    exitArea: {
      position: 'absolute',
      top: '5%',
      left: '5%',
      width: 100,
      height: 50
    },
    pika: {
      position: 'absolute',
      width: 100,
      height: 100
    },
    questionArea: {
      position: 'absolute',
      width: 50,
      height: 50,
      top: '38%'
    },
    question: {
      position: 'absolute',
      width: 30,
      height: 44,
    },
    bagArea: {
      position: 'absolute',
      width: 100,
      height: 100,
      top: '85%',
      left: '5%'
    },
    bag: {
      position: 'absolute',
      width: 60,
      height: 100,
    },
    pokemon: {
      position: 'absolute',
      width: 250,
      height: 250,
    },
    text: {
      position: 'absolute',
      color: 'white',
      top: '30%',
      fontFamily: "fipps-regular",
      fontSize: 20
    }
});
