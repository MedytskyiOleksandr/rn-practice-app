import { Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import Colors from "../constants/Colors";
import AuthScreen from "../screens/user/AuthScreen";

const Stack = createStackNavigator()

const AuthNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
                },
                headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
                headerTitleStyle: {
                    fontFamily: 'open-sans-bold'
                },
                headerBackTitleStyle: {
                    fontFamily: 'open-sans'
                },
                headerBackTitle: "Back"
            }}
        >
            <Stack.Screen name="Authenticate" component={AuthScreen} />
        </Stack.Navigator>
    );
}

export default AuthNavigator;