import axios from 'axios';
import { API_CONSTANTS, API_KEY } from '../config';
  
const fetchNewsTopHeadlines = async (params) => {
  return await axios.get(API_CONSTANTS.fetechNewsTopHeadlines, {
    params: {
      apiKey: API_KEY,
      ...params
    }
  }).then(res => res.data);
};

const fetchAllSources = async () => {
  return await axios.get(API_CONSTANTS.fetchAllSources, {
    params: {
      apiKey: API_KEY,
    }
  }).then(res => res.data);
};

const fetchErrorResult = async () => {
  return await axios.get(API_CONSTANTS.invalidCall).then(res => res.data);
};

export { fetchNewsTopHeadlines, fetchAllSources, fetchErrorResult };