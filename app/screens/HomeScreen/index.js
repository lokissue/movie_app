import React, {useEffect, useMemo} from 'react';
import {View, Button, FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {fetchMovies} from '@apis';
import {pageIncrement, setPage, setMovies} from '@redux/moviesSlice';

import MovieCard from '@components/MovieCard';
import styles from './_styles.module.scss';

const HomeScreen = () => {
  const page = useSelector(state => state.movies.page);
  const moviesArray = useSelector(state => state.movies.data);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchMovies('batman', {page: 2});
        const {Search, totalResults, Response} = res;
        if (Response === 'True') {
          dispatch(setMovies(Search));
        }
        // TO DO: Handle NOT FOUND
      } catch (error) {
        console.log('Error: ', error);
      }
    })();
  }, [dispatch]);

  const formattedData = useMemo(() => {
    if (!Array.isArray(moviesArray)) {
      return [];
    }
    if (moviesArray.length % 2) {
      return [
        ...moviesArray,
        {...moviesArray[moviesArray.length - 1], empty: true},
      ];
    }
    return [...moviesArray];
  }, [moviesArray]);

  const renderItem = ({item, index}) => {
    return <MovieCard data={item} key={index} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={formattedData}
        renderItem={renderItem}
        keyExtractor={(item, index) => item?.imdbID || index}
        numColumns={2}
        ListHeaderComponent={
          <Button
            title="Header !!!"
            onPress={() => console.log('Simple Button pressed')}
          />
        }
        ListFooterComponent={
          <Button
            title="Press me"
            onPress={() => console.log('Simple Button pressed')}
          />
        }
      />
    </View>
  );
};

export default HomeScreen;
