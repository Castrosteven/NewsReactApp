import {useEffect} from 'react';
import {useState} from 'react';
import {categoriesArr, service} from '../config/axios';
import {Article} from '../types';

export const FetchArticles = () => {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(
    categoriesArr[0].key,
  );
  const [articles, setArticles] = useState<
    {
      category: string;
      articles: Article[];
    }[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetch = async () => {
    try {
      const {data} = await service.get('/top-headlines', {
        params: {
          category: selectedCategory,
          language: 'en',
          q: encodeURI(searchQuery),
          pageSize: 10,
          page: currentPage,
        },
      });

      return data;
    } catch (error) {
      throw error;
    }
  };

  const fetchArticles = async () => {
    try {
      const data = await fetch();
      const copyOfArticles = [...articles];
      const found = copyOfArticles.findIndex(
        c => c.category === selectedCategory,
      );
      if (found >= 0) {
        copyOfArticles[found].articles = [
          ...copyOfArticles[found].articles,
          ...data.articles,
        ];
        setArticles(copyOfArticles);
        setLoading(false);
      } else {
        setArticles(currentValue => [
          ...currentValue,
          {category: selectedCategory, articles: data.articles},
        ]);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  useEffect(() => {
    fetchArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, currentPage]);

  useEffect(() => {
    if (refreshing) {
      fetchArticles();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshing]);

  useEffect(() => {
    const search = async () => {
      try {
        const data = await fetch();
        const copyOfArticles = [...articles];
        const found = copyOfArticles.findIndex(
          c => c.category === selectedCategory,
        );
        if (found >= 0) {
          copyOfArticles[found].articles = [
            ...data.articles,
            ...copyOfArticles[found].articles,
          ];
          setArticles(copyOfArticles);
          setLoading(false);
        } else {
          setArticles(currentValue => [
            ...currentValue,
            {category: selectedCategory, articles: data.articles},
          ]);
        }
      } catch (error) {
        throw error;
      }
    };
    search();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  return {
    selectedCategory,
    setSelectedCategory,
    articles,
    loading,
    searchQuery,
    setSearchQuery,
    refreshing,
    setRefreshing,
    currentPage,
    setCurrentPage,
  };
};
