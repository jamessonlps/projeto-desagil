import React from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, StatusBar, Image } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
// import { setCustomText } from 'react-native-global-props';

/** PÁGINAS */
import InitialPage from './views/InitialPage';
import QRScan from './views/QRScan';
import PDFView from './components/PDFView';
import GeneralView from './views/GeneralView';
import SectorView from './views/SectorView';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
// const customTextProps = {
//     style: {
//         fontFamily: 'OpenSans-Regular'
//     }
// }

// setCustomText(customTextProps);

export default function Main(props) {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen 
                    component={InitialPage}
                    name="Home"
                    options={{
                        headerTitle: null,
                        headerTitleAlign: 'center',
                        headerBackground: backgroundConnect,
                        headerTitleStyle: {
                            color: "#fff"
                        }
                    }}>
                </Stack.Screen>
                <Stack.Screen 
                    name="QR Code Scanner" 
                    component={QRScan} 
                    options={{ 
                        title: null, 
                        headerTitleAlign: 'center', 
                        headerBackground: backgroundConnect,
                        headerTintColor: "#fff"
                    }}
                />
                <Stack.Screen 
                    name="PDFView" 
                    component={PDFView} 
                    options={{
                        title: null,
                        headerTitleAlign: 'center',
                        headerBackground: backgroundConnect,
                        headerTintColor: "#fff"
                    }}
                />
                <Stack.Screen 
                    name="GeneralView"
                    component={GeneralView}
                    options={{
                        title: null,
                        headerBackground: backgroundConnect,
                        headerTintColor: "#fff"
                    }}
                />
                <Stack.Screen 
                    name="SectorView"
                    component={SectorView}
                    options={{
                        title: null,
                        headerBackground: backgroundConnect,
                        headerTintColor: "#fff"
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const backgroundConnect = () => 
    <LinearGradient
        colors={[ "#2D2A9B", "#2385A2"]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={{flex: 1}}>
            <Image style={{width: 230, height: 60, alignSelf: 'center', marginTop: StatusBar.currentHeight}} source={require("./connection/connectdata_marca_4_1.png")}/>
    </LinearGradient>