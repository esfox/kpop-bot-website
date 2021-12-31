<script>
  import Button from './Button.svelte';

  import { getYouTubeID } from '$lib/helpers';
  import classNames from 'classnames';

  export let url;
  export let onClose = () => {};

  const youTubeId = getYouTubeID(url);
  let rotation = 'rotate-1';

  // const rotate = () => {
  //   switch (rotation) {
  //     case 'rotate-1':
  //       rotation = 'rotate-2';
  //       break;

  //     case 'rotate-2':
  //       rotation = 'rotate-3';
  //       break;

  //     case 'rotate-3':
  //       rotation = 'rotate-4';
  //       break;

  //     default:
  //       rotation = 'rotate-1';
  //       break;
  //   }
  // };
</script>

<div class="w-full h-full p-8 z-50" on:click={onClose}>
  <!-- <Button class="float-right mb-3" on:click={rotate}>Rotate</Button> -->
  <Button class="w-12 h-12 grid place-items-center rounded-full ml-auto mb-3" on:click={onClose}>
    <i class="fa fa-times fa-lg" />
  </Button>

  <div class={classNames('w-3/4 h-4/5 mx-auto', rotation)}>
    <iframe
      title="youtube"
      frameBorder="0"
      class="w-full h-full"
      src={`https://www.youtube.com/embed/${youTubeId}`}
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  </div>
</div>

<style>
  .rotate-1 {
    transform: rotate(0deg) scale(1);
  }

  .rotate-2 {
    transform: rotate(90deg) scale(0.6);
  }

  .rotate-3 {
    transform: rotate(180deg) scale(1);
  }

  .rotate-4 {
    transform: rotate(270deg) scale(0.6);
  }
</style>
