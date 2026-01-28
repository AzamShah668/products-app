import React from 'react';
import { CATEGORY_LABELS } from '../../utils/constants';

interface CategoryBadgeProps {
  category: string;
  className?: string;
}

const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category, className = '' }) => {
  const label = CATEGORY_LABELS[category] || category;
  const variant = ['men', 'women', 'general'].includes(category) ? category : 'general';

  return (
    <span className={`badge badge-category-${variant} ${className}`.trim()}>
      {label}
    </span>
  );
};

export default CategoryBadge;
