
import React from 'react';
import type { Filters } from '../types';
import { AGE_CATEGORIES, GENRE_CATEGORIES, THEME_CATEGORIES } from '../constants';

interface CategoryFilterProps {
  filters: Filters;
  onFilterChange: (filterType: keyof Filters, value: string) => void;
}

const FilterSection: React.FC<{
  title: string;
  categories: string[];
  activeCategory: string;
  filterKey: keyof Filters;
  onSelect: (filterType: keyof Filters, value: string) => void;
}> = ({ title, categories, activeCategory, filterKey, onSelect }) => {
  return (
    <div className="mb-8">
      <h3 className="text-2xl font-bold font-fredoka text-brand-blue mb-4">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelect(filterKey, category)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
              activeCategory === category
                ? 'bg-brand-pink text-white shadow-md'
                : 'bg-white text-brand-gray hover:bg-brand-cyan hover:text-white'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};


const CategoryFilter: React.FC<CategoryFilterProps> = ({ filters, onFilterChange }) => {
  return (
    <div className="bg-brand-beige/50 p-6 rounded-2xl shadow-lg sticky top-8">
      <FilterSection
        title="Kelompok Usia"
        categories={AGE_CATEGORIES}
        activeCategory={filters.age}
        filterKey="age"
        onSelect={onFilterChange}
      />
      <FilterSection
        title="Genre Cerita"
        categories={GENRE_CATEGORIES}
        activeCategory={filters.genre}
        filterKey="genre"
        onSelect={onFilterChange}
      />
      <FilterSection
        title="Tema Cerita"
        categories={THEME_CATEGORIES}
        activeCategory={filters.theme}
        filterKey="theme"
        onSelect={onFilterChange}
      />
    </div>
  );
};

export default CategoryFilter;
