import { createDrawerNavigator, DrawerItemList } from "@react-navigation/drawer";
import { Platform, View, SafeAreaView, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from "react-redux";

import Colors from "../constants/Colors";
import StackNavigator from './ProductsNavigator';
import OrdersNavigator from './OrdersNavigator';
import UserNavigator from "./UserNavigator";
import * as authActions from '../store/actions/auth';


const Drawer = createDrawerNavigator()

const DrawerNavigator = () => {
    const dispatch = useDispatch();

    return (
        <Drawer.Navigator
            drawerContent={props => {
                return (
                    <View style={{ flex: 1, paddingTop: 20 }}>
                        <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                            <DrawerItemList {...props} />
                            <Button
                                title="Logout"
                                color={Colors.primary}
                                onPress={() => {
                                    dispatch(authActions.logout());
                                }}
                            />
                        </SafeAreaView>
                    </View>
                )
            }}
        >
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