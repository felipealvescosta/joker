import React from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView} from 'react-native';

export function Header() {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require('../../assets/icon.png')}
        />
        <Text style={styles.title}>Joker</Text>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 15,
  },
  logo: {
    width:50,
    height:50,
  },
  title: {
    fontSize: 35,
    marginLeft: 10,
    marginTop: 5,
    fontFamily: 'Rokkitt_500Medium',
  },
});
