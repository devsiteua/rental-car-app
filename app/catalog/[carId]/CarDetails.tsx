import Image from 'next/image';
import {
  LuCalendar,
  LuCar,
  LuCircleCheck,
  LuFuel,
  LuGauge,
  LuMapPin,
  LuSettings,
} from 'react-icons/lu';

import { formatMileage } from '@/lib/formatMileage';
import type { Car } from '@/types/car';
import BookingForm from '@/components/BookingForm/BookingForm';

import css from './CarDetails.module.css';

interface CarDetailsProps {
  car: Car;
}

export default function CarDetails({ car }: CarDetailsProps) {
  const {
    id,
    brand,
    model,
    year,
    img,
    description,
    rentalPrice,
    rentalConditions,
    mileage,
    stockNumber,
    features,
    location,
    type,
    fuelConsumption,
    engine,
  } = car;

  return (
    <main className={css.layout}>
      <div className={css.gallery}>
        <div className={css.imageWrapper}>
          <Image
            src={img}
            alt={`${brand} ${model}`}
            fill
            sizes="640px"
            priority
            className={css.image}
          />
        </div>
        <BookingForm carId={id} />
      </div>

      <div className={css.card}>
        <div className={css.intro}>
          <div className={css.heading}>
            <div className={css.titleRow}>
              <h1 className={css.title}>
                {brand} {model}, {year}
              </h1>
              <p className={css.article}>Article: {stockNumber}</p>
            </div>

            <div className={css.meta}>
              <p className={css.location}>
                <LuMapPin size={16} />
                {location.city}, {location.country}
              </p>

              <p className={css.price}>${rentalPrice}</p>
            </div>
          </div>

          <p className={css.description}>{description}</p>
        </div>

        <div className={css.info}>
          <section className={css.section}>
            <h2 className={css.sectionTitle}>Rental Conditions:</h2>

            <ul className={css.list}>
              {rentalConditions.map(condition => (
                <li className={css.item} key={condition}>
                  <LuCircleCheck size={16} />
                  {condition}
                </li>
              ))}
            </ul>
          </section>

          <section className={css.section}>
            <h2 className={css.sectionTitle}>Car Specifications:</h2>

            <ul className={css.list}>
              <li className={css.item}>
                <LuCalendar size={16} />
                Year: {year}
              </li>
              <li className={css.item}>
                <LuCar size={16} />
                Type: {type}
              </li>
              <li className={css.item}>
                <LuFuel size={16} />
                Fuel Consumption: {fuelConsumption}
              </li>
              <li className={css.item}>
                <LuSettings size={16} />
                Engine: {engine}
              </li>
              <li className={css.item}>
                <LuGauge size={16} />
                Mileage: {formatMileage(mileage)}
              </li>
            </ul>
          </section>

          <section className={css.section}>
            <h2 className={css.sectionTitle}>Features</h2>

            <ul className={css.list}>
              {features.map(feature => (
                <li className={css.item} key={feature}>
                  <LuCircleCheck size={16} />
                  {feature}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
