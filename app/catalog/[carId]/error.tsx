'use client';

import ErrorState from '@/components/ErrorState/ErrorState';

interface CarErrorProps {
  error: Error & { digest?: string };
  retry: () => void;
}

export default function CarError({ retry }: CarErrorProps) {
  return (
    <ErrorState
      title="Could not load this car"
      text="Something went wrong while fetching the car details. Please try again."
      onRetry={retry}
    />
  );
}
