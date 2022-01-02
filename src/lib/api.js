import ky from 'ky-universal';
import { env } from '$lib/env';

const url = env.API_URL;

export class API
{
  static async fetchFancams(searchParams)
  {
    const data = await ky.get(`${url}/fancams`, { searchParams });
    return data.json();
  }
}
