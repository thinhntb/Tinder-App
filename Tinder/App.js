import React from 'react';
import {View, Text} from 'react-native';
import Main from './src/features/MainScreen/mainScreen';
import likeUser from './src/features/MainScreen/likeUserScreen/likeUser';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{
          // headerShown: false,
          animation:'none',
        }}>
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="LikeUser" component={likeUser} />
      </Stack.Navigator>
    </NavigationContainer>
    // <Main/>
    // <LikeUser/>
  );
};

export default App;
