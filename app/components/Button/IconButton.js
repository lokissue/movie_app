import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './_styles.module.scss';

const IconButton = ({
  style,
  onPress,
  iconName,
  iconSize = 24,
  iconColor = '#000',
}) => {
  return (
    <TouchableOpacity
      style={[styles.icon_button, style]}
      onPress={onPress}
      activeOpacity={0.8}>
      <Icon name={iconName} size={iconSize} color={iconColor} />
    </TouchableOpacity>
  );
};

export default IconButton;
