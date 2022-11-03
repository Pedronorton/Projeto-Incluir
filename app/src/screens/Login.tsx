import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import DataService from '../service/DataService';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingRefreshToken, setIsLoadingRefreshToken] = useState(false);
    useEffect(() => {
        refreshToken();
    }, []);
    const dispatch = useDispatch();

    const refreshToken = async () => {
        try {
            setIsLoadingRefreshToken(true);
            const token = await AsyncStorage.getItem('@refreshToken');
            console.log(token);

            const data = {
                refreshToken: token
            };
            const response = await DataService.refreshToken(data);
            console.log(response);

            await AsyncStorage.setItem('@refreshToken', response.data.refreshToken);
            await AsyncStorage.setItem('@token', response.data.accessToken);
            navigation.navigate('QRCode');
        } catch (e) {
            console.log(e);
        }
        setIsLoadingRefreshToken(false);
    };
    const handleLogin = async () => {
        try {
            const data = {
                username: email,
                password: password
            };
            const response = await DataService.login(data);
            dispatch({ type: 'SET_USER', payload: { id: response.data.id, isAuth: true, name: response.data.name } });

            try {
                await AsyncStorage.setItem('@refreshToken', response.data.refreshToken);
                await AsyncStorage.setItem('@token', response.data.token);
                await AsyncStorage.setItem('@username', response.data.username);
                navigation.navigate('QRCode');
            } catch (e) {
                // saving error
            }
        } catch (e) {
            console.log(e);

            Alert.alert('erro');
        }
    };

    const handleChangeRoute = (route) => {
        console.log('aqui');

        navigation.navigate(route);
    };

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            {isLoading == true && (
                <>
                    <ActivityIndicator />
                </>
            )}
            {!isLoadingRefreshToken ? (
                <>
                    <View style={styles.inputView}>
                        <TextInput style={styles.TextInput} placeholder="Email." placeholderTextColor="#003f5c" onChangeText={(email) => setEmail(email)} />
                    </View>

                    <View style={styles.inputView}>
                        <TextInput style={styles.TextInput} placeholder="Password." placeholderTextColor="#003f5c" secureTextEntry={true} onChangeText={(password) => setPassword(password)} />
                    </View>

                    <TouchableOpacity>
                        <Text style={styles.forgot_button}>Esqueci minha senha</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
                        <Text>LOGIN</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.loginBtn}
                        onPress={() => {
                            handleChangeRoute('SignUp');
                        }}
                    >
                        <Text>Cadastrar</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <>
                    <ActivityIndicator />
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },

    image: {
        marginBottom: 40
    },

    inputView: {
        backgroundColor: '#FFC0CB',
        borderRadius: 30,
        width: '70%',
        height: 45,
        marginBottom: 20,

        alignItems: 'center'
    },

    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20
    },

    forgot_button: {
        height: 30,
        marginBottom: 30
    },

    loginBtn: {
        width: '80%',
        borderRadius: 25,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        backgroundColor: '#FF1493'
    }
});
