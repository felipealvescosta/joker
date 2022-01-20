import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import {useNavigation} from '@react-navigation/native';

export function ListUsers({users}) {
  const navigation = useNavigation();

  function handleUserDetails(item){
    navigation.navigate('User',{
      item
    })
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        numColumns={1}
        keyExtractor={item => item.id.toString() }
        renderItem={({item})=> (
          <TouchableOpacity 
            style={styles.list}
            onPress={ () => handleUserDetails(item)}
          >
            <Text style={styles.name}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    height:'70%',
    backgroundColor: 'red',
  },
  list:{
    height:40,
    width:'90%',

    marginLeft: 20,
    marginTop: 15,
    borderBottomWidth: 0.5,
    borderColor: '#5555'
  },
  name: {
    fontSize: 25,
    fontFamily: 'Rokkitt_300Light',
  },
});