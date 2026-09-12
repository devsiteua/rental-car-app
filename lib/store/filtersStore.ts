import { create } from 'zustand';

export interface FilterValues {
  brand: string;
  price: string;
  minMileage: string;
  maxMileage: string;
}

export const emptyFilters: FilterValues = {
  brand: '',
  price: '',
  minMileage: '',
  maxMileage: '',
};

type FiltersStore = {
  draft: FilterValues;
  applied: FilterValues;
  setDraftField: (field: keyof FilterValues, value: string) => void;
  applyFilters: () => void;
  clearFilters: () => void;
};

export const useFiltersStore = create<FiltersStore>()(set => ({
  draft: emptyFilters,
  applied: emptyFilters,

  setDraftField: (field, value) =>
    set(state => ({ draft: { ...state.draft, [field]: value } })),

  applyFilters: () => set(state => ({ applied: state.draft })),

  clearFilters: () => set({ draft: emptyFilters, applied: emptyFilters }),
}));
