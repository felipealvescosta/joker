import React, { useState, useEffect } from 'react'
import {
  Text,
  View,
  Alert,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { FontAwesome5 } from '@expo/vector-icons'

import { useAuth } from '../../hooks/auth'

import api from '../../services/api'

import { Header } from '../../components/Header/header.component'

import { styles } from './joke.styles'

export function Joke () {
  const { data } = useAuth()
  const { id } = data.user
  const [joke, setJoke] = useState()
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation()

  function handleBack () {
    navigation.navigate('Home')
  }

  async function handleRateJoke (joke, vote) {
    const jokePayload = {
      joke,
      vote,
      userId: id
    }
    
    const response = await api.post('/jokes', {
      jokePayload
    })

    if (response.status === 201) {
      Alert.alert('Evaluation Complete!', '', [
        { text: 'Back', onPress: () => handleBack() },
        { text: 'Continue', onPress: () => loadJoke() }
      ])
    }
  }
  async function loadJoke () {
    setLoading(true)
    const { data } = await api.get('/jokes/search')
    setJoke(data)
    setLoading(false)
  }

  useEffect(() => {
    loadJoke()
  }, [])

  return (
    <>
      <View style={styles.content}>
        <Header />
        <View>
          {loading ? (
            <ActivityIndicator style={styles.load} />
          ) : (
            <>
              <View style={styles.joke}>
                <Text style={styles.textJoke}>"{joke?.joke}"</Text>
              </View>
              <View style={styles.buttonsArea}>
                <View
                  style={{
                    margin: 20,
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}
                >
                  <TouchableOpacity
                    onPress={() => handleRateJoke(joke, false)}
                    style={styles.buttonRate}
                  >
                    <FontAwesome5
                      name={'thumbs-down'}
                      solid
                      size={25}
                      color={'#fff'}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleRateJoke(joke, true)}
                    style={styles.buttonRate}
                  >
                    <FontAwesome5
                      name={'thumbs-up'}
                      solid
                      size={25}
                      color={'#fff'}
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={handleBack}
                  style={styles.buttonBack}
                >
                  <Text style={styles.buttonBackText}>Back</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
    </>
  )
}
