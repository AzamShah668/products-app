import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Product, productsAPI } from '../../api/client';
import { getProductImageUrl } from '../../utils/imageUtils';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorAlert from '../common/ErrorAlert';
import CategoryBadge from '../common/CategoryBadge';
import StockBadge from '../common/StockBadge';
import { ROUTES } from '../../utils/constants';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (id) fetchProduct(parseInt(id, 10));
  }, [id]);

  const fetchProduct = async (productId: number) => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await productsAPI.getProduct(productId);
      setProduct(data);
    } catch (err: unknown) {
      setError((err as { response?: { data?: { detail?: string } } })?.response?.data?.detail || 'Failed to fetch product');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!product || !window.confirm('Are you sure you want to delete this product?')) return;
    try {
      setDeleting(true);
      await productsAPI.deleteProduct(product.id);
      navigate(ROUTES.PRODUCTS);
    } catch (err: unknown) {
      setError((err as { response?: { data?: { detail?: string } } })?.response?.data?.detail || 'Failed to delete');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <LoadingSpinner fullScreen />;

  if (error || !product) {
    return (
      <section className="form-section">
        <div className="container">
          <div className="form-card" style={{ maxWidth: '480px', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', color: 'var(--gray-light)', marginBottom: '1rem' }}>
              <i className="fas fa-exclamation-circle" />
            </div>
            <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Error</h2>
            <p className="section-description" style={{ marginBottom: '1.5rem' }}>{error || 'Product not found'}</p>
            <Link to={ROUTES.PRODUCTS} className="btn btn-primary">
              <span>Back to Products</span>
              <i className="fas fa-arrow-right" />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const imgUrl = getProductImageUrl(product.image_url, product.name, product.category, product.id);

  return (
    <section className="about fade-in" style={{ paddingTop: 'var(--spacing-lg)', paddingBottom: 'var(--spacing-xl)' }}>
      <div className="container">
        <div className="about-content" style={{ gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
          <div className="about-image">
            <div
              className="image-wrapper"
              style={{
                paddingTop: '100%',
                backgroundImage: `url('${imgUrl}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="image-overlay" />
            </div>
          </div>

          <div className="about-text">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center', marginBottom: '1rem' }}>
              <CategoryBadge category={product.category} />
              <StockBadge inStock={product.in_stock} />
            </div>
            <h1 className="section-title" style={{ marginBottom: '0.75rem' }}>{product.name}</h1>

            {error && (
              <div style={{ marginBottom: '1rem' }}>
                <ErrorAlert message={error} onDismiss={() => setError(null)} />
              </div>
            )}

            <div style={{ marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--gray)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Price</span>
              <p className="product-price" style={{ fontSize: '2rem', marginTop: '0.25rem' }}>${Number(product.price).toFixed(2)}</p>
            </div>

            {product.description && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem' }}>Description</h3>
                <p className="about-description" style={{ marginBottom: 0 }}>{product.description}</p>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--gray-light)' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--gray)', textTransform: 'uppercase' }}>Product ID</span>
                <p style={{ margin: '0.25rem 0 0', fontWeight: 600 }}>#{product.id}</p>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--gray)', textTransform: 'uppercase' }}>Category</span>
                <p style={{ margin: '0.25rem 0 0', fontWeight: 600, textTransform: 'capitalize' }}>{product.category}</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid var(--gray-light)' }}>
              <Link to={ROUTES.PRODUCT_EDIT(product.id)} className="btn btn-primary">
                <i className="fas fa-edit" />
                <span>Edit Product</span>
              </Link>
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="btn"
                style={{ background: 'rgba(239,68,68,0.9)', color: 'var(--white)', border: 'none' }}
              >
                <i className="fas fa-trash" />
                <span>{deleting ? 'Deleting…' : 'Delete'}</span>
              </button>
              <Link to={ROUTES.PRODUCTS} className="btn btn-secondary">
                <span>Back to Products</span>
                <i className="fas fa-arrow-left" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
