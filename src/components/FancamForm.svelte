<script>
  import classNames from 'classnames';
  import Input from './Input.svelte';
  import Select from './Select.svelte';
  import Checkbox from './Checkbox.svelte';
  import Button from './Button.svelte';
  import YouTubeLinkInput from './YouTubeLinkInput.svelte';

  import { getYouTubeID } from '$lib/helpers';

  export let idolsOptions = [];
  export let tagsOptions = [];
  export let songsOptions = [];
  export let loading = false;
  export let onSubmit = () => {};

  let orientationOptions = ['Portrait', 'Landscape'];
  let rotationOptions = ['0°', '90°', '180°', '270°'];

  let youtubeLink;
  let idols;
  let tags = {};
  let recordingDate;
  let song;
  let orientation = orientationOptions[0];
  let rotation = rotationOptions[0];
  let isFullShot = false;
  let isNotFullSong = false;
  let isEyeContact = false;
  let discordId;

  let hasIdolsError = false;

  $: youtubeId = getYouTubeID(youtubeLink);

  $: {
    if (!idols) break $;
    else hasIdolsError = false;

    for (const { value } of idols) {
      const idolId = value.id;
      if (!tags[idolId]) tags[idolId] = [];
    }
  }

  const submit = async () => {
    if (!idols) return (hasIdolsError = true);

    const idolsWithTags = [];
    for (const idol of idols || []) {
      const idolId = idol.value.id;
      const idolTags = tags[idolId];
      idolsWithTags.push({
        id: idolId,
        tags: idolTags || [],
      });
    }

    const fancamData = {
      youtubeLink,
      idols: idolsWithTags,
      recordingDate,
      orientation: orientation.toLowerCase(),
      rotation: rotationOptions.indexOf(rotation),
      isFullShot,
      isNotFullSong,
      isEyeContact,
      discordId,
    };

    if (song) fancamData.songId = song.value.id;

    onSubmit(fancamData);
  };
</script>

{#if youtubeId}
  <iframe
    class="mt-6"
    width="100%"
    height="240"
    src={`https://www.youtube.com/embed/${youtubeId}`}
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  />
{/if}
<form class="pt-4" on:submit|preventDefault={submit}>
  <div class="mt-6">
    <label class="inline-block text-sm text-bg-lightest pb-1" for="youtube-link">
      YouTube Link
    </label>
    <YouTubeLinkInput bind:value={youtubeLink} id="youtube-link" />
  </div>

  <div>
    <label class="inline-block text-sm text-bg-lightest mt-4 pb-1" for="idols">Idol/s</label>
    <Select
      bind:value={idols}
      id="idols"
      items={idolsOptions}
      placeholder="Search for idol/s"
      listPlacement="bottom"
      getWithLabel
      isMulti
      isVirtualList
    />
    {#if hasIdolsError}
      <div class="text-danger text-right mt-2">Please select the idol/s in the fancam.</div>
    {/if}
  </div>

  {#if idols}
    <div class="mt-4">
      <hr class="mb-2" />
      <div class="text-sm text-bg-lightest pb-1">Tags</div>
      {#each idols as { label, value }, i}
        <div class={classNames({ 'pt-3': i > 0 })}>
          <label class="inline-block pb-1" for={`tags-${value.id}`}>{label}</label>
          <Select
            bind:value={tags[value.id]}
            id={`tags-${value.id}`}
            items={tagsOptions}
            placeholder="Search for tag/s"
            isClearable={false}
            isCreatable
            isMulti
            isVirtualList
          />
        </div>
      {/each}
      <hr class="mt-4" />
    </div>
  {/if}

  <div class="mt-4">
    <label class="inline-block text-sm text-bg-lightest pb-1" for="recording-date">
      Recording Date
    </label>
    <Input bind:value={recordingDate} id="recording-date" type="date" required />
  </div>

  <div class="mt-4">
    <label class="inline-block text-sm text-bg-lightest pb-1" for="song-title"> Song Title </label>
    <Select
      bind:value={song}
      id="song-title"
      items={songsOptions}
      placeholder="Search for song"
      isVirtualList
      getWithLabel
    />
  </div>

  <div class="mt-4">
    <label class="inline-block text-sm text-bg-lightest pb-1" for="orientation">
      Orientation
    </label>
    <Select
      bind:value={orientation}
      id="orientation"
      items={orientationOptions}
      isClearable={false}
      isSearchable={false}
    />
  </div>

  <div class="mt-4">
    <label class="inline-block text-sm text-bg-lightest pb-1" for="rotation"> Rotation </label>
    <Select
      bind:value={rotation}
      id="rotation"
      items={rotationOptions}
      isClearable={false}
      isSearchable={false}
    />
  </div>

  <div class="flex flex-wrap gap-5 mt-6">
    <div class="flex items-center">
      <Checkbox bind:checked={isFullShot} id="full-shot" />
      <label class="inline-block cursor-pointer select-none pl-2" for="full-shot">
        Full Shot
      </label>
    </div>
    <div class="flex items-center">
      <Checkbox bind:checked={isNotFullSong} id="not-full-song" />
      <label class="inline-block cursor-pointer select-none pl-2" for="not-full-song">
        Not Full Song
      </label>
    </div>
    <div class="flex items-center">
      <Checkbox bind:checked={isEyeContact} id="eye-contact" />
      <label class="inline-block cursor-pointer select-none pl-2" for="eye-contact">
        Eye Contact
      </label>
    </div>
  </div>

  <div class="mt-6">
    <label class="inline-block text-sm text-bg-lightest pb-1" for="discord-id">
      Your Discord User ID
    </label>
    <Input
      bind:value={discordId}
      class="discord-id"
      id="discord-id"
      type="number"
      required
      noSpinner
    />
  </div>

  <Button class="block w-full mt-8" {loading} disabled={loading} rounded>Submit</Button>
</form>
