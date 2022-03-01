import { createStackNavigator } from "@react-navigation/stack"
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Platform } from 'react-native';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen"
import Colors from '../constants/Colors';
import CustomHeaderButton from '../components/UI/HeaderButton';

const Stack = createStackNavigator()

const ProductsNavigator = () => {
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
            <Stack.Screen name="All Products" component={ProductsOverviewScreen} options={(navData) => ({
                headerRight: () => (
                    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                        <Item
                            title="Cart"
                            iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                            onPress={() => {
                                navData.navigation.navigate('Cart')
                            }}
                        />
                    </HeaderButtons>
                ),
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
            <Stack.Screen
                name="Product Details"
                component={ProductDetailScreen}
                options={(navData) => ({
                    title: navData.route.params.productTitle,
                    headerBackTitle: "Back"
                })} />
            <Stack.Screen name="Cart" component={CartScreen} />
        </Stack.Navigator >
    );
}

export default ProductsNavigator;
