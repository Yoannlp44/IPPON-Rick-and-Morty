import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import Home from '../containers/HomePage/HomePage';
import CharacterPage from '../containers/CharacterPage/CharacterPage';

const Stack = createStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <StatusBar style="auto" />
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="CharacterPage" component={CharacterPage} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigation;