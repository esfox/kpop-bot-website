import { API } from '$lib/api/server-side';
import { shuffleArray } from '$lib/helpers';

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({ url })
{
  const queryParams = url.searchParams;

  /* Query parameters for the `GET /fancams` request. */
  const fancamsParams = {};

  /* Get the `search` query parameter. */
  const search = queryParams.get('search');
  if(search)
    fancamsParams.member_names = search;

  /** @type {[] | undefined} */
  let fancams;
  try
  {
    fancams = await API.fetchFancams(fancamsParams);
  }
  catch(error)
  {
    if(error.response)
      return { status: error?.response?.statusCode, body: error?.response?.body };

    return { status: 500, };
  }

  if(!fancams)
    return;

  /* Shuffle the fancams array if there is a `random` query param. */
  if(queryParams.get('random') === 'true')
    fancams = shuffleArray(fancams);
  else fancams = fancams.reverse();

  /* Limit the results if there is a `limit` query param. */
  const limit = queryParams.get('limit');
  if(limit && !isNaN(limit))
    fancams = fancams.slice(0, limit);

  return { body: fancams };
}

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function post({ request })
{
  try
  {
    const body = await request.json();
    await API.addFancam(body);
    return { status: 200 };
  }
  catch(error)
  {
    console.error(error);
    if(error.response)
      return { status: error?.response?.statusCode, body: error?.response?.body };

    return { status: 500, };
  }
}
