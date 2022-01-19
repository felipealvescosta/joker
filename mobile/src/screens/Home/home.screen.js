import React, { useState, useCallback } from 'react'
import { Text, ScrollView, ActivityIndicator } from 'react-native'
import { useNavigation, useFocusEffect } from '@react-navigation/native'

import { useAuth } from '../../hooks/auth'

import api from '../../services/api'

import { Header } from '../../components/Header/header.component'
import { Card } from '../../components/Card/card.component'
import { styles } from './styles'

export function Home () {
  const { data } = useAuth()
  const {name} = data.user;
  const navigation = useNavigation()

  function getFirtsName(name){
    let nameSanitized = name.split(' ');
    let firtsName = nameSanitized[0];
    return firtsName
  }

  function handleListUsers () {
    navigation.navigate('Users')
  }

  return (
    <>
      <ScrollView style={styles.content}>
        <Header />

            <Text style={styles.title}>Hi, {getFirtsName(name)}!</Text>
            <Text style={styles.panel}>Admin Panel</Text>
            <Card name='Users' action={handleListUsers} />
            <Card name='Jokes' action={() => {}} />
      </ScrollView>
    </>
  )
}
