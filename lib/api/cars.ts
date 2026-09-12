import axios from 'axios';

import type { BookingRequest, Car, CarFilters } from '@/types/car';

export const CARS_PER_PAGE = 12;

export interface FetchCarsResponse {
  cars: Car[];
  totalCars: number;
  totalPages: number;
  page: number;
  perPage: number;
}

export interface FetchCarsParams {
  page: number;
  perPage: number;
  brand?: string;
  price?: number;
  minMileage?: number;
  maxMileage?: number;
}

export interface BookingResponse {
  message: string;
}

const carRentalApi = axios.create({
  baseURL: 'https://car-rental-api.goit.study',
});

export async function fetchCars({
  page,
  perPage,
  brand,
  price,
  minMileage,
  maxMileage,
}: FetchCarsParams): Promise<FetchCarsResponse> {
  const response = await carRentalApi.get<FetchCarsResponse>('/cars', {
    params: {
      page,
      perPage,
      brand,
      price,
      minMileage,
      maxMileage,
    },
  });

  return response.data;
}

export async function fetchCarFilters(): Promise<CarFilters> {
  const response = await carRentalApi.get<CarFilters>('/cars/filters');

  return response.data;
}

export async function fetchCarById(carId: string): Promise<Car> {
  const response = await carRentalApi.get<Car>(`/cars/${carId}`);

  return response.data;
}

export async function createBookingRequest(
  carId: string,
  booking: BookingRequest
): Promise<BookingResponse> {
  const response = await carRentalApi.post<BookingResponse>(
    `/cars/${carId}/booking-requests`,
    booking
  );

  return response.data;
}
