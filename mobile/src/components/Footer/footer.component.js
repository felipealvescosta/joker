import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import {useNavigation} from '@react-navigation/native';

export function Footer ({name, action}) {
  const navigation = useNavigation();

  function handleBack(){
    navigation.goBack();
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={action}>
        <Text style={styles.title}>{name}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonBack} onPress={handleBack}>
        <Text style={styles.back}>Back</Text>
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
  buttonBack:{
    height:40,
  },
  title: {
    fontSize: 25,
    marginTop: 5,
    fontFamily: 'Rokkitt_400Regular',
    color: '#ffffff',
    textAlign:'center',
  },
  back:{
    fontSize: 25,
    marginTop: 5,
    fontFamily: 'Rokkitt_400Regular',
    color: '#000000',
    textAlign:'center',
  },
})
