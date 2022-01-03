import ky from 'ky';

const api = ky.create({ prefixUrl: '/api' });

/**
 * Perform a `.get()` call with Ky.
 *
 * @param {string} url
 * @param {import('ky').Options} options
 */
async function get(url, options)
{
  const data = await api.get(url, options);
  return data.json();
}

export class API
{
  // static async fetchFancams(searchParams)
  // {
  //   const data = await api.get('fancams', { searchParams });
  //   return data.json();
  // }

  static async fetchIdols()
  {
    return get('idols');
  }

  static async fetchSongs()
  {
    return get('songs');
  }
}
