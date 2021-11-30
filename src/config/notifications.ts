import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import messaging from '@react-native-firebase/messaging';
import PushNotification, { ReceivedNotification } from 'react-native-push-notification';
import { isIos } from '@constants/platform';
import {
  NOTIFICATION_CHANNEL_ID,
  NOTIFICATION_CHANNEL_NAME,
  NOTIFICATION_CHANNEL_DESCRIPT
} from '@constants/notifications';

let lastId = 0;

export interface Notification {
  id: number;
  title: string;
  message: string;
  createdAt: string;
}

export const getFirebaseToken = async () => {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  debugger;
  if (!fcmToken) {
    fcmToken = await messaging().getToken();
    if (fcmToken) {
      await AsyncStorage.setItem('fcmToken', fcmToken);
    }
  }
  return fcmToken;
};

export const deleteFirebaseToken = async () => {
  await AsyncStorage.removeItem('fcmToken');
};

export const requestPermission = () =>
  messaging()
    .requestPermission()
    .then(() => {
      getFirebaseToken();
    })
    .catch(() => {
      // Handle permission rejections here
      console.log('Error with permissions');
    });

export const checkPermission = async () => {
  const enabled = await messaging().hasPermission();
  if (enabled) {
    getFirebaseToken();
  } else {
    requestPermission();
  }
};

export const registerAppWithFCM = async () => {
  await messaging().registerDeviceForRemoteMessages();
  checkPermission();
};

export const pushNotificationConfig = () => {

  PushNotification.configure({
    onNotification: (notification: Omit<ReceivedNotification, 'userInfo'>) => {
      if (!notification.foreground || (isIos && notification.foreground)) {
        if (isIos) PushNotificationIOS.setApplicationIconBadgeNumber(0);
        PushNotification.cancelAllLocalNotifications();
      }
    },
    permissions: {
      alert: true,
      badge: true,
      sound: true
    },
    popInitialNotification: true,
    requestPermissions: true
  });

  PushNotification.createChannel({
    channelId: NOTIFICATION_CHANNEL_ID,
    channelName: NOTIFICATION_CHANNEL_NAME,
    channelDescription: NOTIFICATION_CHANNEL_DESCRIPT
  }, (created) => console.log(`createChannel returned '${created}'`));

};

// TODO this make us able to send notifications locally
export const setLocalNotifications = (title?: string, message?: string) => {
  lastId++;
  PushNotification.localNotification({
    id: `${lastId}`,
    autoCancel: true,
    vibration: 100,
    ongoing: false,
    title: title || 'Local Notification',
    message: message || 'This is the Local Notification message example',
    playSound: false,
    soundName: 'default',
    channelId: NOTIFICATION_CHANNEL_ID
  });
};
