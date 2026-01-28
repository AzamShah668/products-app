import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ErrorAlert from '../components/common/ErrorAlert';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login, error } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) return;
    try {
      setIsLoading(true);
      await login(username, password);
      navigate('/dashboard');
    } catch {
      // Error handled by auth context
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleLogin();
  };

  return (
    <section className="form-section">
      <div className="container">
        <div className="form-card">
          <div className="section-header" style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
            <span className="section-tag">Secure Access</span>
            <h2 className="section-title" style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>
              Sign In
            </h2>
            <p className="section-description" style={{ marginBottom: 0 }}>
              Enter your credentials to continue
            </p>
          </div>

          {error && (
            <div style={{ marginBottom: '1rem' }}>
              <ErrorAlert message={error} />
            </div>
          )}

          <div className="field">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              className="input"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={handleKeyPress}
              disabled={isLoading}
            />
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyPress}
              disabled={isLoading}
            />
          </div>

          <button
            type="button"
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}
            onClick={handleLogin}
            disabled={isLoading || !username || !password}
          >
            <span>{isLoading ? 'Logging in...' : 'Login'}</span>
            {!isLoading && <i className="fas fa-arrow-right" />}
          </button>

          <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.95rem', color: 'var(--gray)' }}>
            Don&apos;t have an account?{' '}
            <Link to="/register" style={{ color: 'var(--primary)', fontWeight: 600 }}>
              Sign up
            </Link>
          </p>

          <button
            type="button"
            onClick={() => navigate('/')}
            className="btn btn-secondary"
            style={{ width: '100%', marginTop: '0.75rem', justifyContent: 'center', background: 'transparent', color: 'var(--gray)', border: '1px solid var(--gray-light)' }}
          >
            <span>Back to Home</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Login;
