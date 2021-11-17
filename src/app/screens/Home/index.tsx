import React, {memo } from 'react';
import { View } from 'react-native';
import CustomText from '@components/CustomText';

import styles from './styles';

function Home() {
  return (
    <View style={styles.container}>
      <CustomText style={styles.home}>WPushes</CustomText>
    </View>
  );
}

export default memo(Home);
