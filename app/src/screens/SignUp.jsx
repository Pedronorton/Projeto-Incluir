import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import DataService from '../service/DataService';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    const [password, setPassword] = useState('');
    const [responsibility, setResponsibility] = useState('');
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingRefreshToken, setIsLoadingRefreshToken] = useState(false);

    const handleCreate = async () => {
        try {
            const data = {
                name: name,
                function: responsibility,
                username: email,
                password: password
            };
            const response = await DataService.signUp(data);
            try {
                await AsyncStorage.setItem('@refreshToken', response.data.refreshToken);
                await AsyncStorage.setItem('@token', response.data.token);
                await AsyncStorage.setItem('@username', response.data.username);
                Alert.alert('Usuário criado com sucesso');
                navigation.navigate('QRCode');
                dispatch({ type: 'LOGIN', payload: true });
            } catch (e) {
                // saving error
            }
        } catch (e) {
            console.log(e);

            Alert.alert('erro');
        }
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
                        <TextInput style={styles.TextInput} placeholder="Nome." placeholderTextColor="#003f5c" onChangeText={(name) => setName(name)} />
                    </View>

                    <View style={styles.inputView}>
                        <TextInput style={styles.TextInput} placeholder="Password." placeholderTextColor="#003f5c" secureTextEntry={true} onChangeText={(password) => setPassword(password)} />
                    </View>
                    <View style={styles.inputView}>
                        <TextInput style={styles.TextInput} placeholder="Cargo." placeholderTextColor="#003f5c" onChangeText={(responsibility) => setResponsibility(responsibility)} />
                    </View>

                    <TouchableOpacity style={styles.loginBtn} onPress={handleCreate}>
                        <Text>Criar</Text>
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
