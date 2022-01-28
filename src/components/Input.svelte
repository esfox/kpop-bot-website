<script>
  import classNames from 'classnames';
  import { createEventDispatcher } from 'svelte';

  export let value = '';
  export let multiline = false;
  export let rounded = false;
  export let element = undefined;
  export let noSpinner = false;

  const dispatch = createEventDispatcher();

  let attributes = {
    ...$$props,
    class: classNames(
      'input w-full bg-bg-darker px-3 py-2 outline-0 focus:ring-2 focus:ring-primary focus:border-primary transition',
      rounded && 'rounded-lg',
      $$props.type === 'number' && noSpinner && 'no-spinner',
      $$props.class,
      { multiline }
    ),
  };

  const onEnterPressed = ({ key }) => {
    if (key === 'Enter') dispatch('enter');
  };
</script>

{#if multiline}
  <textarea bind:this={element} bind:value {...attributes} on:keypress={onEnterPressed} on:input />
{:else}
  <input bind:this={element} bind:value {...attributes} on:keypress={onEnterPressed} on:input />
{/if}

<style lang="scss">
  .input {
    &::placeholder {
      color: var(--color-bg-lightest);
    }

    &[type='date'] {
      cursor: text;

      &::-webkit-calendar-picker-indicator {
        filter: invert(1);
        cursor: pointer;
      }
    }

    &.no-spinner {
      &[type='number'] {
        -moz-appearance: textfield;
      }

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }
  }

  .multiline {
    min-height: 2.5rem;
  }
</style>
