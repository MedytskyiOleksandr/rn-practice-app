import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Button, ActivityIndicator, View, StyleSheet, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import OrderItem from '../../components/shop/OrderItem';
import * as orderActions from '../../store/actions/orders';
import Colors from '../../constants/Colors';

const OrdersScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);

  const loadOrders = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(orderActions.fetchOrders());
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', loadOrders);

    return unsubscribe;
  }, [loadOrders])

  const orders = useSelector(state => state.orders.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    loadOrders()
  }, [dispatch, loadOrders])

  if (error) {
    return (
      <View style={styles.indicator}>
        <Text>An error occured!</Text>
        <View style={styles.button}>
          <Button title='Try Again' onPress={loadOrders} color={Colors.primary} />
        </View>

      </View>
    )
  }

  if (isLoading) {
    return (
      <View style={styles.indicator}>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    )
  }

  if (!isLoading && orders.length === 0) {
    return (
      <View style={styles.indicator}>
        <Text>No orders found!</Text>
      </View>
    )
  }

  return (
    <FlatList
      data={orders}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <OrderItem
          amount={itemData.item.totalAmount}
          date={itemData.item.readableDate}
          items={itemData.item.items}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  indicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginVertical: 10
  }
})

export default OrdersScreen;
