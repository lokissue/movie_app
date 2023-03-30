import React from 'react';
import {Pressable, Text, ActivityIndicator} from 'react-native';

import styles from './_styles.module.scss';

const TextButton = ({style, title, onPress, textStyle, loading}) => {
  return (
    <Pressable
      style={[styles.text_button, style]}
      onPress={onPress}
      disabled={loading}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Text style={[styles.text_button_title, textStyle]}>{title}</Text>
      )}
    </Pressable>
  );
};

export default TextButton;
