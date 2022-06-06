import axios from 'axios';
import {BASE_URL, API_KEY} from '@env';

export const service = axios.create({
  baseURL: BASE_URL,
  headers: {
    authorization: API_KEY,
  },
});

export const categoriesArr = [
  {
    key: 'business',
    value: 'Business',
  },
  {
    key: 'entertainment',
    value: 'Entertainment',
  },
  {
    key: 'general',
    value: 'General',
  },
  {
    key: 'health',
    value: 'Health',
  },

  {
    key: 'science',
    value: 'Science',
  },
  {
    key: 'sports',
    value: 'Sports',
  },
  {
    key: 'technology',
    value: 'Technology',
  },
];
