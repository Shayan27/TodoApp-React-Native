import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default class Header extends React.Component {
  render() {
    return (
      <View style={style.header}>
        <Image style={style.headerImage} source={require('./img/fav.png')} />
        <Text style={style.headerText}>Todo App</Text>
      </View>
    );
  }
}


const style = StyleSheet.create({
  header: {
    backgroundColor: '#4267b2',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    flexDirection:'row',
  },
  headerImage: {
    width: 32,
    marginRight: 8,
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    flex: 1,
    marginTop: 4,
  },
});
