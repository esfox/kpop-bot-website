/**
 * @typedef ApiSong
 * @property {number} id (e.g. 1)
 * @property {string} artist_name (e.g. "Red Velvet")
 * @property {string} title (e.g. "What Is Love?")
 */

/**
 * @typedef Song
 * @property {number} id
 * @property {string} artistName
 * @property {string} title
 */

/**
 * @param {ApiSong} song
 * @returns {Song}
 */
export function mapSong(song)
{
  return {
    id: song.id,
    artistName: song.artist_name,
    title: song.title,
  };
}
