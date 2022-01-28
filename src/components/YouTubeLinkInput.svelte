<script>
  import { debounce } from '$lib/helpers';

  import Input from '../components/Input.svelte';

  export let value = '';

  const youtubLinkRegex =
    /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;

  /** @type {HTMLInputElement} */
  let element = undefined;

  export function validate() {
    const match = value.match(youtubLinkRegex);
    if (!match) element.setCustomValidity('Not a valid YouTube URL');
    else element.setCustomValidity('');
  }

  const onInput = debounce(() => validate());
</script>

<Input
  bind:value
  bind:element
  placeholder="https://youtu.be/i0p1bmr0EmE"
  required
  on:input={onInput}
  {...$$props}
/>
