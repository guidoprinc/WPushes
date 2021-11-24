import React, {memo } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { setLocalNotifications } from '@config/notifications';

import styles from './styles';

function Home() {

  const handlePress = () => setLocalNotifications();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress} style={styles.button}>
          <Text style={styles.buttonText}>Local Notification</Text>
      </TouchableOpacity>
    </View>
  );
}

export default memo(Home);
