import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleStart = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <section className="view active">
      <div className="branding-header">
        <div className="branding-content">
          <p className="presenter-text">PRODUCTS HUB PRESENTS</p>
          <h2 className="app-tagline">Your Product Management Solution</h2>
        </div>
        <div className="wave-container">
          <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path
              fill="#ffffff"
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>

      <div className="welcome-container">
        <div className="hero">
          <h1>Welcome to ProductsHub</h1>
          <p>Manage your products with ease and efficiency.</p>

          <button className="main-cta" onClick={handleStart}>
            Get Started
          </button>

          <div style={{ marginTop: '25px' }}>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>
              Already have an account?{' '}
              <span
                onClick={() => navigate('/login')}
                style={{
                  color: '#2c786c',
                  fontWeight: 700,
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  marginLeft: '5px',
                }}
              >
                Sign In
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
