import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Devices from "./components/Devices";
import NewDevice from './components/NewDevice';
import State from "./components/State";
const Stack = createNativeStackNavigator();


export default function App() {
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
        name="new-device"
        component={NewDevice}/>
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

