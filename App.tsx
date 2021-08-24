import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Devices from "./components/Devices";
import NewDevice from './components/NewDevice';
import State from "./components/State";
import { useFonts } from 'expo-font';
import FullDevice from './components/FullDevice';
import Device from './components/Device';
import BlueTooth from "./components/Bluetooth";
import SameDevice from "./components/SameDevice";
const Stack = createNativeStackNavigator();

export default function App() {
  const [loaded] = useFonts({
    Montserrat: require('./assets/fonts/Montserrat-Medium.ttf'),
  });

  if (!loaded) return null;
  return (
    
    <NavigationContainer >
      <StatusBar/>
      <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen
        name="state"
        component={State}/>
        <Stack.Screen 
        name="signup"
        component={SignUp}/>
        <Stack.Screen 
        name="login"
        component={Login}/>
        <Stack.Screen  
        name="devices"
        component={Devices}/>
        <Stack.Screen
        name="device"
        component={Device}/>
        <Stack.Screen
        name="new-device"
        component={NewDevice}/>
        <Stack.Screen
        name="full-device"
        component={FullDevice}/>
        <Stack.Screen name="bluetooth"
        component={BlueTooth}/>
      <Stack.Screen name="same-device"
      component={SameDevice}/>
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

