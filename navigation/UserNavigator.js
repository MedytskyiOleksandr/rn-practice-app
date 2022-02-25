import { createStackNavigator } from "@react-navigation/stack";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Platform } from 'react-native';

import CustomHeaderButton from '../components/UI/HeaderButton';
import Colors from '../constants/Colors';

import EditProductScreen from "../screens/user/EditProductScreen"
import UserProductsScreen from "../screens/user/UserProductsScreen";

const Stack = createStackNavigator();

const UserNavigator = () => {
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
                headerBackTitle: {
                    fontFamily: 'open-sans'
                }
            }}
        >
            <Stack.Screen name="Your Products" component={UserProductsScreen} options={(navData) => ({
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
                ),
                headerRight: () => (
                    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                        <Item
                            title="Add"
                            iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                            onPress={() => {
                                navData.navigation.navigate('Edit Product', {productId: null});
                            }}
                        />
                    </HeaderButtons>
                )
            })} />
            <Stack.Screen name="Edit Product" component={EditProductScreen} options={(navData) => ({
                headerTitle: navData.route.params.productId ? 'Edit Product' : 'Add Product',
                headerRight: () => (
                    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                        <Item
                            title="Save"
                            iconName={
                                Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
                            }
                            onPress={navData.route.params && navData.route.params.submit}
                        />
                    </HeaderButtons>
                )
            })} />
        </Stack.Navigator>
    )
};

export default UserNavigator;