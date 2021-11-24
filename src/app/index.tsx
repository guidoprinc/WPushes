import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { useDispatch } from 'react-redux';
import AppNavigator from '@components/AppNavigator';
import { actionCreators as AuthActions } from '@redux/auth/actions';
import { pushNotificationConfig, registerAppWithFCM } from '@config/notifications';

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
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          Alert.alert('FCM received from initial: ', JSON.stringify(remoteMessage));
          // TODO add other functionality
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
