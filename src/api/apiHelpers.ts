import axios from 'axios';
import axiosRetry from 'axios-retry';
axiosRetry(axios, {retries: 3});

export const sendRequest = async (config: any) => {
  try {
    return (await axios.request(config)).data;
  } catch (error) {
    return {error: error};
  }
};
