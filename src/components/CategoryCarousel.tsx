/* eslint-disable react-native/no-inline-styles */
import {useTheme} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import {categoriesArr} from '../config/axios';
import {UseAricles} from '../contexts/UseArticle';

export const CategoryCarousel = () => {
  const {colors} = useTheme();
  const scrollViewRef = useRef<ScrollView>(null);

  const {setSelectedCategory, selectedCategory} = UseAricles();
  const indexOfCat = categoriesArr.findIndex(c => c.key === selectedCategory);
  useEffect(() => {
    scrollViewRef.current?.scrollTo({
      x: indexOfCat * 80,
      animated: true,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  return (
    <ScrollView
      ref={scrollViewRef}
      horizontal={true}
      style={styles.container}
      showsHorizontalScrollIndicator={false}>
      {categoriesArr.map((category, index) => {
        return (
          <View key={index}>
            <TouchableOpacity
              style={{paddingRight: 25}}
              onPress={() => setSelectedCategory(category.key)}>
              <View
                style={
                  selectedCategory === category.key
                    ? {borderBottomWidth: 2, borderBottomColor: colors.primary}
                    : null
                }>
                <Text
                  style={
                    selectedCategory === category.key
                      ? {
                          ...styles.category,
                          fontWeight: '500',
                          color: colors.text,
                        }
                      : {...styles.category, color: colors.text}
                  }>
                  {category.value}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  category: {
    fontSize: 15,
    textAlign: 'center',
    paddingBottom: 4,
  },
});
