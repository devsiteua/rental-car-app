import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import type { Metadata } from 'next';

import { CARS_PER_PAGE, fetchCars } from '@/lib/api/cars';

import CatalogClient from './Catalog.client';

export const metadata: Metadata = {
  title: 'Catalog',
  description:
    'Browse available rental cars, filter by brand, price and mileage.',
};

export default async function CatalogPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['cars'],
    queryFn: ({ pageParam }) =>
      fetchCars({ page: pageParam, perPage: CARS_PER_PAGE }),
    initialPageParam: 1,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CatalogClient />
    </HydrationBoundary>
  );
}
