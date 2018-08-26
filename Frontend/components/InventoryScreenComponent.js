import React from 'react';
import { styles } from '../styles.js'
import { DeviceEventEmitter } from 'react-native';
import { Font } from 'expo';
import { StyleSheet, Text, View, Image, TouchableHighlight, TouchableOpacity, FlatList, Dimensions, SearchBar } from 'react-native';
const inventorySound = new Expo.Audio.Sound();

export class InventoryScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pokeName: undefined,
      pokePic: null,
      fontLoaded: false,
      pokeArray: [],
      pokeArrayOrigin: [],
      pokeArrayIsFetched: false
      /*,
      pokeSearch: undefined*/
    }
  this._getAllFromDataBase = this._getAllFromDataBase.bind(this)
  this._searchPokedex = this._searchPokedex.bind(this)
  }
  _onLongPressInventory(index, name) {
    console.log('You deleted ' + name)
    this.state.pokeArray.splice(index, 1)
  }
  renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]}/>
    }

    return (
      <View style={styles.item}>

          <TouchableOpacity
            onLongPress={() => {
              console.log('You deleted ' + item.pokeName)
              this.state.pokeArray.splice(index, 1)

            fetch("http://localhost:3000/" + item._id + "/", {
                method: 'DELETE'
             })
             this._getAllFromDataBase()
            }}
            style={styles.touchInventory}>

          <Image style={styles.inventoryPokemon}
                 source={{uri: item.pokePic}}>
          </Image>
          </TouchableOpacity>
          <Text style={styles.itemText}>{item.pokeName}</Text>
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
  this._getAllFromDataBase()
  this._searchPokedex()
  }
  componentWillMount() {
    console.log("i componentwillmount inventory");
    DeviceEventEmitter.addListener('startInventoryMusic', (e)=>{
      console.log("Hej inv")
      inventorySound.playAsync()
    })
  }
  _getAllFromDataBase() {
    console.log("Inside get All From Database");
    fetch('http://localhost:3000/').then(function (response) {
      return response.json();
    })
    .then(result => {
      //console.log(result);

      this.setState({
        pokeArray: formatData(result.map(pokeItem => ({ ...pokeItem, key: pokeItem._id}))),
        pokeArrayOrigin: formatData(result.map(pokeItem => ({ ...pokeItem, key: pokeItem._id}))),
        pokeArrayIsFetched: true
      })
    })

    const formatData = (data) => {
      const numberOfFullRows = Math.floor(data.length / 3)

    let numberOfElementsLastRow = data.length - (numberOfFullRows * 3)
    while (numberOfElementsLastRow !== 3 && numberOfElementsLastRow !== 0) {
      data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true})
      numberOfElementsLastRow = numberOfElementsLastRow + 1
    }
    return data
    }
  }
  _searchPokedex() {
    var url = 'http://localhost:3000/' + this.state.pokeSearch
    console.log("URL: " + url);
    fetch(url)
    .then(function (response) {
      return response.json()
    })
    .then(result => {
      console.log(result);
    })
  }

  render() {
    const { navigate } = this.props.navigation
    console.log("in render");

    return (
      <View style={styles.container}>
      <Image style={styles.backgroundImage}
             source={require('../Assets/background5.png')}>
      </Image>

      <TouchableOpacity style={styles.exitArea} onPress={ ()=> {
          inventorySound.stopAsync()
          navigate('Home')
          DeviceEventEmitter.emit('startHomeMusic',  {})
        }
       }>

        <Image style={styles.arrow}
               source={require('../Assets/arrow.png')}></Image>
      </TouchableOpacity>

      {this.state.pokeArrayIsFetched ? (
        <FlatList
          data={this.state.pokeArray}
          style={styles.flatlistContainer}
          renderItem={this.renderItem}
          numColumns={3}
          />
      ) : null}

      <TouchableOpacity style={{
            position: 'absolute',
            height: 40,
            width: 40,
            top: 35,
            right: 20
          }} onPress={ ()=> {
            this.setState({
              pokeArray: this.state.pokeArrayOrigin.reverse()
            })
            console.log("first in new list: " + this.state.pokeArray[0].pokeName);
      }}>

      <Image style={{
        position: 'absolute',
        height: 40,
        width: 40}}
      source={require('../Assets/time.png')}></Image>
      </TouchableOpacity>

      <TouchableOpacity style={{
            position: 'absolute',
            height: 40,
            width: 40,
            top: 35,
            right: 80
          }} onPress={ ()=> {
            console.log("ABC");

            function compare(a, b) {
              var nameA = a.pokeName
              var nameB = b.pokeName
              if (nameA < nameB) {
                return -1;
              }
              if (nameA > nameB) {
                return 1;
              }
              return 0;
            }

            this.setState({
              pokeArray: this.state.pokeArray.sort(compare)
            })
            console.log("first in new list: " + this.state.pokeArray[0].pokeName);
      }}>

      <Image style={{
        position: 'absolute',
        height: 40,
        width: 40}}
      source={require('../Assets/abc.png')}></Image>
      </TouchableOpacity>

      </View>
    )
  }
}
