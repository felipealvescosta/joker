import React, { useState } from 'react'
import { Text, View, Alert, TouchableOpacity } from 'react-native'
import { useFormik } from 'formik'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { useNavigation } from '@react-navigation/native'

import { useAuth } from '../../hooks/auth'

import api from '../../services/api'

import { Header } from '../../components/Header/header.component'
import { Input } from '../../components/Input/input.component'
import { Footer } from '../../components/Footer/footer.component'

import { styles } from './user.styles'

export function User ({ route }) {
  const { item: user } = route.params
  const { data } = useAuth()
  const {id} = data.user;
  const [checkboxState, setCheckboxState] = useState(user.isAdmin)
  const navigation = useNavigation()

  function handleBack () {
    navigation.navigate('Users')
  }

  function handleDeleteUser () {
    Alert.alert('Delete user?', '', [
      {
        text: 'Cancel',
        onPress: () => handleBack(),
        style: 'cancel'
      },
      { 
        text: 'Yes', 
        onPress: () => onDeleteUser(), 
      }
    ])
  }

  async function onDeleteUser () {
    if(user.id == id){
      Alert.alert('You cannot remove yourself!', '', [
        { text: 'Back', onPress: () => {} }
      ])
      return
    }
    await api.delete(`users/${user.id}`);
    Alert.alert('User Deleted!', '', [
      { text: 'Ok', onPress: () => handleBack() }
    ])
  }

  const formik = useFormik({
    initialValues: {
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    },
    onSubmit: async values => {
      await api.put(`users/${user.id}`, {
        values: {
          name: values.name,
          email: values.email,
          isAdmin: checkboxState
        }
      })

      Alert.alert('User Edited!', '', [
        { text: 'OK', onPress: () => handleBack() }
      ])
    }
  })

  return (
    <>
      <View style={styles.content}>
        <Header />
        <Text style={styles.title}>Edit User</Text>
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
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDeleteUser()}
          >
            <Text style={styles.deleteText}>Delete User</Text>
          </TouchableOpacity>
          <Footer name='Edit User' action={formik.handleSubmit} />
        </View>
      </View>
    </>
  )
}
