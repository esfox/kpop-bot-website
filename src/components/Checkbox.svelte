<script>
  import classNames from 'classnames';

  export let checked = false;
</script>

<input
  bind:checked
  id={$$props.id}
  type="checkbox"
  class={classNames(
    'w-5 h-5 rounded text-primary cursor-pointer bg-bg-darker focus:ring-0 focus:ring-offset-0',
    $$props.class
  )}
/>
