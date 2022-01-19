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
    navigation.navigate('Joke', {
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
              <View>
                <Text style={styles.votes}>{item.positive.length}</Text>
                <FontAwesome5 style={styles.thumbs} name="thumbs-up" size={15} solid color="black" />
              </View>
              <Text style={styles.name}>{item.joke}</Text>
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

    padding: 5,

    borderBottomWidth: 0.5,
    borderColor: '#5555'


  },
  content: {
    flexDirection: 'row',
  },
  name: {
    fontSize: 18,
    fontFamily: 'Rokkitt_300Light',
    marginLeft: 10,
    marginRight: 5,

    textAlign: 'center',
  },
  votes: {
    fontSize: 20,
    fontFamily: 'Rokkitt_400Regular',
  },
})
