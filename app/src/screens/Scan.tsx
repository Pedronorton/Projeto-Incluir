import React, { useState, useEffect } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Text, StyleSheet, Button, TouchableOpacity, Linking, Alert } from 'react-native';
import { IStackScreenProps } from '../library/IStackScreenProps';
import { IQRCodePayload } from '../library/IQRCodePayload';
import DataService from '../service/DataService.js';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ScanScreen: React.FunctionComponent<IStackScreenProps> = (props) => {
    const [loading, setLoading] = useState(true);
    const [scanData, setScanData] = useState<IQRCodePayload>();
    const [permission, setPermission] = useState(true);
    const [link, setLink] = useState('');
    const user = useSelector((states) => states);
    useEffect(() => {
        requestCameraPermission();
    }, []);

    useEffect(() => {
        irParaLink();
    }, [link]);

    const irParaLink = async () => {
        const supported = await Linking.canOpenURL(link);
        const splitLink = link.split('-');
        const idQRCode = splitLink[0];
        const idClazz = splitLink[1];

        const data = {
            idAula: idClazz,
            idUser: user.id,
            idQRCode: idQRCode
        };

        try {
            const token = await AsyncStorage.getItem('@token');

            const response = await DataService.postPresence(data, {
                headers: {
                    Authorization: token
                }
            });

            Alert.alert('Presença confirmada com sucesso');
        } catch (e) {
            console.log('Testando erro');
            console.log(e.response);

            Alert.alert('Falha ao marcar presenca');
        }
        // await Linking.openURL(url);
        // } else {
        //     Alert.alert(`Don't know how to open this URL: ${link}`);
        // }
    };

    const requestCameraPermission = async () => {
        try {
            const { status, granted } = await BarCodeScanner.requestPermissionsAsync();
            console.log(`Status: ${status}, Granted: ${granted}`);

            if (status === 'granted') {
                console.log('Access granted');
                setPermission(true);
            } else {
                setPermission(false);
            }
        } catch (error) {
            console.error(error);
            setPermission(false);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Text>Requesting permission ...</Text>;

    if (scanData) {
        return (
            <>
                <Text style={styles.text}>Name: {scanData.name}</Text>
                <Text style={styles.text}>Number: {scanData.number}</Text>
                <Button title="Scan Again" onPress={() => setScanData(undefined)}>
                    Scan Again
                </Button>
            </>
        );
    }

    if (permission) {
        return (
            <>
                <BarCodeScanner
                    style={[styles.container]}
                    onBarCodeScanned={({ type, data }) => {
                        try {
                            // let _data = JSON.parse(data);
                            setLink(data);
                        } catch (error) {
                            console.error('Unable to parse string: ', error);
                        }
                    }}
                >
                    {/* <Text style={styles.text}>Scan</Text> */}
                </BarCodeScanner>
            </>
        );
    } else {
        return <Text style={styles.textError}>Permission rejected.</Text>;
    }
};

export default ScanScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        marginTop: 15,
        backgroundColor: 'white'
    },
    textError: {
        color: 'red'
    }
});
