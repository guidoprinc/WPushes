import { StackNavigationOptions } from '@react-navigation/stack';
import i18next from 'i18next';
import Routes from '@constants/routes';
import { blue, white } from '@constants/colors';
import statusBarConfig from '@constants/statusBar';
import { Navigation } from '@interfaces/navigation';


// Default nav options for all screens
const defaultNavOptions = ({ route }: Navigation) => ({
    // Change screen title from i18n traslates files
    headerTitle: i18next.t(`app:${route.name}`),
    // TODO: The following options are examples. Change them to your need
    headerStyle: {
      backgroundColor: blue
    },
    headerBackTitleStyle: {
      color: white
    },
    headerTitleStyle: {
      color: white
    },
    headerTintColor: white
});

export const appStackNavConfig = {
  screenOptions: defaultNavOptions
};

// Default nav options for all screens
export const appScreensNavOptions: Partial<Record<Routes, StackNavigationOptions>> = {
  // TODO: Add here the screens nav options that changes with respect to
  // the default ones defined in defaultNavOptions, for example...
  [Routes.Home]: {
    headerTitle: 'WPushes'
  }
};

export const statusBarStyles = {
  // TODO: Change these styles to customize the status bar
  [Routes.Home]: statusBarConfig.blueStatusBar,
  default: statusBarConfig.transparentStatusBar
};
