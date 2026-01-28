import React, { useState } from 'react';
import { getProductImageUrl } from '../../utils/imageUtils';
import { Product } from '../../api/client';

interface ImageWithFallbackProps {
  product: Product;
  className?: string;
  alt?: string;
  width?: number;
  height?: number;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  product,
  className = '',
  alt,
  width = 600,
  height = 600,
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const imageUrl = getProductImageUrl(
    product.image_url,
    product.name,
    product.category,
    product.id
  );

  if (imageError) {
    return (
      <div
        className={className}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, var(--gray-light), var(--bg))',
          minHeight: '200px',
        }}
      >
        <i className="fas fa-image" style={{ fontSize: '2.5rem', color: 'var(--gray)' }} aria-hidden />
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {imageLoading && (
        <div
          className="spinner-wrapper"
          style={{ position: 'absolute', inset: 0, background: 'var(--bg)' }}
        >
          <div className="spinner" />
        </div>
      )}
      <img
        src={imageUrl}
        alt={alt || product.name}
        onError={() => setImageError(true)}
        onLoad={() => setImageLoading(false)}
        loading="lazy"
        width={width}
        height={height}
        className={className}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: imageLoading ? 0 : 1,
          transition: 'opacity 0.3s ease',
        }}
      />
    </div>
  );
};

export default ImageWithFallback;
