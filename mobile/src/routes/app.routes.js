import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {Home} from '../screens/Home/home.screen';
import {Users} from '../screens/Users/users.screen';
import {User} from '../screens/User/user.screen';

const Stack = createStackNavigator();


export function AppRoutes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Users"
          component={Users}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="User"
          component={User}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
