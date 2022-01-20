import React from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity
} from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'

export function Header ({hidden, action}) {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.brand}>
          <Image
            style={styles.logo}
            source={require('../../assets/icon.png')}
          />
          <Text style={styles.title}>Joker</Text>
        </View>
        {hidden &&
        (
          <TouchableOpacity onPress={action}>
            <FontAwesome5 name='sign-out-alt' solid size={20} color={'#000'}/>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 15
  },
  brand: {
    flexDirection: 'row',
  },
  logo: {
    width: 50,
    height: 50
  },
  title: {
    fontSize: 35,
    marginLeft: 10,
    marginTop: 5,
    fontFamily: 'Rokkitt_500Medium'
  }
})
