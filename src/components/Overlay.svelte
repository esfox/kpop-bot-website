<script>
  export let shown;
  export let withCloseButton = false;

  export const show = () => (shown = true);
  export const hide = () => (shown = false);
  export const toggle = () => (shown = !shown);
</script>

{#if shown}
  <div class="fixed z-10 inset-0 overflow-y-auto" role="dialog" aria-modal="true">
    {#if withCloseButton}
      <button
        class="transform absolute top-0 right-0 rounded-full bg-white z-20 p-2 m-4"
        on:click={hide}
      >
        <img src="x.svg" alt="close" width="16" height="16" />
      </button>
    {/if}
    <div class="grid place-items-center min-h-screen px-4">
      <!--
        Background overlay, show/hide based on modal state.

        Entering: "ease-out duration-300"
          From: "opacity-0"
          To: "opacity-100"
        Leaving: "ease-in duration-200"
          From: "opacity-100"
          To: "opacity-0"
      -->
      <div
        class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        aria-hidden="true"
        on:click={hide}
      />

      <!--
        Modal panel, show/hide based on modal state.

        Entering: "ease-out duration-300"
          From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          To: "opacity-100 translate-y-0 sm:scale-100"
        Leaving: "ease-in duration-200"
          From: "opacity-100 translate-y-0 sm:scale-100"
          To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      -->
      <slot />
    </div>
  </div>
{/if}
