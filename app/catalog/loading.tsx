import Loader from '@/components/Loader/Loader';

export default function Loading() {
  return (
    <Loader
      title="Loading cars..."
      text="Please wait while we fetch the best cars for you"
    />
  );
}
