'use client';

import Link from 'next/link';

import css from './ErrorState.module.css';

interface ErrorStateProps {
  title: string;
  text: string;
  onRetry?: () => void;
}

export default function ErrorState({ title, text, onRetry }: ErrorStateProps) {
  return (
    <div className={css.wrapper}>
      <h1 className={css.title}>{title}</h1>
      <p className={css.text}>{text}</p>

      {onRetry ? (
        <button className={css.action} type="button" onClick={onRetry}>
          Try again
        </button>
      ) : (
        <Link className={css.action} href="/catalog">
          Go to catalog
        </Link>
      )}
    </div>
  );
}
