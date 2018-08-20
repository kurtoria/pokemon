import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';


export default class App extends React.Component {
  render() {
    return (

      <View style={styles.container}>
        <Button style={styles.container2} color="#0ff" title="Hej"></Button>
        <Image style={styles.backgroundImage} source={require('../Frontend/Assets/background2.png')}>
          </Image>

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
  container2: {
    flex: 1,
    justifyContent: 'center',
      position: 'absolute'
  },
  backgroundImage: {
        flex: 1,
        width: 500,
        height: 100,
        resizeMode: 'cover'
    }
});
