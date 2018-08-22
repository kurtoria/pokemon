import React from 'react';
import { styles } from '../styles.js'
import { Font } from 'expo';
import { StyleSheet, Text, View, Image, TouchableHighlight, TouchableOpacity, FlatList, Dimensions } from 'react-native';
const inventorySound = new Expo.Audio.Sound();

export class InventoryScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pokeName: undefined,
      pokePic: null,
      fontLoaded: false,
      pokeArray: [],
      pokeArrayIsFetched: false
    }

  }
  renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]}/>
    }

    return (
      <View
        style={styles.item}
        >
        <Text style={styles.itemText}>{item.pokeName}</Text>
        <Image source={require(item.pokePic)}/>
      </View>
    )
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

    const formatData = (data) => {
      const numberOfFullRows = Math.floor(data.length / 3)

    let numberOfElementsLastRow = data.length - (numberOfFullRows * 3)
    while (numberOfElementsLastRow !== 3 && numberOfElementsLastRow !== 0) {
      data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true})
      numberOfElementsLastRow = numberOfElementsLastRow + 1
    }
    return data
  }

    //Victoria skolIP: 192.168.1.88
    //Moas skolIP: 192.168.1.89
    fetch('http://192.168.1.88:3000/').then(function (response) {
      return response.json();
    })
    .then(result => {
      console.log(result);

//formatData(this.state.pokeArray)

      this.setState({
        pokeArray: formatData(result.map(pokeItem => ({ ...pokeItem, key: pokeItem._id}))),
        pokeArrayIsFetched: true
      })/*.bind(this)/*.bind(this).catch(function (error){
        console.log("Error: " + error);
      })*/
    })
  }

  render() {
    const { navigate } = this.props.navigation
    console.log("Styles: " + styles.flatlistContainer);

    return (
      <View style={styles.container}>
      <Image style={styles.backgroundImage}
             source={require('../Assets/background5.png')}>
      </Image>


      <TouchableOpacity style={styles.exitArea} onPress={ ()=> navigate('Home') }>
        <Image style={styles.arrow}
               source={require('../Assets/arrow.png')}></Image>
      </TouchableOpacity>


      {this.state.pokeArrayIsFetched ? (
        <FlatList
          data={this.state.pokeArray}
          style={styles.flatlistContainer}
          renderItem={this.renderItem}
          //renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
          numColumns={3}
          />
      ) : null}




      </View>
    )
  }
}
