import React, { useState, useEffect, useCallback, useMemo } from 'react'
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { FontAwesome5 } from '@expo/vector-icons'

import { Header } from '../../components/Header/header.component'
import { ListUsers } from '../../components/ListUsers/listUsers.component'

import api from '../../services/api'

import { styles } from './jokeDetails.styles'

export function JokeDetails ({ route }) {
  const { item: joke } = route.params
  const [users, setUsers] = useState()
  const [loading, setLoading] = useState();

  const navigation = useNavigation()

  function handleBack () {
    navigation.navigate('Home')
  }

  useEffect(() => {
    const  loadEvaluators= async () => {
      setLoading(true);
      const {data} = api.get(`/jokes/${joke.id}`)
      setUsers(data);
      setLoading(false)
    }

    loadEvaluators()
  },[])

  console.log(joke.id,users);

  return (
    <>
      <View style={styles.content}>
        <Header />
        <Text style={styles.panel}>Evaluared Jokes{joke.id}</Text>
        <ScrollView style={styles.joke}>
          <Text style={styles.textJoke}>"{joke.joke}"</Text>
        </ScrollView>
        <View style={styles.voteArea}>
          <View style={styles.votes}>
            <Text style={styles.textVote}>{joke.positive.length} Votes</Text>
            <FontAwesome5 name={'thumbs-down'} solid size={25} color={'#000'} />
          </View>
          <View style={styles.votes}>
            <Text style={styles.textVote}>{joke.negative.length} Votes</Text>
            <FontAwesome5 name={'thumbs-down'} solid size={25} color={'#000'} />
          </View>
        </View>
        <Text style={styles.evaluators}>Last 5 Evaluators</Text>
        <View style={styles.areaEvaluators}>
          {
            loading? (
              <ActivityIndicator />
            ):(
              <>
                <ListUsers users={users} />
              </>
            )
          }
        </View>
        <View style={styles.buttonArea}>
          <TouchableOpacity onPress={handleBack} style={styles.buttonBack}>
            <Text style={styles.buttonBackText}>Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}
