'use client';

import { useInfiniteQuery } from '@tanstack/react-query';

import CarList from '@/components/CarList/CarList';
import { CARS_PER_PAGE, fetchCars } from '@/lib/api/cars';

import css from './Catalog.module.css';

export default function CatalogClient() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['cars'],
      queryFn: ({ pageParam }) =>
        fetchCars({ page: pageParam, perPage: CARS_PER_PAGE }),
      initialPageParam: 1,
      getNextPageParam: lastPage =>
        lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    });

  const cars = data?.pages.flatMap(page => page.cars) ?? [];

  return (
    <main className={css.catalog}>
      <h1 className="visually-hidden">Car catalog</h1>

      <CarList cars={cars} />

      {hasNextPage && (
        <button
          className={css.loadMore}
          type="button"
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? 'Loading...' : 'Load more'}
        </button>
      )}
    </main>
  );
}
