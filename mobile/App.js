import 'react-native-gesture-handler'

import React from 'react'
import AppLoading from 'expo-app-loading'

import AuthProvider from './src/hooks/auth'
import Routes from './src/routes/'

import {
  useFonts,
  Rokkitt_300Light,
  Rokkitt_400Regular,
  Rokkitt_500Medium,
  Rokkitt_700Bold
} from '@expo-google-fonts/rokkitt'
import { StatusBar } from 'react-native'

export default function App () {
  const [fonstLoaded] = useFonts({
    Rokkitt_300Light,
    Rokkitt_400Regular,
    Rokkitt_500Medium,
    Rokkitt_700Bold
  })

  if (!fonstLoaded) {
    return <AppLoading />
  }

  return (
    <>
      <StatusBar barStyle='dark-content'/>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </>
  )
}
