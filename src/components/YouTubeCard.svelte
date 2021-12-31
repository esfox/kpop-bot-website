<script>
  import classNames from 'classnames';

  import { getYouTubeID } from '$lib/helpers';

  export let url;

  $: youTubeId = getYouTubeID(url);
</script>

<img
  alt="unsupported format"
  class={classNames(
    'thumbnail object-cover shadow-lg hover:shadow-xl hover:scale-105 transition duration-300',
    $$props.class
  )}
  role="button"
  src={`https://i.ytimg.com/vi/${youTubeId}/hqdefault.jpg`}
  on:click
/>

<style>
  .thumbnail {
    width: 360px;
    height: 202px;
  }
</style>
