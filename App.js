import 'react-native-gesture-handler'
import { StatusBar } from 'react-native'
import React, {useEffect, useState} from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

// pages
import HomeScreen from './src/screens/HomeScreen'
import LoginScreen from './src/screens/LoginScreen'
import RegisterScreen from './src/screens/RegisterScreen'
import AddScreen from './src/screens/AddScreen'
import UpdateScreen from './src/screens/UpdateScreen'
import AllTransactions from './src/screens/AllTransactions'
import ProfileScreen from './src/screens/ProfileScreen'
import HelpScreen from './src/screens/HelpScreen'
import SplashScreen from './src/screens/SplashScreen'
import TransactionScreen from './src/screens/TransactionScreen'
import CategoryScreen from './src/screens/CategoryScreen'

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
        <Stack.Screen name='Transaction' component={TransactionScreen} />
        <Stack.Screen name='Category' component={CategoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
