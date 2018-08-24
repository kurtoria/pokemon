import { StyleSheet, Text, View, Button, Image, TouchableHighlight, TouchableOpacity, Flatlist, Dimensions } from 'react-native';
import { Font } from 'expo';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
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
      width: 350,
      height: 90
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
    bollArea: {
      position: 'absolute',
      top: '80%',
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
      top: '35%'
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
      color: 'black',
      top: '26%',
      fontFamily: "fipps-regular",
      fontSize: 20
    },
    presentPokemon: {
      position: 'absolute',
      color: 'blue',
      top: '30%',
      fontFamily: "fipps-regular",
      fontSize: 20
    },
    flatlistContainer: {
      flex: 1,
      marginVertical: 20,
      backgroundColor: 'transparent',
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height - 60,
      position: 'absolute',
      top: 60
    },
    item: {
      backgroundColor: 'transparent',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      margin: 1,
      height: Dimensions.get('window').width/3
    },
    itemInvisible: {
      backgroundColor: 'transparent'
    },
    itemText: {
      color: 'black',
      fontFamily: "fipps-regular",
      fontSize: 12
    },
    inventoryPokemon: {
      width: 130,
      height: 130,
      top: '20%'
    },
    touchInventory: {

    }
});
