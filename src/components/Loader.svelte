<script>
  export let width = '64px';
  export let height = '64px';
  export let stroke = 10;
  export let color = 'var(--color-primary)';
</script>

<div class={$$props.class}>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    class="animate-spin"
    style="margin: auto; display: block; shape-rendering: auto;"
    viewBox="0 0 100 100"
    {width}
    {height}
    preserveAspectRatio="xMidYMid"
  >
    <circle
      cx="50"
      cy="50"
      fill="none"
      stroke={color}
      stroke-width={stroke}
      r="35"
      stroke-dasharray="164.93361431346415 56.97787143782138"
    />
  </svg>
</div>
