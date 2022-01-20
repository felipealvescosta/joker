import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { FontAwesome5 } from "@expo/vector-icons";

export function ListJokes ({ jokes }) {
  const navigation = useNavigation()

  function handleJokeDetails (item) {
    navigation.navigate('JokeDetails', {
      item
    })
  }

  return (  
    <View style={styles.container}>
      <FlatList
        data={jokes}
        numColumns={1}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.list}
            onPress={() => handleJokeDetails(item)}
          >
            <View style={styles.content}>
              <View style={styles.voteArea}>
                <Text style={styles.votes}>{item.positive.length}</Text>
                <FontAwesome5 style={styles.thumbs} name="thumbs-up" size={20} solid color="black" />
              </View>
              <Text style={styles.name}>{item.id}{item.joke}</Text>
            </View>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height:'90%',
  },
  list: {
    width: '90%',

    marginLeft: 20,
    marginTop: 15,


    borderBottomWidth: 0.5,
    borderColor: '#5555',
  },
  content: {
    flexDirection: 'row',
  },
  voteArea: {
    justifyContent: 'space-around',
    alignItems: 'center',

  },
  name: {
    fontSize: 18,
    fontFamily: 'Rokkitt_300Light',
    marginLeft: 10,
    marginRight: 5,

    textAlign: 'center',
    justifyContent: 'center',
    width: '90%',
    marginBottom: 10,
  },
  votes: {
    fontSize: 25,
    fontFamily: 'Rokkitt_400Regular',
  },
  thumbs: {
    marginTop: 10,
    marginBottom: 15,
  }
})
