import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  content: {
    flex: 1
  },
  title: {
    fontSize: 25,
    margin: 20,
    fontFamily: 'Rokkitt_400Regular'
  },
  load: {
    marginTop: '70%'
  },
  joke: {
    height: '60%',
    paddingTop: '50%'
  },
  textJoke: {
    margin: 20,

    fontSize: 27,
    fontFamily: 'Rokkitt_400Regular',
    textAlign: 'center'
  },
  buttonsArea: {
    justifyContent: 'flex-end',
    height: '30%'
  },
  buttonRate: {
    height: 45,
    width: '45%',
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonBack: {
    height: 45,
    width: '90%',
    margin: 20
  },
  buttonBackText: { 
    textAlign: 'center', 
    fontSize: 25,
    fontFamily: 'Rokkitt_400Regular'
  },
})
