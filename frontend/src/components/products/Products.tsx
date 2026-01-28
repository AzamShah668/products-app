import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Product, productsAPI } from '../../api/client';
import { getProductImageUrl } from '../../utils/imageUtils';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorAlert from '../common/ErrorAlert';
import CategoryBadge from '../common/CategoryBadge';
import StockBadge from '../common/StockBadge';
import { CATEGORIES, CATEGORY_LABELS } from '../../utils/constants';

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') return products;
    return products.filter((p) => p.category === selectedCategory);
  }, [products, selectedCategory]);

  const categoryCounts = useMemo(() => ({
    all: products.length,
    [CATEGORIES.MEN]: products.filter((p) => p.category === CATEGORIES.MEN).length,
    [CATEGORIES.WOMEN]: products.filter((p) => p.category === CATEGORIES.WOMEN).length,
    [CATEGORIES.GENERAL]: products.filter((p) => p.category === CATEGORIES.GENERAL).length,
  }), [products]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await productsAPI.getProducts();
      setProducts(data);
    } catch (err: unknown) {
      setError((err as { response?: { data?: { detail?: string } } })?.response?.data?.detail || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      setDeletingId(id);
      await productsAPI.deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err: unknown) {
      setError((err as { response?: { data?: { detail?: string } } })?.response?.data?.detail || 'Failed to delete product');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <LoadingSpinner fullScreen />;

  return (
    <section className="products fade-in" style={{ paddingTop: 'var(--spacing-lg)', paddingBottom: 'var(--spacing-xl)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Our Collection</span>
          <h2 className="section-title">
            <span>Product</span>
            <span className="title-highlight">Catalog</span>
          </h2>
          <p className="section-description">
            Manage your product inventory. Add, edit, and organize your products.
          </p>
          <div style={{ marginTop: '1rem' }}>
            <Link to="/products/new" className="btn btn-primary">
              <i className="fas fa-plus" />
              <span>Add New Product</span>
            </Link>
          </div>
        </div>

        {/* Category filter */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--gray)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Filter by Category
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {[
              { key: 'all', label: 'All' },
              { key: CATEGORIES.MEN, label: CATEGORY_LABELS[CATEGORIES.MEN] },
              { key: CATEGORIES.WOMEN, label: CATEGORY_LABELS[CATEGORIES.WOMEN] },
              { key: CATEGORIES.GENERAL, label: CATEGORY_LABELS[CATEGORIES.GENERAL] },
            ].map(({ key, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => setSelectedCategory(key)}
                className={selectedCategory === key ? 'btn btn-primary' : 'btn btn-outline'}
                style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
              >
                {label} ({categoryCounts[key as keyof typeof categoryCounts]})
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div style={{ marginBottom: '1.5rem' }}>
            <ErrorAlert message={error} onDismiss={() => setError(null)} />
          </div>
        )}

        {filteredProducts.length === 0 ? (
          <div className="section-cta" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--gray-light)' }}>
              <i className="fas fa-box-open" />
            </div>
            <h3 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
              No products found
            </h3>
            <p className="section-description" style={{ marginBottom: '1.5rem' }}>
              {selectedCategory === 'all'
                ? 'Get started by creating your first product'
                : `No products in ${CATEGORY_LABELS[selectedCategory] || selectedCategory}`}
            </p>
            <Link to="/products/new" className="btn btn-primary">
              <i className="fas fa-plus" />
              <span>Create your first product</span>
            </Link>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((p) => (
              <div key={p.id} className="product-card">
                <div
                  className="product-image"
                  style={{
                    backgroundImage: `url('${getProductImageUrl(p.image_url, p.name, p.category, p.id)}')`,
                  }}
                >
                  <div style={{ position: 'absolute', top: '1rem', left: '1rem', zIndex: 2 }}>
                    <CategoryBadge category={p.category} />
                  </div>
                  <div style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 2 }}>
                    <StockBadge inStock={p.in_stock} />
                  </div>
                </div>
                <div className="product-info">
                  <span className="product-category">{CATEGORY_LABELS[p.category] || p.category}</span>
                  <h3 className="product-name">{p.name}</h3>
                  <p className="product-description">
                    {(p.description || 'Crafted for the discerning connoisseur').slice(0, 70)}
                    {(p.description?.length ?? 0) > 70 ? '…' : ''}
                  </p>
                  <div className="product-footer" style={{ flexWrap: 'wrap', gap: '0.5rem' }}>
                    <span className="product-price">${Number(p.price).toFixed(2)}</span>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <Link to={`/products/${p.id}`} className="btn btn-primary" style={{ padding: '0.5rem 0.75rem', fontSize: '0.8rem' }}>
                        <i className="fas fa-eye" />
                        <span>View</span>
                      </Link>
                      <Link to={`/products/${p.id}/edit`} className="btn btn-secondary" style={{ padding: '0.5rem 0.75rem', fontSize: '0.8rem' }}>
                        <i className="fas fa-edit" />
                        <span>Edit</span>
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(p.id)}
                        disabled={deletingId === p.id}
                        className="btn"
                        style={{ padding: '0.5rem 0.75rem', fontSize: '0.8rem', background: 'rgba(239,68,68,0.9)', color: 'var(--white)', border: 'none' }}
                      >
                        {deletingId === p.id ? '…' : <><i className="fas fa-trash" /><span>Delete</span></>}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;
