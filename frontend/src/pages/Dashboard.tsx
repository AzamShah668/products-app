import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <section className="products" style={{ paddingTop: 'var(--spacing-lg)', paddingBottom: 'var(--spacing-xl)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Dashboard</span>
          <h2 className="section-title">
            <span>Welcome{user ? `, ${user.full_name || user.username}` : ''}</span>
          </h2>
          <p className="section-description">
            Manage your products and explore the catalog
          </p>
        </div>

        <div className="features-grid" style={{ marginTop: '2rem' }}>
          <div className="feature-card" style={{ cursor: 'pointer' }} onClick={() => navigate('/products')} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && navigate('/products')}>
            <div className="feature-icon"><i className="fas fa-box" /></div>
            <h3 className="feature-title">View Products</h3>
            <p className="feature-description">Browse and manage your product catalog</p>
          </div>

          <div className="feature-card" style={{ cursor: 'pointer' }} onClick={() => navigate('/products/new')} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && navigate('/products/new')}>
            <div className="feature-icon"><i className="fas fa-plus" /></div>
            <h3 className="feature-title">Add New Product</h3>
            <p className="feature-description">Create a new product in your catalog</p>
          </div>

          <div className="feature-card" style={{ cursor: 'pointer' }} onClick={() => navigate('/products')} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && navigate('/products')}>
            <div className="feature-icon"><i className="fas fa-search" /></div>
            <h3 className="feature-title">Search Products</h3>
            <p className="feature-description">Find products by category or name</p>
          </div>

          {user && (
            <div className="feature-card" style={{ cursor: 'default' }}>
              <div className="feature-icon"><i className="fas fa-user" /></div>
              <h3 className="feature-title">My Account</h3>
              <p className="feature-description">{user.full_name || user.username}</p>
            </div>
          )}
        </div>

        <div className="section-cta" style={{ marginTop: '2rem' }}>
          <Link to="/" className="btn btn-outline">
            <span>Return to Home</span>
            <i className="fas fa-arrow-right" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
