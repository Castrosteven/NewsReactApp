import React from 'react';
import {useContext} from 'react';
import {createContext, ReactNode} from 'react';
import {Article} from '../types';
import {FetchArticles} from './FetchArticles';

interface contextInterface {
  loading: boolean;
  articles: {
    category: string;
    articles: Article[];
  }[];
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  selectedCategory: string;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  refreshing: boolean;
  setRefreshing: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
}
const Context = createContext<contextInterface>({
  loading: true,
  articles: [
    {
      category: '',
      articles: [],
    },
  ],
  setSelectedCategory: () => {},
  selectedCategory: 'business',
  setSearchQuery: () => {},
  searchQuery: '',
  refreshing: false,
  setRefreshing: () => {},
  currentPage: 1,
  setCurrentPage: () => {},
});

export const ArticlWrapper = ({children}: {children: ReactNode}) => {
  const {
    articles,
    loading,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    refreshing,
    setRefreshing,
    currentPage,
    setCurrentPage,
  } = FetchArticles();
  return (
    <Context.Provider
      value={{
        articles,
        loading,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        refreshing,
        setRefreshing,
        currentPage,
        setCurrentPage,
      }}>
      {children}
    </Context.Provider>
  );
};

export const UseAricles = () => {
  return useContext(Context);
};
