import React from 'react';
import {StyleSheet, View} from 'react-native';
import {CategoryCarousel} from '../components/CategoryCarousel';
import {ArticleCarousel} from '../components/ArticleCarousel';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {useSwipe} from '../contexts/useSwipe';
import {UseAricles} from '../contexts/UseArticle';
import {categoriesArr} from '../config/axios';
type Props = NativeStackScreenProps<RootStackParamList, 'Main'>;

export const HomeScreen = ({navigation}: Props) => {
  const {onTouchStart, onTouchEnd} = useSwipe(onSwipeLeft, onSwipeRight, 6);
  const {setSelectedCategory, selectedCategory} = UseAricles();
  const length = categoriesArr.length;
  const current = categoriesArr.findIndex(o => o.key === selectedCategory);
  function onSwipeLeft() {
    if (current + 1 !== length) {
      setSelectedCategory(categoriesArr[current + 1].key);
    }
  }

  function onSwipeRight() {
    if (current !== 0) {
      setSelectedCategory(categoriesArr[current - 1].key);
    }
  }
  return (
    <View
      style={styles.container}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}>
      <CategoryCarousel />
      <ArticleCarousel navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    padding: 10,
    paddingTop: 20,
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
  },
});
