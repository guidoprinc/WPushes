import React, { memo } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { sendLocalNotifications } from '@config/notifications';

import styles from './styles';

function Home() {

  const handlePress = () => sendLocalNotifications();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress} style={styles.button}>
          <Text style={styles.buttonText}>Send Local Notification</Text>
      </TouchableOpacity>
    </View>
  );
}

export default memo(Home);
