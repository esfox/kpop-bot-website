<script>
  import Overlay from '../components/Overlay.svelte';
  import YouTubeCard from '../components/YouTubeCard.svelte';
  import YouTubeEmbed from '../components/YouTubeEmbed.svelte';

  export let fancams = [];

  let youtubeOverlay;
  let currentYouTubeUrl;

  const showFancam = (fancamUrl) => {
    youtubeOverlay.show();
    currentYouTubeUrl = fancamUrl;
  };

  const hideFancam = () => youtubeOverlay.hide();
</script>

<div class={$$props.class}>
  {#if fancams.length === 0}
    <h1 class="text-lg text-bg-lightest">No fancams found</h1>
  {:else}
    <div class="flex flex-wrap justify-center gap-14">
      {#each fancams as { url }}
        <YouTubeCard {url} on:click={showFancam(url)} />
      {/each}
    </div>

    <Overlay bind:this={youtubeOverlay}>
      {#if currentYouTubeUrl}
        <YouTubeEmbed url={currentYouTubeUrl} onClose={hideFancam} />
      {/if}
    </Overlay>
  {/if}
</div>
