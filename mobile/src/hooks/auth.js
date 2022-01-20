import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../services/api';

const tokenStorage = '@joker:token';

const AuthContext = createContext();

export default function AuthProvider({children}) {
  const [data, setData] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadToken, setLoadToken] = useState(true);

  async function signIn(values) {
    const {email, password} = values;
    setLoading(true);
    try {
      const response = await api.post('/login', {
        email,
        password,
      });
      setData(response.data)
      setToken(response?.data.token);
      api.defaults.headers.Authorization = `Baerer ${response.data.token}`;
      await AsyncStorage.setItem(tokenStorage, response.data.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('Error:', error);
      Alert.alert('Email or Password is incorrect!');
    }
  }

  async function signOut() {
    await AsyncStorage.removeItem(tokenStorage);
    setToken(null);
  }

  async function loadData() {
    const data = await AsyncStorage.getItem(tokenStorage);

    if (data) {
      api.defaults.headers.Authorization = `Baerer ${data.token}`;
      setToken(data.token);
      setLoadToken(false);
    } else {
      console.log('Token dont exist!');
      setToken(null);
      setLoadToken(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <AuthContext.Provider value={{signIn, signOut, token, loading, loadToken, data, setData}}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export {useAuth};
