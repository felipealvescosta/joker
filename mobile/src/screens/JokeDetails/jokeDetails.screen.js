import React, { useState, useEffect } from 'react'
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { FontAwesome5 } from '@expo/vector-icons'

import { Header } from '../../components/Header/header.component'
import { ListUsers } from '../../components/ListUsers/listUsers.component'
import { Footer } from '../../components/Footer/footer.component'

import api from '../../services/api'
import { useAuth } from '../../hooks/auth'

import { styles } from './jokeDetails.styles'

export function JokeDetails ({ route }) {
  const { item: joke } = route.params
  const { data } = useAuth()
  const { isAdmin } = data.user
  const [users, setUsers] = useState()
  const [loading, setLoading] = useState()

  const navigation = useNavigation()

  function handleBack () {
    navigation.goBack()
  }

  async function handleHiddenJoke(){
    await api.put(`/jokes/${joke.id}`);
    
    Alert.alert('Joke Hidded!', '', [
      { text: 'Ok', onPress: () => handleBack() }
    ])
    
  }

  useEffect(() => {
    async function loadEvaluators () {
      setLoading(true)
      const { data } = await api.get(`/jokes/${joke.id}`)
      setLoading(false)
      setUsers(data)
    }

    loadEvaluators()
  }, [])

  return (
    <>
        <Header />
        <Text style={styles.panel}>Evaluared Jokes</Text>
        <ScrollView style={styles.joke}>
          <Text style={styles.textJoke}>"{joke?.joke}"</Text>
        </ScrollView>
        <View style={styles.voteArea}>
          <View style={styles.votes}>
            <Text style={styles.textVote}>{joke.positive.length} Votes</Text>
            <FontAwesome5 name={'thumbs-up'} solid size={25} color={'#000'} />
          </View>
          <View style={styles.votes}>
            <Text style={styles.textVote}>{joke.negative.length} Votes</Text>
            <FontAwesome5 name={'thumbs-down'} solid size={25} color={'#000'} />
          </View>
        </View>

        {!isAdmin ? (
          <>
            <Text style={styles.evaluators}>Last 5 Evaluators</Text>
            <View style={styles.areaEvaluators}>
              {loading ? (
                <ActivityIndicator />
              ) : (
                <>
                  <ListUsers users={users} />
                </>
              )}
            </View>
            <View style={styles.buttonArea}>
              <TouchableOpacity onPress={handleBack} style={styles.buttonBack}>
                <Text style={styles.buttonBackText}>Back</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <View style={styles.buttonArea}>
              <Footer  name="Hidden Joke" action={handleHiddenJoke}/>
            </View>
          </>
        )}
    </>
  )
}
