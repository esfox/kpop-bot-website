import axios from 'axios';
import { env } from '$lib/env';

const url = env.API_URL;

export class API
{
  static async fetchFancams(params)
  {
    const { data } = await axios.get(`${url}/fancams`, { params });
    return data;
  }
}
