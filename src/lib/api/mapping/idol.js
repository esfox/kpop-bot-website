/**
 * @typedef ApiIdol
 * @property {number} id (e.g. 1)
 * @property {string} stage_name (e.g. "Soyeon")
 * @property {string} positions (e.g. "Leader, Main Rapper, Sub Vocalist, Center")
 * @property {string} colour (e.g. "32160")
 * @property {number} is_active (e.g. 1)
 * @property {number} person_id (e.g. 1)
 * @property {number} artist_id (e.g. 1)
 * @property {string} artist_name (e.g. "(G)I-DLE")
 * @property {string} artist_type (e.g. 1)
 */

/**
 * @typedef Idol
 * @property {number} id
 * @property {string} stageName
 * @property {string[]} positions
 * @property {string} colour
 * @property {number} isActive
 * @property {number} personId
 * @property {IdolArtist} artist
 */

/**
 * @typedef IdolArtist
 * @property {number} id
 * @property {string} name
 * @property {number} type
 */

/**
 * @param {ApiIdol} idol
 * @returns {Idol}
 */
export function mapIdol(idol)
{
  return {
    id: idol.id,
    stageName: idol.stage_name,
    positions: idol.positions?.split(',').map(position => position.trim()),
    colour: idol.colour,
    isActive: idol.is_active,
    personId: idol.person_id,
    artist:
    {
      id: idol.artist_id,
      name: idol.artist_name,
      type: idol.artist_type,
    },
  };
}