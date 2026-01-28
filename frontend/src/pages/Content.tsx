import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Content: React.FC = () => {
  const location = useLocation();
  const state = location.state as { title?: string; content?: string } | null;

  const title = state?.title || 'Content';
  const content = state?.content || 'No content available';

  return (
    <section className="about" style={{ paddingTop: 'var(--spacing-lg)', paddingBottom: 'var(--spacing-xl)' }}>
      <div className="container">
        <div className="about-content" style={{ gridTemplateColumns: '1fr', maxWidth: '720px', margin: '0 auto' }}>
          <div className="about-text">
            <Link to="/dashboard" className="btn btn-secondary" style={{ marginBottom: '1.5rem', display: 'inline-flex' }}>
              <i className="fas fa-arrow-left" style={{ marginRight: '0.5rem' }} />
              <span>Back to Dashboard</span>
            </Link>
            <h2 className="section-title" style={{ marginBottom: '1rem' }}>
              {title}
            </h2>
            <div
              className="about-description"
              style={{ whiteSpace: 'pre-line', lineHeight: 1.8 }}
            >
              {content}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Content;
