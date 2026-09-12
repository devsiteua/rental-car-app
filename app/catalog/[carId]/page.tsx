import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { fetchCarById } from '@/lib/api/cars';

import CarDetails from './CarDetails';

interface CarPageProps {
  params: Promise<{ carId: string }>;
}

async function getCar(carId: string) {
  try {
    return await fetchCarById(carId);
  } catch {
    notFound();
  }
}

export async function generateMetadata({
  params,
}: CarPageProps): Promise<Metadata> {
  const { carId } = await params;
  const car = await getCar(carId);

  const title = `${car.brand} ${car.model}, ${car.year}`;

  return {
    title,
    description: car.description,
    openGraph: {
      title,
      description: car.description,
      images: [{ url: car.img }],
    },
  };
}

export default async function CarPage({ params }: CarPageProps) {
  const { carId } = await params;
  const car = await getCar(carId);

  return <CarDetails car={car} />;
}
