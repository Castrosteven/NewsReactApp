import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {View, Text} from 'react-native';
import {Article} from '../types';
import NewsPaper from '../assets/newsp.svg';
import {TouchableOpacity} from 'react-native';
import {NavProps} from './ArticleCarousel';
import {useTheme} from '@react-navigation/native';

interface Props {
  article: Article;
  navigation: NavProps;
}
export const ArticleCard = ({article, navigation}: Props) => {
  const {colors} = useTheme();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Browser', {
          uri: article.url,
        })
      }
      style={{...style.container, backgroundColor: colors.card}}>
      <View>
        {article.urlToImage ? (
          <Image style={style.img} source={{uri: article.urlToImage}} />
        ) : (
          <NewsPaper style={style.img} />
        )}
      </View>
      <View style={{...style.titleContainer}}>
        <Text style={{...style.title, color: colors.text}}>
          {article.title}
        </Text>
        <Text style={{color: colors.text}}> {article.source.name} </Text>
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    height: 120,
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    padding: 5,
  },
  img: {
    width: 130,
    height: 120,
    borderRadius: 10,
  },
  titleContainer: {
    width: '100%',
    padding: 5,
    style: 'flex',
    flexDirection: 'column',
    flexShrink: 1,
  },
  title: {
    textAlign: 'left',
    fontSize: 15,
    flex: 1,
  },
});
