import 'react-native-gesture-handler'
import { StatusBar } from 'react-native'
import React, {useEffect, useState} from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

// pages
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import AddScreen from './screens/AddScreen'
import UpdateScreen from './screens/UpdateScreen'
import AllTransactions from './screens/AllTransactions'
import ProfileScreen from './screens/ProfileScreen'
import HelpScreen from './screens/HelpScreen'
import SplashScreen from './screens/SplashScreen'

const Stack = createStackNavigator()

export default function App() {
  const globalScreenOptions = {
    headerStyle: {
      backgroundColor: '#fff',
      // backgroundColor: '#51A3B1',
    },
    headerTitleStyle: {
      color: '#000000',
    },
    headerTintColor: 'black',
  }
  return (
    <NavigationContainer>
      <StatusBar style='dark' />
      <Stack.Navigator initialRouteName='Splash' screenOptions={globalScreenOptions}>
      <Stack.Screen name='Splash' component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Register' component={RegisterScreen} />
        <Stack.Screen name='Home' component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Add' component={AddScreen} />
        <Stack.Screen name='Update' component={UpdateScreen} />
        <Stack.Screen name='All' component={AllTransactions} />
        <Stack.Screen name='Profile' component={ProfileScreen}  />
        <Stack.Screen name='Help' component={HelpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
