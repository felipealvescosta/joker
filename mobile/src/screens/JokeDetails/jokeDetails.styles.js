import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  content: {
    flex: 1
  },
  panel: {
    fontSize: 20,
    margin: 20,
    fontFamily: 'Rokkitt_400Regular',
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
    height: '23%',
  },
  textJoke: {
    margin: 20,
    fontSize: 22,
    fontFamily: 'Rokkitt_400Regular',
    textAlign: 'center'
  },
  voteArea:{
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: '20%',
  },
  votes:{
    alignItems: 'center',
  },
  textVote: {
    fontFamily: 'Rokkitt_400Regular',
    fontSize: 20,
    marginBottom: 10,
  },
  evaluators: {
    fontFamily: 'Rokkitt_400Regular',
    fontSize: 20,

    margin: 20,
  },
  areaEvaluators: {
    height: '35%'
  },
  buttonArea: {
    justifyContent: 'flex-end',
    bottom: 50,
  },
  buttonBack: {
    height: 45,
    width: '90%',
    marginLeft: 20,
  },
  buttonBackText: { 
    textAlign: 'center', 
    fontSize: 25,
    fontFamily: 'Rokkitt_400Regular',
  },
})
