import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductCreate, productsAPI } from '../../api/client';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorAlert from '../common/ErrorAlert';
import { CATEGORIES, ROUTES } from '../../utils/constants';

const ProductForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState<ProductCreate>({
    name: '',
    description: '',
    price: 0,
    in_stock: true,
    image_url: '',
    category: CATEGORIES.GENERAL,
  });
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(isEditing);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isEditing && id) fetchProduct(parseInt(id, 10));
  }, [id, isEditing]);

  const fetchProduct = async (productId: number) => {
    try {
      setFetchLoading(true);
      const { data } = await productsAPI.getProduct(productId);
      setFormData({
        name: data.name,
        description: data.description || '',
        price: data.price,
        in_stock: data.in_stock,
        image_url: data.image_url || '',
        category: data.category || CATEGORIES.GENERAL,
      });
    } catch {
      setError('Failed to fetch product');
      navigate(ROUTES.PRODUCTS);
    } finally {
      setFetchLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setFormData((prev) => ({ ...prev, price: Number.isNaN(v) ? 0 : v }));
  };

  const validate = (): boolean => {
    if (!formData.name.trim()) {
      setError('Product name is required');
      return false;
    }
    if (formData.price <= 0) {
      setError('Price must be greater than 0');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      setLoading(true);
      setError(null);
      if (isEditing && id) {
        await productsAPI.updateProduct(parseInt(id, 10), formData);
      } else {
        await productsAPI.createProduct(formData);
      }
      navigate(ROUTES.PRODUCTS);
    } catch (err: unknown) {
      setError((err as { response?: { data?: { detail?: string } } })?.response?.data?.detail || `Failed to ${isEditing ? 'update' : 'create'} product`);
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) return <LoadingSpinner fullScreen />;

  return (
    <section className="form-section">
      <div className="container">
        <div className="form-card" style={{ maxWidth: '560px' }}>
          <div className="section-header" style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
            <span className="section-tag">{isEditing ? 'Edit' : 'New Product'}</span>
            <h2 className="section-title" style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>
              {isEditing ? 'Edit Product' : 'Create New Product'}
            </h2>
            <p className="section-description" style={{ marginBottom: 0 }}>
              {isEditing ? 'Update product information below' : 'Fill in the details to add a new product'}
            </p>
          </div>

          {error && (
            <div style={{ marginBottom: '1rem' }}>
              <ErrorAlert message={error} onDismiss={() => setError(null)} />
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="name">Product Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                className="input"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={loading}
                placeholder="Enter product name"
              />
            </div>

            <div className="field">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                className="input"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                disabled={loading}
                placeholder="Enter product description (optional)"
                style={{ resize: 'vertical', minHeight: '100px' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="field">
                <label htmlFor="category">Category *</label>
                <select
                  id="category"
                  name="category"
                  className="input"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  disabled={loading}
                >
                  <option value={CATEGORIES.GENERAL}>General</option>
                  <option value={CATEGORIES.MEN}>Men&apos;s</option>
                  <option value={CATEGORIES.WOMEN}>Women&apos;s</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="price">Price *</label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--gray)', fontWeight: 600 }}>$</span>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    className="input"
                    value={formData.price}
                    onChange={handlePriceChange}
                    min={0}
                    step={0.01}
                    required
                    disabled={loading}
                    placeholder="0.00"
                    style={{ paddingLeft: '2rem' }}
                  />
                </div>
              </div>
            </div>

            <div className="field">
              <label htmlFor="image_url">Image URL</label>
              <input
                type="url"
                id="image_url"
                name="image_url"
                className="input"
                value={formData.image_url}
                onChange={handleChange}
                disabled={loading}
                placeholder="https://example.com/image.jpg"
              />
              <p style={{ fontSize: '0.8rem', color: 'var(--gray)', marginTop: '0.25rem' }}>
                Optional. Leave empty for a generated placeholder.
              </p>
            </div>

            <div className="field" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', background: 'var(--bg)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--gray-light)' }}>
              <input
                type="checkbox"
                id="in_stock"
                name="in_stock"
                checked={formData.in_stock}
                onChange={handleChange}
                disabled={loading}
                style={{ width: '1.25rem', height: '1.25rem', accentColor: 'var(--primary)' }}
              />
              <label htmlFor="in_stock" style={{ marginBottom: 0, cursor: 'pointer' }}>Product is in stock</label>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--gray-light)' }}>
              <button type="submit" className="btn btn-primary" disabled={loading} style={{ flex: 1, minWidth: '140px' }}>
                {loading ? <span>{(isEditing ? 'Updating' : 'Creating')}…</span> : <><span>{isEditing ? 'Update' : 'Create'} Product</span><i className="fas fa-arrow-right" /></>}
              </button>
              <button type="button" onClick={() => navigate(ROUTES.PRODUCTS)} className="btn btn-secondary" disabled={loading} style={{ flex: 1, minWidth: '100px' }}>
                <span>Cancel</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ProductForm;
