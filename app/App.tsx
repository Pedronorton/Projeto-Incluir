import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import QRCodeScreen from './src/screens/QRCode';
import Login from './src/screens/Login';
import ScanScreen from './src/screens/Scan';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import SignUp from './src/screens/SignUp';

const Stack = createStackNavigator();

const Application = () => {
    const [auth, setAuth] = useState(false);

    useEffect(() => {
        fetchStorageData();
    }, []);

    const fetchStorageData = async () => {
        try {
            const storageToken = await AsyncStorage.getItem('@token');
            const storageMail = await AsyncStorage.getItem('@userMail');
            console.log('fetch');

            if (storageToken !== null && storageMail != null) {
                console.log('entrou');
            } else {
                setAuth(true);
                console.log('erro ao logar');
            }
        } catch (e) {
            console.log('erro ao logar');
        }
    };
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name={'Login'} component={Login} />
                <Stack.Screen name={'QRCode'} component={QRCodeScreen} />
                <Stack.Screen name={'SignUp'} component={SignUp} />
                <Stack.Screen name={'Scan'} component={ScanScreen} />
            </Stack.Navigator>
            <StatusBar style="auto" />
        </NavigationContainer>
    );
};

export default Application;
