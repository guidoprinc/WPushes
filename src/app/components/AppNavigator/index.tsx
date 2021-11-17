import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer, NavigationState } from '@react-navigation/native';
import { navigationRef, getActiveRoute, getRoute } from '@navigationHelper';
import CustomStatusBar from '@components/CustomStatusBar';
import withLoadable from '@components/Loadable';
import { Nullable } from '@interfaces/globalInterfaces';
import { State } from '@interfaces/reduxInterfaces';

import Navigator from './navigator';

const AppNavigator = () => {
  const [routeName, setRouteName] = useState<Nullable<string>>(null);

  const onStateChange = (state?: NavigationState) => {
    const previousRouteName = routeName;
    const currentRouteName = getRoute(state).name;
    if (previousRouteName !== currentRouteName) {
      setRouteName(currentRouteName);
    }
  };

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        setRouteName(getActiveRoute().name);
      }}
      onStateChange={onStateChange}>
      <CustomStatusBar routeName={routeName} />
      <Navigator />
    </NavigationContainer>
  );
};

export default withLoadable(() => useSelector((state: State) => state.auth.initialLoading))(AppNavigator);
