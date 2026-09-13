import ErrorState from '@/components/ErrorState/ErrorState';

export default function NotFound() {
  return (
    <ErrorState
      title="Page not found"
      text="The page you are looking for does not exist or has been moved."
    />
  );
}
