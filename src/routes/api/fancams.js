import { API } from '$lib/api';
import { shuffleArray } from '$lib/helpers';

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({ url })
{
  const queryParams = url.searchParams;

  /** @type {[] | undefined} */
  let fancams;
  try
  {
    fancams = await API.fetchFancams({
      member_names: queryParams.get('search'),
    });
  }
  catch(error)
  {
    return { status: error.response.status, body: error.response.data };
  }

  if(!fancams)
    return;

  /* Shuffle the fancams array if there is a `random` query param. */
  if(queryParams.get('random') === 'true')
    fancams = shuffleArray(fancams);

  /* Limit the results if there is a `limit` query param. */
  const limit = queryParams.get('limit');
  if(limit && !isNaN(limit))
    fancams = fancams.slice(0, limit);

  return { body: fancams };
}
