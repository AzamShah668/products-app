import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  className = '',
  fullScreen = false,
}) => {
  const sizeClass = size === 'lg' ? 'spinner-lg' : '';

  return (
    <div
      className={`spinner-wrapper ${fullScreen ? 'spinner-wrapper--full' : 'spinner-wrapper--inline'} ${className}`.trim()}
      role="status"
      aria-label="Loading"
    >
      <div className={`spinner ${sizeClass}`} />
    </div>
  );
};

export default LoadingSpinner;
