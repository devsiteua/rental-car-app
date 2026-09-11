import Image from 'next/image';
import Link from 'next/link';

import css from './page.module.css';

export default function Home() {
  return (
    <main>
      <section className={css.hero}>
        <Image
          src="/hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className={css.image}
        />
        <div className={css.overlay} />

        <div className={css.content}>
          <div className={css.text}>
            <h1 className={css.title}>Find your perfect rental car</h1>
            <p className={css.subtitle}>
              Reliable and budget-friendly rentals for any journey
            </p>
          </div>

          <Link href="/catalog" className={css.button}>
            View Catalog
          </Link>
        </div>
      </section>
    </main>
  );
}
