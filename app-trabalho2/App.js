import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from "./src/components/screen/Home";
import Administrador from "./src/components/screen/Administrador"
import Usuario from "./src/components/screen/Usuario";
import Login from "./src/components/screen/Login";

const Stack = createStackNavigator();

export default function App() {
  return(
    <NavigationContainer>
    <Stack.Navigator
       screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Login" component={Login}/>
      <Stack.Screen name="Usuario" component={Usuario}/>
      <Stack.Screen name="Administrador" component={Administrador}/>
    
    </Stack.Navigator>
  </NavigationContainer>
  )
}

