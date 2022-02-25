import { createDrawerNavigator } from "@react-navigation/drawer";
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import StackNavigator from './ProductsNavigator';
import OrdersNavigator from './OrdersNavigator';
import UserNavigator from "./UserNavigator";

const Drawer = createDrawerNavigator()

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen
                name="Products"
                component={StackNavigator}
                options={{
                    headerShown: false,
                    drawerIcon: drawerConfig => (
                        <Ionicons
                            name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                            size={23}
                            color={drawerConfig.tintColor}
                        />
                    )
                }}
            />
            <Drawer.Screen name="Order" component={OrdersNavigator} options={(navData) => ({
                headerShown: false,
                drawerIcon: drawerConfig => (
                    <Ionicons
                        name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
                        size={23}
                        color={drawerConfig.tintColor}
                    />
                )
            })} />
            <Drawer.Screen name="Admin" component={UserNavigator} options={{
                headerShown: false,
                drawerIcon: drawerConfig => (
                    <Ionicons
                        name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                        size={23}
                        color={drawerConfig.tintColor}
                    />
                )
            }} />
        </Drawer.Navigator>
    )
}

export default DrawerNavigator