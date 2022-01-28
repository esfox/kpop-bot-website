import { API } from '$lib/api/server-side';

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get()
{
  try
  {
    const tags = await API.fetchTags();
    return { body: tags };
  }
  catch(error)
  {
    if(error.response)
      return { status: error?.response?.statusCode, body: error?.response?.body };

    return { status: 500, };
  }
}
