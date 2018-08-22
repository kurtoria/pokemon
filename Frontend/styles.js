import { StyleSheet, Text, View, Button, Image, TouchableHighlight, TouchableOpacity, Flatlist } from 'react-native';
import { Font } from 'expo';

export const styles = StyleSheet.create({
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
    },
    presentPokemon: {
      position: 'absolute',
      color: 'blue',
      top: '30%',
      fontFamily: "fipps-regular",
      fontSize: 20
    }
});
