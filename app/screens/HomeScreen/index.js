import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  Button,
  FlatList,
  Text,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {fetchMoviesBySearch} from '@apis';
import {
  setPage,
  setMovies,
  setTotal,
  setLastSearch,
  initialize,
} from '@redux/moviesSlice';

import MovieCard from '@components/MovieCard';
import SearchBar from '@components/Search';
import NotFound from '@components/404';
import {TextButton} from '@components/Button';
import styles from './_styles.module.scss';

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const page = useSelector(state => state.movies.page);
  const total = useSelector(state => state.movies.total);
  const moviesArray = useSelector(state => state.movies.data);
  const lastSearch = useSelector(state => state.movies.lastSearch);

  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const searchMovie = async options => {
    const {s} = options;
    if (s) {
      if (s !== lastSearch) {
        dispatch(setPage(1));
        dispatch(setTotal(0));
      }
      dispatch(setLastSearch(s));
      options.s = s.replace(' ', '+');
    }
    if (!options?.page) {
      dispatch(setPage(1));
    }
    setHasError(false);
    try {
      setLoading(true);
      const res = await fetchMoviesBySearch(options);

      const {Search, totalResults, Response} = res;
      if (Response === 'True') {
        if (options?.page && options.page > page) {
          dispatch(setMovies([...moviesArray, ...Search]));
          dispatch(setPage(options.page));
        } else {
          dispatch(setMovies(Search));
        }
        dispatch(setTotal(+totalResults || 0));
      }
      if (res.Response === 'False') {
        throw new Error(res?.Error || 'Not Found');
      }
    } catch (error) {
      handleError();
    } finally {
      setLoading(false);
    }
  };

  const handleError = () => {
    dispatch(initialize());
    setHasError(true);
  };

  useEffect(() => {
    searchMovie({s: 'batman'});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    return (
      <MovieCard
        data={item}
        key={index}
        onPress={() => navigation.navigate('Details', item)}
      />
    );
  };

  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <View>
          <Text style={styles.header_text}>
            Movies{loading ? <ActivityIndicator /> : null}
          </Text>
        </View>
        <SearchBar onSubmit={t => searchMovie({s: t})} />
      </View>
    );
  };

  const renderFooter = () => {
    if (hasError && !loading) {
      return (
        <View style={{flex: 1}}>
          <NotFound />
          <TextButton
            title="Try again"
            onPress={() => searchMovie({s: lastSearch})}
          />
        </View>
      );
    }
    if (moviesArray?.length && total > moviesArray?.length) {
      return (
        <View style={[styles.footer_container]}>
          <TextButton
            title="Load More"
            onPress={() => searchMovie({s: lastSearch, page: page + 1})}
            loading={loading}
          />
        </View>
      );
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      <FlatList
        style={styles.list}
        data={formattedData}
        renderItem={renderItem}
        keyExtractor={(item, index) => item?.imdbID || index}
        numColumns={2}
        ListFooterComponent={renderFooter}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
