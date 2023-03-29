import React, {useEffect, useRef, useState} from 'react';
import {Image as RNImage, Animated, View} from 'react-native';
import PlaceHolder from '../../../asset/placehoder.jpeg';

const Image = props => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [loading, setLoading] = useState(true);

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.Image
      {...props}
      style={[props.style, {opacity: loading ? fadeAnim : 1}]}
      defaultSource={PlaceHolder}
      onLoadEnd={() => {
        setLoading(false);
        fadeIn();
      }}
    />
  );
};

export default Image;
