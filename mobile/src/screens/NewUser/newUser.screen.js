import React, { useState } from 'react'
import { Text, View, Alert, TouchableOpacity } from 'react-native'
import { useFormik } from 'formik'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { useNavigation } from '@react-navigation/native'

import api from '../../services/api'

import { Header } from '../../components/Header/header.component'
import { Input } from '../../components/Input/input.component'
import { Footer } from '../../components/Footer/footer.component'

import { styles } from './styles'

export function NewUser () {
  const [checkboxState, setCheckboxState] = useState(false)
  const navigation = useNavigation()

  function handleBack () {
    navigation.navigate('Users')
  }


  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      isAdmin: '',
    },
    onSubmit: async values => {
      await api.post(`users`, {
        values: {
          name: values.name,
          email: values.email,
          password: values.password,
          isAdmin: checkboxState
        }
      })

      Alert.alert('New User registed!', '', [
        { text: 'OK', onPress: () => handleBack() }
      ])
    }
  })

  return (
    <>
      <View style={styles.content}>
        <Header />
        <Text style={styles.title}>New User</Text>
        <View style={styles.editArea}>
          <Input
            label='Name'
            autoCapitalize='none'
            value={formik.values.name}
            onChangeText={formik.handleChange('name')}
          />
          <Input
            label='E-mail'
            autoCapitalize='none'
            value={formik.values.email}
            onChangeText={formik.handleChange('email')}
          />
           <Input
            label='Password'
            autoCapitalize='none'
            secureTextEntry
            value={formik.values.password}
            onChangeText={formik.handleChange('password')}
          />
          <View style={styles.checkbox}>
            <BouncyCheckbox
              size={20}
              values={checkboxState}
              fillColor='black'
              isChecked={checkboxState}
              onPress={() => setCheckboxState(!checkboxState)}
            />
            <Text style={styles.checkboxText}>Is Admin?</Text>
          </View>
        </View>
        <View style={styles.footer}>
          <Footer name='Register Now' action={formik.handleSubmit} />
        </View>
      </View>
    </>
  )
}
