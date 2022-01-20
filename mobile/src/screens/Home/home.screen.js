import React, { useState, useCallback } from 'react'
import { Text, ActivityIndicator, View } from 'react-native'
import { useNavigation, useFocusEffect } from '@react-navigation/native'

import { useAuth } from '../../hooks/auth'

import api from '../../services/api'

import { Header } from '../../components/Header/header.component'
import { Card } from '../../components/Card/card.component'
import { ListJokes } from '../../components/ListJokes/listJokes.component'
import { Button } from '../../components/Button/button.component'

import { styles } from './home.styles'

export function Home () {
  const navigation = useNavigation()
  const [jokes, setJokes] = useState()
  const [loading, setLoading] = useState(false)
  const { data, signOut } = useAuth()
  const { name, isAdmin } = data.user

  function getFirtsName (name) {
    let nameSanitized = name.split(' ')
    let firtsName = nameSanitized[0]
    return firtsName
  }

  function handleListUsers () {
    navigation.navigate('Users')
  }


  function handleListJokes () {
    navigation.navigate('Jokes')
  }

  function handleRateJokes () {
    navigation.navigate('Joke')
  }

  function handleSignOut(){
    signOut();
  }

  useFocusEffect(
    useCallback(() => {
      setLoading(true)
      async function loadJokes () {
        const { data } = await api.get('/jokes')
        setJokes(data)
        setLoading(false)
      }

      loadJokes()
    }, [])
  )

  return (
    <>
      <Header hidden action={handleSignOut} />

      <Text style={styles.title}>Hi, {getFirtsName(name)}!</Text>
      {isAdmin ? (
        <>
          <Text style={styles.panel}>Admin Panel</Text>
          <Card name='Users' action={handleListUsers} />
          <Card name='Jokes' action={handleListJokes} />
        </>
      ) : (
        <>
          <Text style={styles.panel}>Evaluared Jokes</Text>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <>
              {jokes?.length > 0 ? (
                <View style={{ height: '60%' }}>
                  <ListJokes jokes={jokes} />
                </View>
              ) : (
                <Text style={styles.emptyStatys}>
                  There are no jokes rated yet {'\n'} : /
                </Text>
              )}
            </>
          )}
          <View style={styles.footer}>
            <Button
              style={styles.buttonRate}
              title='Rate Jokes'
              action={handleRateJokes}
            />
          </View>
        </>
      )}
    </>
  )
}
