import React from 'react';
import {View, ActivityIndicator, Text, StyleSheet} from 'react-native';
import {AuthRoutes} from './auth.routes';
import {AppRoutes} from './app.routes';

import {useAuth} from '../hooks/auth';

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {marginTop: 30},
});

const Router = () => {
  const {token, loadToken } = useAuth();

  if (loadToken) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color="#ccc" size="large" />
        <Text style={styles.text}>Carregando...</Text>
      </View>
    );
  }
  return token ? <AppRoutes /> : <AuthRoutes />;
};

export default function Routes() {
  return <Router />;
}
