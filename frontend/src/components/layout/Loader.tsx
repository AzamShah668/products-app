import React, { useState, useEffect } from 'react';

const Loader: React.FC = () => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const t = setTimeout(() => setHidden(true), 2500);
    return () => { clearTimeout(t); document.body.style.overflow = ''; };
  }, []);
  useEffect(() => {
    if (hidden) document.body.style.overflow = '';
  }, [hidden]);

  return (
    <div id="loader" className={`loader ${hidden ? 'hidden' : ''}`}>
      <div className="loader-content">
        <div className="loader-logo">
          <div className="logo-circle" />
          <span className="logo-text">AXM ENTERPRISES</span>
        </div>
        <div className="loader-progress">
          <div className="progress-bar" />
        </div>
      </div>
    </div>
  );
};

export default Loader;
