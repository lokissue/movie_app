import Config from 'react-native-config';

export const fetchMovies = (keyword = 'batman', options) => {
  // const URL = `${Config.API_URL}/?s=batman&apikey=${Config.API_KEY}`;
  const API_KEY = '2a1b4de2';

  let URL = `http://www.omdbapi.com/?s=${keyword}&apikey=${API_KEY}`;

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
