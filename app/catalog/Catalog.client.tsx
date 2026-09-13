'use client';

import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';

import CarList from '@/components/CarList/CarList';
import EmptyState from '@/components/EmptyState/EmptyState';
import ErrorState from '@/components/ErrorState/ErrorState';
import Filters from '@/components/Filters/Filters';
import Loader from '@/components/Loader/Loader';
import { CARS_PER_PAGE, fetchCars } from '@/lib/api/cars';
import { useFiltersStore } from '@/lib/store/filtersStore';

import css from './Catalog.module.css';

interface CatalogClientProps {
  brands: string[];
  prices: string[];
}

export default function CatalogClient({ brands, prices }: CatalogClientProps) {
  const applied = useFiltersStore(state => state.applied);
  const clearFilters = useFiltersStore(state => state.clearFilters);
  const { brand, price, minMileage, maxMileage } = applied;

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isError,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['cars', applied],
    queryFn: ({ pageParam }) =>
      fetchCars({
        page: pageParam,
        perPage: CARS_PER_PAGE,
        brand: brand || undefined,
        price: price ? Number(price) : undefined,
        minMileage: minMileage ? Number(minMileage) : undefined,
        maxMileage: maxMileage ? Number(maxMileage) : undefined,
      }),
    initialPageParam: 1,
    getNextPageParam: lastPage =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    placeholderData: keepPreviousData,
  });

  const cars = data?.pages.flatMap(page => page.cars) ?? [];
  const isLoading = isFetching && !isFetchingNextPage;
  const isEmpty = !isLoading && cars.length === 0;

  return (
    <main className={css.catalog}>
      <h1 className="visually-hidden">Car catalog</h1>

      <Filters brands={brands} prices={prices} />

      {isError ? (
        <ErrorState
          title="Could not load the cars"
          text="Something went wrong while fetching cars. Please try again."
          onRetry={() => refetch()}
        />
      ) : isEmpty ? (
        <EmptyState onReset={clearFilters} />
      ) : (
        <>
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
        </>
      )}

      {isLoading && (
        <div className={css.overlay}>
          <Loader
            title="Loading cars..."
            text="Please wait while we fetch the best cars for you"
          />
        </div>
      )}
    </main>
  );
}
