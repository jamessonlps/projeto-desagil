import React from 'react';
import { StyleSheet, StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

/** PÁGINAS */
import Page1 from './view/Page1';
import Page2 from './view/Page2';

const Tab = createBottomTabNavigator();

export default function Main(props) {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen
                    name="Página 1" 
                    component={Page1} 
                />
                <Tab.Screen 
                    name="Página 2" 
                    component={Page2} 
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
