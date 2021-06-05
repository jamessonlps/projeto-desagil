import React from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, StatusBar, Image } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

/** PÁGINAS */
import InitialPage from './view/InitialPage';
import QRScan from './view/QRScan';
import PDFView from './components/PDFView';
import GeneralView from './view/GeneralView';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function Main(props) {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen 
                    component={InitialPage}
                    name="Home"
                    options={{ 
                        headerTitleAlign: 'center'
                    }}>
                </Stack.Screen>
                <Stack.Screen 
                    name="QR Code Scanner" 
                    component={QRScan} 
                    options={{ headerTitleAlign: 'center' }}
                />
                <Stack.Screen 
                    name="PDFView" 
                    component={PDFView} 
                    options={{
                        headerTitleAlign: 'center'
                    }}
                />
                <Stack.Screen 
                    name="GeneralView"
                    component={GeneralView}
                    options={{
                        headerTitleAlign: 'center'
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
