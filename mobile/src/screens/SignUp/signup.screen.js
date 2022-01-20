import React, { useState, useEffect } from 'react'
import {
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  View,
  Platform,
  StatusBar,
  Alert,
} from 'react-native'
import * as Animatable from 'react-native-animatable'
import { useFormik } from 'formik'
import { useNavigation } from '@react-navigation/native'

import { useAuth } from '../../hooks/auth'

import api from '../../services/api'

import { Input } from '../../components/Input/input.component'

import Logo from '../../assets/icon.png'
import styles from './signup.style'

export default function SignUp () {
  const {loading } = useAuth()
  const navigation = useNavigation()

  function handleBack () {
    navigation.navigate('SignIn')
  }

  function onConfirmRegister () {
    Alert.alert('New User Registerd!', '', [
      { text: 'Go to Login', onPress: () => handleBack() }
    ])
  }


  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: ''
    },
    onSubmit: async values => {
      await api.post('/signup',{
        values
      })

      onConfirmRegister();
    }
  })

  const [logo] = useState(new Animated.ValueXY({ x: 130, y: 130 }))

  useEffect(() => {
    // eslint-disable-next-line no-undef
    keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      keyboardDidShow
    )
    // eslint-disable-next-line no-undef
    keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      keyboardDidHide
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function keyboardDidShow () {
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 55,
        duration: 10,
        useNativeDriver: false
      }),
      Animated.timing(logo.y, {
        toValue: 55,
        duration: 10,
        useNativeDriver: false
      })
    ]).start()
  }

  function keyboardDidHide () {
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 130,
        duration: 100,
        useNativeDriver: false
      }),
      Animated.timing(logo.y, {
        toValue: 130,
        duration: 100,
        useNativeDriver: false
      })
    ]).start()
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        enabled={Platform.OS === 'ios'}
        behavior='padding'
        style={styles.container}
      >
        <StatusBar backgroundColor='#C4C4C4' barStyle='dark-content' />
        <Animatable.View animation='bounceInDown' duration={1500}>
          <View style={{ paddingTop: '25%' }}>
            <Animated.Image
              source={Logo}
              style={{
                width: logo.x,
                height: logo.y
              }}
            />
          </View>
        </Animatable.View>
        <Animatable.Text
          animation='bounceInLeft'
          duration={1500}
          style={styles.header}
        >
          Joker
        </Animatable.Text>
        <View style={styles.inputArea}>
          <Input
            label='Name'
            animation='bounceIn'
            duration={1500}
            placeholder='Name'
            placeholderTextColor='#999'
            keyboardType='default'
            autoCapitalize='none'
            value={formik.values.name}
            onChangeText={formik.handleChange('name')}
          />
          <Input
            label='E-mail'
            animation='bounceIn'
            duration={1500}
            placeholder='E-mail'
            placeholderTextColor='#999'
            keyboardType='email-address'
            autoCapitalize='none'
            value={formik.values.email}
            onChangeText={formik.handleChange('email')}
          />
          <Input
            label='Password'
            placeholder='Password'
            placeholderTextColor='#999'
            secureTextEntry={true}
            autoCapitalize='none'
            value={formik.values.password}
            onChangeText={formik.handleChange('password')}
          />
        </View>

        <Animatable.View
          animation='bounceInUp'
          duration={1500}
          style={styles.buttonContainer}
        >
          <TouchableOpacity onPress={formik.handleSubmit} style={styles.button}>
            {loading ? (
              <ActivityIndicator color='#fff' size='small' />
            ) : (
              <Text style={styles.buttontext}>Register Now</Text>
            )}
          </TouchableOpacity>
        </Animatable.View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}
