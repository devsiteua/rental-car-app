import Image from 'next/image';
import Link from 'next/link';

import { formatMileage } from '@/lib/formatMileage';
import type { Car } from '@/types/car';

import css from './CarCard.module.css';

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  const {
    id,
    brand,
    model,
    year,
    img,
    rentalPrice,
    rentalCompany,
    type,
    mileage,
    location,
  } = car;

  return (
    <article className={css.card}>
      <div className={css.content}>
        <div className={css.imageWrapper}>
          <Image
            src={img}
            alt={`${brand} ${model}`}
            fill
            sizes="244px"
            className={css.image}
          />
        </div>

        <div className={css.details}>
          <div className={css.info}>
            <h2 className={css.title}>
              {brand} <span className={css.model}>{model}</span>, {year}
            </h2>
            <p className={css.price}>${rentalPrice}</p>
          </div>

          <ul className={css.tags}>
            <li className={css.tag}>{location.city}</li>
            <li className={css.tag}>{location.country}</li>
            <li className={css.tag}>{rentalCompany}</li>
            <li className={css.tag}>{type}</li>
            <li className={css.tag}>{formatMileage(mileage)}</li>
          </ul>
        </div>
      </div>

      <Link
        className={css.button}
        href={`/catalog/${id}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Read more about ${brand} ${model}`}
      >
        Read more
      </Link>
    </article>
  );
}
