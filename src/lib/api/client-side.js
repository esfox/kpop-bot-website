import ky from 'ky';

import { mapIdol } from './mapping/idol';
import { mapSong } from './mapping/song';

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

  /** @returns {Promise<import('./mapping/idol').Idol[]>} */
  static async fetchIdols()
  {
    const idols = await get('idols');
    return idols.map(mapIdol);
  }

  /** @returns {Promise<import('./mapping/song').Song[]>} */
  static async fetchSongs()
  {
    const songs = await get('songs');
    return songs.map(mapSong);
  }

  static async fetchTags()
  {
    return get('tags');
  }

  static async addFancam({
    youtubeLink,
    idols,
    recordingDate,
    songId,
    orientation,
    rotation,
    isFullShot,
    isNotFullSong,
    isEyeContact,
    discordId,
  })
  {
    const json = {
      url: youtubeLink,
      members: idols.map(({ id, tags }) => ({
        idol: {
          member_id: id,
        },
        tags: tags
      })),
      recording_date: recordingDate,
      song_id: songId || null,
      orientation: orientation,
      rotation,
      is_full_shot: isFullShot,
      has_complete_audio: !isNotFullSong,
      has_front_angle: isEyeContact,
      discord_id: discordId,
    };

    if(songId)
      json.song_id = songId;

    return api.post('fancams', { json }).json();
  }
}
