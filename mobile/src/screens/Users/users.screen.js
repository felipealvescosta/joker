import React, { useCallback, useState } from 'react'
import { Text, View, ActivityIndicator } from 'react-native'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import api from '../../services/api'

import { Header } from '../../components/Header/header.component'
import { ListUsers } from '../../components/ListUsers/listUsers.component'
import { Footer } from '../../components/Footer/footer.component'

import { styles } from './users.styles'

export function Users () {
  const [users, setUsers] = useState()
  const [isLoading, setLoading] = useState('false')
  const navigation = useNavigation()

  useFocusEffect(
    useCallback(() => {
      setLoading(true)

      async function onLoadUsers () {
        const { data } = await api.get('/users')
        setUsers(data)
        setLoading(false)
      }

      onLoadUsers()
    }, [])
  )

  function handleNewUser(){
    navigation.navigate('NewUser');
  }

  return (
    <>
      <View style={styles.content}>
        <Header />
        <Text style={styles.title}>All Users</Text>
        {isLoading ? (
          <ActivityIndicator style={styles.load} />
        ) : (
          <View>
            <ListUsers users={users} edit/>
            <Footer name='Register new user' action={handleNewUser} />
          </View>
        )}
      </View>
    </>
  )
}
