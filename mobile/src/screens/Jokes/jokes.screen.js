import React, { useCallback, useState } from 'react'
import { Text, View, ActivityIndicator, TouchableOpacity } from 'react-native'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import api from '../../services/api'

import { Header } from '../../components/Header/header.component'
import { ListJokes } from '../../components/ListJokes/listJokes.component'
import { Button } from '../../components/Button/button.component'

import { styles } from './jokes.styles'

export function Jokes () {
  const [jokes, setJokes] = useState()
  const [isLoading, setLoading] = useState('false')
  const navigation = useNavigation()

  useFocusEffect(
    useCallback(() => {
      setLoading(true)

      async function onLoadUsers () {
        const { data } = await api.get('/jokes')
        setJokes(data)
        setLoading(false)
      }

      onLoadUsers()
    }, [])
  )

  function handleBack () {
    navigation.goBack()
  }

  return (
    <>
      <View style={styles.content}>
        <Header />
        <Text style={styles.title}>All Jokes</Text>
        {isLoading ? (
          <ActivityIndicator style={styles.load} />
        ) : (
          <>
            <View style={styles.areaJokes}>
              {jokes.length > 0 ? (
                <>
                  <ListJokes jokes={jokes} />
                </>
              ) : (
                <>
                  <View style={styles.empty}>
                    <Text style={styles.emptyText}>
                      No Jokes evaluated dyet!{' '}
                    </Text>
                  </View>
                </>
              )}
            </View>
            <View style={styles.footer}>
              <Button title='Back' action={handleBack} />
            </View>
          </>
        )}
      </View>
    </>
  )
}
