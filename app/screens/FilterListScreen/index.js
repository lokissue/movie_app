import React, {useState} from 'react';
import {
  View,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  Pressable,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import styles from './_styles.module.scss';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const FilterListScreen = ({navigation}) => {
  const YEARS = React.useMemo(() => {
    const currentYear = new Date().getFullYear();
    const endYear = 1950;
    const yearArray = [];

    for (let i = 0; currentYear - i >= endYear; i++) {
      yearArray.push({title: currentYear - i + '', id: currentYear - i + ''});
    }
    return yearArray;
  }, []);

  const renderItem = ({item}) => {
    return (
      <Pressable
        item={item}
        style={styles.list_item}
        onPress={() => navigation.navigate('Home', {year: item.title})}>
        <Text style={styles.list_item_text}>{item.title}</Text>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.navigate('Home')}>
          <View>
            <Icon name={'chevron-back'} size={24} color={'#000'} />
          </View>
        </Pressable>
        <Text style={styles.header_text}>filter: Year</Text>
      </View>
      <FlatList
        data={YEARS}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={<View style={styles.list_item_separator} />}
      />
    </SafeAreaView>
  );
};

export default FilterListScreen;
