import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { useDispatch } from 'react-redux';
import AppNavigator from '@components/AppNavigator';
import { actionCreators as AuthActions } from '@redux/auth/actions';
import { pushNotificationConfig, registerAppWithFCM, sendLocalNotifications } from '@config/notifications';

import './i18n';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Here we can handle when we receive a notification from background. ', remoteMessage);
});

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    pushNotificationConfig();
    registerAppWithFCM();
    dispatch(AuthActions.init());
  }, [dispatch]);

  useEffect(() => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      // You can add new functionality
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          Alert.alert('FCM received from initial: ', JSON.stringify(remoteMessage));
          // You can add other functionality here
        }
      });
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('FCM received: ', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);


  return <AppNavigator />;
};


export default App;
