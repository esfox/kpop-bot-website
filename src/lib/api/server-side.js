import got from 'got';
import { env } from '$lib/env';

const url = env.API_URL;
const api = got.extend({ prefixUrl: url });

/**
 * Perform a `.get()` call with Ky.
 *
 * @param {string} url
 * @param {import('ky').Options} options
 */
async function get(url, options)
{
  return api.get(url, options).json();
}

export class API
{
  static fetchFancams(searchParams)
  {
    return get('fancams', { searchParams });
  }

  static fetchIdols()
  {
    return get('idols');
  }

  static fetchSongs()
  {
    return get('songs');
  }
}
