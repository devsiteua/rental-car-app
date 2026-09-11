'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import css from './Header.module.css';

export default function Header() {
  const pathname = usePathname();

  const linkClass = (href: string) =>
    pathname === href ? `${css.link} ${css.active}` : css.link;

  return (
    <header className={css.header}>
      <div className={css.container}>
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="RentalCar"
            width={104}
            height={16}
            priority
            unoptimized
          />
        </Link>

        <nav>
          <ul className={css.menu}>
            <li>
              <Link href="/" className={linkClass('/')}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/catalog" className={linkClass('/catalog')}>
                Catalog
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
