import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'

export function Button ({ title, action}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={action}>
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    marginHorizontal: 20,

  },
  button:{
    height:40,
    backgroundColor:'#000000',
    marginBottom: 15,
  },
  title: {
    fontSize: 25,
    marginTop: 5,
    fontFamily: 'Rokkitt_400Regular',
    color: '#ffffff',
    textAlign:'center',
  },
})
