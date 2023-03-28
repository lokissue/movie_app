import React from 'react';
import {Text, View} from 'react-native';
import styles from './styles.scss';

const BlueText = () => {
  return <Text className={styles.blue}>Blue Text</Text>;
};

export default function App() {
  return (
    <View style={styles.container}>
      <BlueText />
    </View>
  );
}
