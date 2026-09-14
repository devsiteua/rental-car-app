# RentalCar

RentalCar is a car rental application built with Next.js App Router and
TypeScript. Users can browse the car catalog, filter it by brand, price and
mileage, open a details page for any car and submit a rental request.

**Live demo:** [RentalCar](https://rental-car-app-xi.vercel.app/)

## Features

- Home page with a hero section and a link to the catalog
- Car catalog with backend filtering by brand, rental price and mileage range
- Load more pagination with `useInfiniteQuery` from TanStack Query
- Filters state management with Zustand
- Car details page with specifications, rental conditions and accessories
- Booking form with validation built on Formik and Yup
- Toast notification after a successful booking
- Dynamic SEO metadata for the car details page
- Loading, error, not-found and empty result states
- Server-side data prefetching and hydration with TanStack Query

## Pages

| Route              | Description                                            |
| ------------------ | ------------------------------------------------------ |
| `/`                | Home page with a hero banner and a View Catalog button |
| `/catalog`         | Car catalog with filters and a Load more button        |
| `/catalog/[carId]` | Car details, rental conditions and a booking form      |

The details page opens in a new tab from the Read more button on a car card.

## Technologies

- Next.js
- React
- TypeScript
- TanStack Query
- Zustand
- Formik
- Yup
- Axios
- React Hot Toast
- React Icons
- CSS Modules

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in the browser.

Build and run the production version:

```bash
npm run build
npm start
```

The application does not require environment variables.

## API

The application uses the public
[car rental API](https://car-rental-api.goit.study/api-docs/):

- `GET /cars` — paginated list of cars with optional filters
- `GET /cars/:id` — details of a single car
- `GET /cars/filters` — available brands and price range
- `POST /cars/:id/booking-requests` — submits a booking request

## Author

Yurii, [devsiteua](https://github.com/devsiteua)
