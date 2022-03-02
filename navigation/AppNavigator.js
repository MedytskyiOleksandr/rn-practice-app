import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import DrawerNavigator from './DrawerNavigator';
import AuthNavigator from './AuthNavigation';

const AppNavigator = props => {
  const isAuth = useSelector(state => !!state.auth.token);

  return (
    <NavigationContainer>
      {isAuth && <DrawerNavigator />}
      {!isAuth && <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
