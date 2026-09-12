'use client';

import type { FormEvent } from 'react';

import Select from '@/components/Select/Select';
import { useFiltersStore } from '@/lib/store/filtersStore';

import css from './Filters.module.css';

interface FiltersProps {
  brands: string[];
  prices: string[];
}

export default function Filters({ brands, prices }: FiltersProps) {
  const draft = useFiltersStore(state => state.draft);
  const setDraftField = useFiltersStore(state => state.setDraftField);
  const applyFilters = useFiltersStore(state => state.applyFilters);
  const clearFilters = useFiltersStore(state => state.clearFilters);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    applyFilters();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.row}>
        <Select
          className={css.brand}
          label="Car brand"
          placeholder="Choose a brand"
          options={brands}
          value={draft.brand}
          onChange={brand => setDraftField('brand', brand)}
        />

        <Select
          className={css.price}
          label="Price/ 1 hour"
          placeholder="Choose a price"
          options={prices}
          value={draft.price}
          onChange={price => setDraftField('price', price)}
          formatValue={price => `To $${price}`}
        />

        <div className={css.mileage}>
          <span className={css.label}>Car mileage / km</span>

          <div className={css.inputs}>
            <input
              className={css.input}
              type="number"
              min={0}
              max={draft.maxMileage || undefined}
              placeholder="From"
              aria-label="Mileage from"
              value={draft.minMileage}
              onChange={event =>
                setDraftField('minMileage', event.target.value)
              }
            />
            <input
              className={css.input}
              type="number"
              min={draft.minMileage || 0}
              placeholder="To"
              aria-label="Mileage to"
              value={draft.maxMileage}
              onChange={event =>
                setDraftField('maxMileage', event.target.value)
              }
            />
          </div>
        </div>

        <button className={css.search} type="submit">
          Search
        </button>
      </div>

      <button className={css.clear} type="button" onClick={clearFilters}>
        Clear filters
      </button>
    </form>
  );
}
