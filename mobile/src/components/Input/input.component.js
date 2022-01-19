import React from 'react'
import { Text, TextInput, StyleSheet } from 'react-native'

export function Input ({ label, ...rest }) {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input} {...rest} />
    </>
  )
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 10,
    fontSize: 20,
    fontFamily: 'Rokkitt_400Regular',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    fontSize: 18,
    color: '#444',
    height: 44,
    marginBottom: 15,
    fontFamily: 'Rokkitt_500Medium'
  }
})
