import React from 'react';
import 'react-native-gesture-handler';
import { StatusBar, Image } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';

/** PÁGINAS */
import InitialPage from './views/InitialPage';
import QRScan from './views/QRScan';
import PDFView from './components/PDFView';
import GeneralView from './views/GeneralView';
import SectorView from './views/SectorView';
import DocumentsList from './views/DocumentsList';
import SectorsList from './views/SectorsList';
import Login from './views/Login';
import CommentsView from './views/CommentsView';
import ResolvedComments from './views/ResolvedComments';


const Stack = createStackNavigator();

export default function Main(props) {

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="InitialPage">
                <Stack.Screen 
                    component={Login}
                    name="Login"
                    options={{
                        headerShown: false
                    }}>
                </Stack.Screen>
                <Stack.Screen 
                    component={InitialPage}
                    name="InitialPage"
                    options={{
                        headerTitle: null,
                        headerTitleAlign: 'center',
                        headerBackground: backgroundConnect,
                        headerTintColor: '#fff',
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
                <Stack.Screen 
                    name="CommentsView"
                    component={CommentsView}
                    options={{
                        title: null,
                        headerBackground: backgroundConnect,
                        headerTintColor: "#fff"
                    }}
                />
                <Stack.Screen 
                    name="ResolvedComments"
                    component={ResolvedComments}
                    options={{
                        title: null,
                        headerBackground: backgroundConnect,
                        headerTintColor: "#fff"
                    }}
                />
                <Stack.Screen 
                    component={DocumentsList}
                    name="DocumentsList"
                    options={{
                        headerTitle: null,
                        headerTitleAlign: 'center',
                        headerBackground: backgroundConnect,
                        headerTintColor: "#fff"
                    }}>
                </Stack.Screen>
                <Stack.Screen 
                    component={SectorsList}
                    name="SectorsList"
                    options={{
                        headerTitle: null,
                        headerTitleAlign: 'center',
                        headerBackground: backgroundConnect,
                        headerTintColor: "#fff"
                    }}>
                </Stack.Screen>
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