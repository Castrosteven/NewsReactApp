import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useCallback} from 'react';
import {ScrollView, StyleSheet, RefreshControl} from 'react-native';
import {RootStackParamList} from '../../App';
import {UseAricles} from '../contexts/UseArticle';
import {ArticleCard} from './ArticleCard';

export type NavProps = NativeStackNavigationProp<
  RootStackParamList,
  'Main',
  undefined
>;
const wait = (timeout: number) => {
  return new Promise((resolve: any) => setTimeout(resolve, timeout));
};

export const ArticleCarousel = ({navigation}: {navigation: NavProps}) => {
  const {
    refreshing,
    setRefreshing,
    currentPage,
    setCurrentPage,
    selectedCategory,
  } = UseAricles();
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {articles} = UseAricles();
  const myArticles = articles.find(ar => ar.category === selectedCategory);
  return (
    <ScrollView
      onScroll={e => {
        console.log(e.nativeEvent.contentOffset.y);
        console.log(`Current Page ${currentPage}`);
        setCurrentPage(currentValue => currentValue + 1);
      }}
      style={style.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {myArticles?.articles.map((article, index) => {
        return (
          <ArticleCard navigation={navigation} key={index} article={article} />
        );
      })}
    </ScrollView>
  );
};

const style = StyleSheet.create({
  container: {},
});
