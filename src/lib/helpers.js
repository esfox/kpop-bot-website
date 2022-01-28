export function shuffleArray(array)
{
  for(let i = array.length - 1; i > 0; i--)
  {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

export function getYouTubeID(url = '')
{
  /* regex for getting YouTube video ID */
  const youTubeRegex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/i;
  const [, youTubeID] = url.match(youTubeRegex) || [];
  return youTubeID;
}

export function debounce(callback, timeout = 500)
{
  let timer;
  return (...args) =>
  {
    clearTimeout(timer);
    timer = setTimeout(() => { callback.apply(this, args); }, timeout);
  };
}
