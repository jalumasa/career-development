import React, { useMemo } from 'react';

/**
 * Row of category filter chips, derived from whatever `items` are passed in.
 * Renders nothing when there's only one category, since a lone "All" chip
 * filters nothing. Used by both the Resources and Networking pages.
 */
const CategoryFilter = ({ items, active, onChange }) => {
  const categories = useMemo(() => {
    const found = new Set(items.map((item) => item.category).filter(Boolean));
    return ['All', ...Array.from(found).sort()];
  }, [items]);

  if (categories.length <= 1) return null;

  return (
    <div className="filter-chips">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className={`filter-chip${active === category ? ' is-active' : ''}`}
          aria-pressed={active === category}
          onClick={() => onChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
