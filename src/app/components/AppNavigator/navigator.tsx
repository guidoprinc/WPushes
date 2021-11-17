import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Routes from '@constants/routes';
import { RoutesParamList } from '@constants/routesParamList';
import {appStackNavConfig} from '@config/navigation';
import { inferRoute } from '@utils/navUtils';
import Home from '@screens/Home';

const Stack = createStackNavigator<RoutesParamList>();

function AppStack() {
  return <>{inferRoute(Stack)(Routes.Home,Home)}</>;
}

const Navigator = () => {
  return <Stack.Navigator {...appStackNavConfig}>{AppStack()}</Stack.Navigator>;
};

export default Navigator;
