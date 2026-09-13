'use client';

import Image from 'next/image';

import css from './EmptyState.module.css';

interface EmptyStateProps {
  onReset: () => void;
}

export default function EmptyState({ onReset }: EmptyStateProps) {
  return (
    <div className={css.wrapper}>
      <Image
        className={css.image}
        src="/no-cars-found.png"
        alt=""
        width={414}
        height={388}
      />

      <div className={css.message}>
        <h2 className={css.title}>No cars found</h2>
        <p className={css.text}>
          We couldn&apos;t find any cars that match your current filters. Try
          changing your search criteria or reset the filters.
        </p>
      </div>

      <button className={css.reset} type="button" onClick={onReset}>
        Reset filters
      </button>
    </div>
  );
}
