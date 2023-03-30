import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image as RNImage,
  StyleSheet,
  Button,
  Platform,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import NotFound from '@components/404';

import {fetchMovie} from '@apis';
import Image from '@components/Image';
import {IconButton, TextButton} from '@components/Button';

import styles from './_styles.module.scss';
import {addHistory} from '@redux/moviesSlice';

const DetailsScreen = ({route, navigation}) => {
  const params = route.params;
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [imgRatio, setImgRatio] = useState(1);
  const [hasError, setHasError] = useState(false);

  const searchHistory = useSelector(state => state.movies.searchHistory);

  const searchFromHistory = () => {
    if (params?.imdbID && searchHistory.hasOwnProperty(params.imdbID)) {
      return searchHistory[params.imdbID];
    }
    return false;
  };

  const searchMovie = async () => {
    try {
      setHasError(false);
      const cache = searchFromHistory();
      if (cache) {
        setData(cache);
        return;
      }
      if (params.imdbID) {
        const res = await fetchMovie({i: params.imdbID});
        if (res.Poster === 'N/A') {
          res.Poster = '';
        }
        setData(res);
        dispatch(addHistory({[params.imdbID]: res}));
      } else {
        throw new Error('No ID');
      }
    } catch (error) {
      setHasError(true);
    }
  };

  useEffect(() => {
    searchMovie();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  useEffect(() => {
    if (data?.Poster) {
      RNImage.getSize(data?.Poster, (width, height) => {
        setImgRatio(width / height);
      });
    }
  }, [data]);

  return (
    <ScrollView style={styles.container}>
      <IconButton
        style={[styles.back_button, RNstyles.back_button]}
        iconName={'chevron-back'}
        onPress={() => navigation.goBack()}
      />
      <View style={[styles.poster_container, RNstyles.posterShadow]}>
        <Image
          src={data?.Poster || params?.Poster}
          style={[styles.poster, {aspectRatio: imgRatio}]}
          resizeMode="contain"
          alt={data.Title}
        />
        <View style={[styles.info_section]}>
          {data?.imdbRating ? (
            <View style={styles.imdbRating}>
              <View style={styles.imdbRating_inner}>
                <Text style={styles.imdbRating_value} numberOfLines={1}>
                  {data.imdbRating}
                </Text>
              </View>
            </View>
          ) : null}
          <Text style={styles.title}>{data?.Title || params.Title || ''}</Text>
          <View style={styles.sub_info}>
            <Text
              style={styles.info_text}
              numberOfLines={1}
              ellipsizeMode="tail">
              {`${data.Runtime || ''} ${data.Year ? '| ' + data.Year : ''}`}
            </Text>
            <Text
              style={styles.info_text}
              numberOfLines={1}
              ellipsizeMode="tail">
              {`${data.Director || ''}`}
            </Text>
          </View>
        </View>
      </View>
      {hasError ? (
        <View style={{marginTop: 32}}>
          <NotFound />
          <TextButton title={'Try again'} onPress={searchMovie} />
        </View>
      ) : null}
      {data?.Plot ? (
        <View style={[styles.section]}>
          <Text style={styles.section_title}>Plot</Text>
          <Text style={styles.section_sub_text}>{data.Plot}</Text>
        </View>
      ) : null}
      {Array.isArray(data?.Ratings) && data.Ratings.length > 0 ? (
        <View style={[styles.section]}>
          <Text style={styles.section_title}>Ratings</Text>
          <View style={styles.rating}>
            {data?.Ratings.map((rating, index) => (
              <View style={styles.rating_container} key={index}>
                <Text style={styles.rating_value}>{rating.Value}</Text>
                <Text style={styles.rating_source}>{rating.Source}</Text>
              </View>
            ))}
          </View>
        </View>
      ) : null}
    </ScrollView>
  );
};

const RNstyles = StyleSheet.create({
  posterShadow: {
    backgroundColor: '#000',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.75,
    shadowRadius: 10,
    elevation: 5,
  },
  back_button: {
    zIndex: 100,
    elevation: Platform.OS === 'android' ? 100 : 0,
  },
});

export default DetailsScreen;
