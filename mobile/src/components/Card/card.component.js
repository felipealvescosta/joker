import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

export function Card({name, action}) {
  return (
    <TouchableOpacity style={styles.cardAction} onPress={action}>
      <Text style={styles.textAction}>{name}</Text>
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  cardAction: {
    height:100,
    width: '90%',
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor:'#000000',
  },
  textAction: {
    fontSize: 30,
    color: '#ffffff',
    fontFamily: 'Rokkitt_500Medium',
  }, 
});