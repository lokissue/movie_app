import React from 'react';
import {Text, View, Image as RNImage, Pressable} from 'react-native';
import Image from '@components/Image';

import styles from './_style.module.scss';

const MovieCard = ({data, onPress, style}) => {
  const {Poster, Title, Type, Year, imdbID} = data;

  if (data.empty) {
    return <View style={styles.card}></View>;
  }

  return (
    <>
      <Pressable style={[styles.card, style]} onPress={onPress}>
        <Image src={Poster} resizeMode={'cover'} style={styles.cover} />
        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
            {Title}
          </Text>
          <Text style={styles.year} numberOfLines={1} ellipsizeMode="tail">
            {Year}
          </Text>
        </View>
      </Pressable>
    </>
  );
};

export default MovieCard;
