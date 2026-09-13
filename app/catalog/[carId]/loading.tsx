import Loader from '@/components/Loader/Loader';

export default function Loading() {
  return (
    <Loader
      title="Loading car details..."
      text="Please wait while we fetch the information for you"
    />
  );
}
