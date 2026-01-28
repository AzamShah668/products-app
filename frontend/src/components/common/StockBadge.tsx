import React from 'react';
import { STOCK_STATUS } from '../../utils/constants';

interface StockBadgeProps {
  inStock: boolean;
  className?: string;
}

const StockBadge: React.FC<StockBadgeProps> = ({ inStock, className = '' }) => {
  const status = inStock ? STOCK_STATUS.IN_STOCK : STOCK_STATUS.OUT_OF_STOCK;

  return (
    <span className={`badge badge-stock-${inStock ? 'in' : 'out'} ${className}`.trim()}>
      {status.label}
    </span>
  );
};

export default StockBadge;
