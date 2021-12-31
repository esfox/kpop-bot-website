<script>
  import classNames from 'classnames';

  import { paginate, PaginationNav } from 'svelte-paginate';

  import Button from './Button.svelte';

  export let items = [];
  export let currentPage = 1;
  export let pageSize = 10;
  export let onChangePage = () => {};

  let total = items.length;

  $: paginatedItems = paginate({
    items: items,
    pageSize,
    currentPage,
  });

  export let paginatedItems = paginateItems();

  function paginateItems() {
    paginate({
      items: items,
      pageSize,
      currentPage,
    });
  }

  const changePage = ({ detail }) => {
    currentPage = detail.page;
    onChangePage();
  };
</script>

{#if paginatedItems.length > 0}
  <PaginationNav
    totalItems={total}
    {pageSize}
    {currentPage}
    limit={1}
    showStepOptions={true}
    let:value={page}
    on:setPage={changePage}
  >
    <Button slot="prev" class="rounded-full mr-2">
      <i class="fa fa-chevron-left" />
    </Button>

    <Button
      slot="number"
      class={classNames('rounded-full', currentPage == page ? 'bg-primary' : 'bg-transparent')}
    >
      {page}
    </Button>

    <Button slot="ellipsis" class="rounded-full" icon>...</Button>

    <Button slot="next" class="rounded-full ml-2">
      <i class="fa fa-chevron-right" />
    </Button>
  </PaginationNav>
{/if}
