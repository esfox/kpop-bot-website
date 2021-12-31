<script context="module">
  /** @type {import('@sveltejs/kit').Load} */
  export async function load({ fetch, url }) {
    const queryParams = url.searchParams;
    const fancamsParams = {};
    let page = queryParams.get('page');
    page = page ? Number(page) : undefined;

    const search = queryParams.get('search') || undefined;
    if (search) fancamsParams.search = search;
    if (!page && !search) fancamsParams.random = true;

    const queryString = new URLSearchParams(fancamsParams).toString();
    const response = await fetch(`/api/fancams?${queryString}`);
    if (response.ok)
      return {
        props: {
          fancams: await response.json(),
          page,
          search,
        },
      };

    if (response.status === 404) return { status: 404 };

    return {
      status: response.status,
    };
  }
</script>

<script>
  import Input from '../components/Input.svelte';
  import Button from '../components/Button.svelte';
  import Loader from '../components/Loader.svelte';
  import Pagination from '../components/Pagination.svelte';
  import Fancams from '../views/Fancams.svelte';
  import { onMount } from 'svelte';

  export let fancams;
  export let page;
  export let search;

  let isMounted = false;
  let isLoading = false;
  let paginatedFancams;
  let errorMessage;

  onMount(() => (isMounted = true));

  const searchFancams = async () => {
    if (!search) return;

    isLoading = true;
    try {
      const queryString = new URLSearchParams({ search }).toString();
      const response = await fetch(`/api/fancams?${queryString}`);
      const data = await response.json();
      fancams = data;
    } catch (error) {
      console.error(error);
      errorMessage = 'An error occurred. Please try again.';
    }
    isLoading = false;
  };

  const scrollToTop = () => window.scrollTo(0, 0);
</script>

<main class="flex flex-col items-center px-16 py-12">
  <div class="sticky top-0 w-full flex justify-center bg-bg flex py-6 z-10">
    <Input
      type="search"
      class="w-80 rounded-l-lg py-3"
      placeholder="Search fancams by idol..."
      autofocus
      on:enter={searchFancams}
      bind:value={search}
    />
    <Button class="rounded-r-lg" on:click={searchFancams}>
      <i class="fa fa-search fa-lg" />
    </Button>
  </div>

  {#if isLoading || !isMounted}
    <Loader class="mt-8" />
  {:else if errorMessage}
    <div class="text-red-400 mt-8">
      {errorMessage}
    </div>
  {:else if isMounted}
    <Fancams class="py-16" fancams={paginatedFancams} />
    <Pagination
      items={fancams}
      pageSize={20}
      onChangePage={scrollToTop}
      bind:currentPage={page}
      bind:paginatedItems={paginatedFancams}
    />
  {/if}
</main>
