import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableHighlight, TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation'

class BattleScreen extends React.Component {
  static navigationOptions = {
    title: 'Battle',
    header: null
  }
  _throwPokeball() {
    console.log('You threw the ball!')
  }
  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        <Image style={styles.backgroundImage}
               source={require('/Users/ITHS/Documents/ATOM/NERDZ/pokemon/Frontend/Assets/background2.png')}>
        </Image>
        {/*()=>{alert("you clicked me")}*/}
        <TouchableOpacity style={styles.clickArea} onPress={this._throwPokeball}>
          <Image style={styles.ball}
                 source={require('/Users/ITHS/Documents/ATOM/NERDZ/pokemon/Frontend/Assets/pokeball.png')}></Image>
        </TouchableOpacity>
        <TouchableOpacity style={styles.exitArea} onPress={ ()=> navigate('Home') }>
          <Image style={styles.arrow}
                 source={require('/Users/ITHS/Documents/ATOM/NERDZ/pokemon/Frontend/Assets/arrow.png')}></Image>
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
  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        <Image style={styles.backgroundImage}
               source={require('/Users/ITHS/Documents/ATOM/NERDZ/pokemon/Frontend/Assets/background4.png')}>
        </Image>
        <Image style={styles.logo}
               source={require('/Users/ITHS/Documents/ATOM/NERDZ/pokemon/Frontend/Assets/logo.png')}>
        </Image>
        <Image style={styles.pika}
               source={require('/Users/ITHS/Documents/ATOM/NERDZ/pokemon/Frontend/Assets/pikachu.gif')} />
        <TouchableOpacity style={styles.questionArea} onPress={ ()=> navigate('Battle') }>
          <Image style={styles.question}
                 source={require('/Users/ITHS/Documents/ATOM/NERDZ/pokemon/Frontend/Assets/questionmark.gif')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bagArea} onPress={ ()=> navigate('Inventory') }>
            <Image style={styles.bag}
                 source={require('/Users/ITHS/Documents/ATOM/NERDZ/pokemon/Frontend/Assets/backpack.png')} />
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
               source={require('/Users/ITHS/Documents/ATOM/NERDZ/pokemon/Frontend/Assets/background5.png')}>
        </Image>
        <TouchableOpacity style={styles.exitArea} onPress={ ()=> navigate('Home') }>
          <Image style={styles.arrow}
                 source={require('/Users/ITHS/Documents/ATOM/NERDZ/pokemon/Frontend/Assets/arrow.png')}></Image>
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
    }
});
