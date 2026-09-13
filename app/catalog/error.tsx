'use client';

import ErrorState from '@/components/ErrorState/ErrorState';

interface CatalogErrorProps {
  error: Error & { digest?: string };
  retry: () => void;
}

export default function CatalogError({ retry }: CatalogErrorProps) {
  return (
    <ErrorState
      title="Could not load the catalog"
      text="Something went wrong while fetching the cars. Please try again."
      onRetry={retry}
    />
  );
}
