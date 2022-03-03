import React, { useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';

import Colors from "../constants/Colors";
import * as authActions from "../store/actions/auth"

const StartupScreen = props => {
    const dispatch = useDispatch();

    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData');
            if (!userData) {
                props.navigation.navigate('Authenticate');
                return;
            }

            const data = JSON.parse(userData);
            const { token, userId, expiryTime } = data;
            const expirationDate = new Date(expiryTime);

            if (expirationDate <= new Date() || !token || !userId) {
                props.navigation.navigate('Authenticate');
                return;
            }

            const expirationTime = expirationDate.getTime() - new Date().getTime();

            dispatch(authActions.authenticate(token, userId, expirationTime));
        }

        tryLogin();
    }, [dispatch])

    return (
        <View style={styles.screen}>
            <ActivityIndicator size='large' color={Colors.primary} />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default StartupScreen;