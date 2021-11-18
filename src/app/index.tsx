import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { useDispatch } from 'react-redux';
import AppNavigator from '@components/AppNavigator';
import { actionCreators as AuthActions } from '@redux/auth/actions';
import { pushNotificationConfig } from '@config/notifications';

import './i18n';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    pushNotificationConfig();
    dispatch(AuthActions.init());
  }, [dispatch]);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);


  return <AppNavigator />;
};


export default App;
