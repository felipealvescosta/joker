import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontFamily: 'Rokkitt_500Medium',
    marginTop: 10,
    fontSize: 40,
  },
  inputArea: {
    marginTop: 20,
    width: '90%',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    height: 50,
    width: '90%',
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttontext: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: 'Rokkitt_700Bold',
  },
  or: {
    fontSize: 20,
    fontFamily: 'Rokkitt_500Medium',
  },
  signUpButton: {
    height: 50,
    width: '85%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginBottom: 20,
  },
  signUpText: {
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: 'Rokkitt_700Bold',
  },
});

export default styles;
