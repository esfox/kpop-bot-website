<script>
  import classNames from 'classnames';
  import Select from 'svelte-select';

  export let value = undefined;
  export let getWithLabel = false;

  let selected = value;
  let element;

  const onSelect = ({ detail }) => {
    if (getWithLabel) value = detail;
    else value = $$props.isMulti ? detail?.map(({ value }) => value) || [] : detail.value;
  };

  export const reset = () => element.handleClear();
</script>

<div class={classNames('select', $$props.class)}>
  <Select bind:this={element} value={selected} {...$$props} showIndicator on:select={onSelect} />
</div>

<style lang="scss">
  .select {
    --background: var(--color-bg-darker);
    --border: none;
    --borderFocusColor: var(--color-primary);
    --inputColor: var(--color-white);
    --placeholderColor: var(--color-bg-lightest);
    --indicatorTop: 8px;
    --indicatorColor: var(--color-bg-lightest);
    --clearSelectColor: var(--color-bg-lightest);
    --clearSelectHoverColor: var(--color-bg-lightest);
    --clearSelectFocusColor: var(--color-bg-lightest);
    --listMaxHeight: 1000%;
    --listBackground: var(--color-bg-darker);
    --listEmptyColor: var(--color-bg-lightest);
    --itemHoverBG: var(--color-bg);
    --itemIsActiveBG: var(--color-primary);
    --multiItemBG: var(--color-bg);
    --multiItemActiveBG: var(--color-bg);
    --multiItemActiveColor: var(--color-white);
    --multiClearBG: var(--color-primary);
    --multiClearFill: var(--color-white);
    --multiClearHoverBG: var(--color-primary-lighter);
    --multiClearHoverFill: var(--color-white);

    :global(.selectContainer input) {
      cursor: text;
      font-size: 1rem;
      transition-duration: 150ms;
    }

    :global(.selectContainer input[readonly='true']) {
      cursor: pointer;
    }

    :global(.selectContainer.multiSelect input:focus) {
      box-shadow: none;
    }

    :global(.selectContainer.multiSelect .multiSelectItem) {
      cursor: pointer;
    }

    :global(.selectContainer.multiSelect .multiSelectItem_label) {
      margin-right: 8px;
    }

    :global(.selectContainer .indicator svg) {
      cursor: pointer;
    }

    :global(.selectContainer .listContainer) {
      box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
    }

    :global(.selectContainer .listContainer .item) {
      cursor: pointer;
    }

    :global(.selectContainer .clearSelect) {
      cursor: pointer;
    }

    :global(input[type='text']) {
      --tw-ring-color: var(--color-primary) !important;
      --tw-ring-offset-color: var(--color-primary) !important;
      --tw-ring-offset-width: 1px;
    }
  }
</style>
