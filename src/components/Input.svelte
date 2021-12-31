<script>
  import classNames from 'classnames';
  import { createEventDispatcher } from 'svelte';

  export let value = '';
  export let multiline = false;
  export let rounded = false;

  const dispatch = createEventDispatcher();

  let attributes = {
    ...$$props,
    class: classNames(
      'input w-full bg-bg-darker px-3 py-2 outline-0 focus:ring-2 focus:ring-primary focus:border-primary transition',
      rounded && 'rounded-lg',
      $$props.class,
      { multiline }
    ),
  };

  const onEnterPressed = ({ key }) => {
    if (key === 'Enter') dispatch('enter');
  };
</script>

{#if multiline}
  <textarea bind:value {...attributes} on:keypress={onEnterPressed} />
{:else}
  <input bind:value {...attributes} on:keypress={onEnterPressed} />
{/if}

<style>
  .input::placeholder {
    color: var(--color-bg-lightest);
  }

  .multiline {
    min-height: 2.5rem;
  }
</style>
