<script>
  import classNames from 'classnames';
  import Loader from './Loader.svelte';

  export let height = '48px';
  export let fab = false;
  export let outlined = false;
  export let text = false;
  export let icon = false;
  export let basic = !fab && !outlined && !text && !icon;
  export let rounded = false;
  export let disabled = false;
  export let loading = false;
  export let noPadding = false;
</script>

<button
  class={classNames(
    'relative font-bold overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary-lighter disabled:bg-primary disabled:opacity-75 disabled:cursor-not-allowed transition',
    !noPadding && 'px-4 py-2',
    basic && 'bg-primary hover:bg-primary-hover',
    (text || icon) && 'focus:ring-0 bg-transparent hover:bg-primary',
    icon && 'rounded-full',
    outlined &&
      'bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-white',
    rounded && 'rounded-lg',
    fab &&
      'bg-primary hover:bg-primary-hover w-16 h-16 grid place-items-center rounded-full text-5xl shadow-xl',
    $$props.class
  )}
  {disabled}
  style={`--height: ${height}`}
  on:click
>
  {#if loading}
    <Loader width="32px" height="100%" color="white" />
  {:else}
    <slot />
  {/if}
</button>

<style>
  button {
    height: var(--height);
  }
</style>
