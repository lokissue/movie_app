import React, {useRef, useState} from 'react';
import {Image as RNImage, Animated} from 'react-native';
import fallbackImg from '@utils/fallbackImg';

const Image = props => {
  const {source} = props;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [loading, setLoading] = useState(true);

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  if (source?.uri === 'N/A') {
    source.uri = fallbackImg;
  }

  return (
    <Animated.Image
      {...props}
      source={source}
      style={[props.style, {opacity: loading ? fadeAnim : 1}]}
      defaultSource={{uri: fallbackImg}}
      onLoadEnd={() => {
        setLoading(false);
        fadeIn();
      }}
      onError={e => (e.currentTarget.source = {uri: fallbackImg})}
    />
  );
};

export default Image;
