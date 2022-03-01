import { createStackNavigator } from "@react-navigation/stack";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Platform } from 'react-native';

import CustomHeaderButton from '../components/UI/HeaderButton';
import Colors from '../constants/Colors';


import OrdersScreen from "../screens/shop/OrdersScreen";

const Stack = createStackNavigator();

const OrederNavigator = () => {
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
            <Stack.Screen name="Orders" component={OrdersScreen} options={(navData) => ({
                headerLeft: () => (
                    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                        <Item
                            title="Menu"
                            iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                            onPress={() => {
                                navData.navigation.toggleDrawer();
                            }}
                        />
                    </HeaderButtons>
                )
            })} />
        </Stack.Navigator>
    )
};

export default OrederNavigator;