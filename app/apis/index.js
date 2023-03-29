import Config from 'react-native-config';

export const fetchMovie = options => {
  let URL = `${Config.API_URL}/?apikey=${Config.API_KEY}`;

  if (options) {
    Object.keys(options).forEach(key => (URL += `&${key}=${options[key]}`));
  }
  return new Promise(function (resolve, reject) {
    fetch(URL)
      .then(response => response.json())
      .then(responseData => resolve(responseData))
      .catch(err => {
        reject(err);
      });
  });
};

export const fetchMoviesBySearch = options => {
  if (!options && !options?.s) {
    return fetchMovie({s: 'batman'});
  }
  return fetchMovie(options);
};
