import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import PokeListScreen from "./src/screens/PokeListScreen";
import PokeSearchResults from "./src/screens/PokeSearchResults";
import PokeDataScreen from "./src/screens/PokeDataScreen"

//creacion de nuestra navegacion basadas en stack (pilas)
const Stack = createStackNavigator(); 

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Lista de Pokemos">
        <Stack.Screen name="Lista de Pokemos" component={PokeListScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Results Search" component={PokeSearchResults}/>
        <Stack.Screen name="Data Pokemon" component={PokeDataScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

