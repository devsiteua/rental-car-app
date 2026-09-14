'use client';

import ErrorState from '@/components/ErrorState/ErrorState';

interface AppErrorProps {
  error: Error & { digest?: string };
  retry: () => void;
}

export default function AppError({ retry }: AppErrorProps) {
  return (
    <ErrorState
      title="Something went wrong"
      text="An unexpected error occurred. Please try again."
      onRetry={retry}
    />
  );
}
