import React, {useState, useRef} from 'react';
import {TextInput, View, Keyboard, Button, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {TextButton} from '@components/Button';
import styles from './_style.module.scss';

const SearchBar = ({onSubmit}) => {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const inputRef = useRef(null);

  const focusInput = () => {
    if (inputRef?.current) {
      inputRef.current.focus();
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={isFocus ? styles.searchBar_focused : styles.searchBar_unfocused}>
        <Icon name="search" size={20} color="#000" style={styles.search_icon} />
        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholder="Search"
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onFocus={() => {
            setIsFocus(true);
          }}
          blurOnSubmit={true}
          onSubmitEditing={() => onSubmit(searchPhrase)}
          returnKeyType="search"
        />
        {searchPhrase ? (
          <Pressable
            onPress={() => {
              setSearchPhrase('');
              focusInput();
            }}
            style={styles.clear_text_icon}>
            <Icon name="close" size={20} color="#000" />
          </Pressable>
        ) : null}
      </View>
      {isFocus && (
        <View>
          <TextButton
            title="Cancel"
            onPress={() => {
              Keyboard.dismiss();
              setIsFocus(false);
            }}
          />
        </View>
      )}
    </View>
  );
};

export default SearchBar;
