<script>
  import { onMount } from 'svelte';
  import { SvelteToast } from '@zerodevx/svelte-toast';

  import Loader from '../components/Loader.svelte';
  import FancamForm from '../components/FancamForm.svelte';

  import { API } from '$lib/api/client-side';
  import { Toast } from '$lib/toast';

  let isLoading = true;
  let loadError = undefined;
  let isSubmitting = false;

  let idolsOptions = [];
  let songsOptions = [];
  let tagsOptions = [];

  onMount(() => load());

  const load = async (tagsOnly) => {
    /* Fetch all idols and songs. */
    isLoading = true;

    try {
      if (tagsOnly) {
        tagsOptions = await API.fetchTags();
      } else {
        const [idols, songs, tags] = await Promise.all([
          API.fetchIdols(),
          API.fetchSongs(),
          API.fetchTags(),
        ]);

        idolsOptions = idols.map((idol) => ({
          label: `${idol.stageName} - ${idol.artist.name}`,
          value: idol,
        }));

        songsOptions = songs.map((song) => ({
          label: `${song.artistName} - ${song.title}`,
          value: song,
        }));

        tagsOptions = tags;
      }
    } catch (error) {
      loadError = 'An unknown error occurred.';
    }

    isLoading = false;
  };

  const submit = async (fancamData) => {
    isSubmitting = true;
    try {
      await API.addFancam(fancamData);
      await load(true);
      Toast.success('Successfully added fancam');
    } catch (error) {
      let submitError = 'An unknown error occurred.';
      const errorResponse = error?.response;
      if (errorResponse) submitError = await errorResponse.text();

      Toast.danger(submitError);
    }
    isSubmitting = false;
  };
</script>

{#if isLoading}
  <Loader class="w-full h-full grid place-items-center" />
{:else if loadError}
  <div class="w-full h-full grid place-items-center text-center text-danger">{loadError}</div>
{:else}
  <SvelteToast />
  <div class={$$props.class}>
    <h1 class="text-2xl text-center">Add Fancam</h1>
    <FancamForm
      {idolsOptions}
      {tagsOptions}
      {songsOptions}
      loading={isSubmitting}
      onSubmit={submit}
    />
  </div>
{/if}
