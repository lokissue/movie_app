import React from 'react';
import {TouchableOpacity, Text, ActivityIndicator} from 'react-native';

import styles from './_styles.module.scss';

const TextButton = ({style, title, onPress, textStyle, loading}) => {
  return (
    <TouchableOpacity
      style={[styles.text_button, style]}
      onPress={onPress}
      disabled={loading}
      activeOpacity={0.75}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Text style={[styles.text_button_title, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default TextButton;
