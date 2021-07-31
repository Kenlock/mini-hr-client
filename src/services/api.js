import axios from 'axios';

import { baseUrl } from './constants';
import { createParamsString } from './helper';

export default async (url, params = {}, method = 'GET') => {
  try {
    let finalUrl =
      baseUrl + url + (method === 'GET' ? createParamsString(params) : '');
    const configObj = {
      method,
      url: finalUrl,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('authToken'),
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    };
    if (method !== 'GET') {
      configObj['data'] = params;
    }
    const response = await axios({ ...configObj });
    if (response.code !== 200) {
    }
    return response.data;
  } catch (e) {
    console.log('Eroro in api : ', e.response);
    return e.response && e.response.data;
  }
};
