import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import ErrorAlert from '../common/ErrorAlert';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    full_name: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const { register, error } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setValidationError(null);
  };

  const validateForm = (): boolean => {
    if (!formData.username.trim()) {
      setValidationError('Username is required');
      return false;
    }
    if (!formData.email.trim()) {
      setValidationError('Email is required');
      return false;
    }
    if (!formData.password) {
      setValidationError('Password is required');
      return false;
    }
    if (formData.password.length < 6) {
      setValidationError('Password must be at least 6 characters long');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setValidationError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      setIsLoading(true);
      setValidationError(null);
      await register({
        username: formData.username,
        email: formData.email,
        full_name: formData.full_name || undefined,
        password: formData.password,
      });
      navigate('/dashboard');
    } catch {
      // Error handled by auth context
    } finally {
      setIsLoading(false);
    }
  };

  const displayError = validationError || error;

  return (
    <section className="form-section">
      <div className="container">
        <div className="form-card">
          <div className="section-header" style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
            <span className="section-tag">Create Account</span>
            <h2 className="section-title" style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>
              Sign Up
            </h2>
            <p className="section-description" style={{ marginBottom: 0 }}>
              Fill in your details to get started
            </p>
          </div>

          {displayError && (
            <div style={{ marginBottom: '1rem' }}>
              <ErrorAlert message={displayError} />
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="username">Username *</label>
              <input
                type="text"
                id="username"
                name="username"
                className="input"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>

            <div className="field">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                className="input"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>

            <div className="field">
              <label htmlFor="full_name">Full Name (optional)</label>
              <input
                type="text"
                id="full_name"
                name="full_name"
                className="input"
                placeholder="Full Name"
                value={formData.full_name}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            <div className="field">
              <label htmlFor="password">Password * (min. 6 characters)</label>
              <input
                type="password"
                id="password"
                name="password"
                className="input"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>

            <div className="field">
              <label htmlFor="confirmPassword">Confirm Password *</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="input"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}
              disabled={isLoading}
            >
              <span>{isLoading ? 'Creating account...' : 'Create Account'}</span>
              {!isLoading && <i className="fas fa-arrow-right" />}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.95rem', color: 'var(--gray)' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 600 }}>
              Login here
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
