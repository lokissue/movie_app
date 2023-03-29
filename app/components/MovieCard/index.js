import React from 'react';
import {Text, View, Button, Image} from 'react-native';

import styles from './_style.module.scss';

const MovieCard = ({data}) => {
  const {Poster, Title, Type, Year, imdbID} = data;

  if (data.empty) {
    return <View style={styles.card}></View>;
  }

  return (
    <View style={styles.card}>
      <Image src={Poster} resizeMode={'cover'} style={styles.cover} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
          {Title}
        </Text>
        <Text style={styles.year} numberOfLines={1} ellipsizeMode="tail">
          {Year}
        </Text>
      </View>
    </View>
  );
};

export default MovieCard;
