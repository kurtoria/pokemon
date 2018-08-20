import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableHighlight, TouchableOpacity } from 'react-native';


export default class App extends React.Component {
  _throwPokeball() {
    console.log('You threw the ball!')
  }
  render() {
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
      </View>

    );
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
    ball: {
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      width: 100,
      height: 100
    },
    clickArea: {
      position: 'absolute',
      top: '80%',
      left: '40%',
      width: 100,
      height: 100
    }
});
