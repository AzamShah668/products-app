import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Product, productsAPI } from '../api/client';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import BackToTop from '../components/layout/BackToTop';

const PLACEHOLDERS = [
  'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
  'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80',
  'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80',
  'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80',
];

function img(p: Product) {
  return p.image_url?.trim() || PLACEHOLDERS[(p.id ?? 0) % PLACEHOLDERS.length];
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const productsRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    productsAPI.getProducts().then((r) => { setProducts(r.data); }).catch(() => setProducts([])).finally(() => setLoading(false));
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <Navbar />
      {/* Hero */}
      <section id="home" className="hero">
        <div className="hero-background">
          <div className="gradient-orb orb-1" />
          <div className="gradient-orb orb-2" />
          <div className="gradient-orb orb-3" />
        </div>
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-text">New Collection 2026</span>
            <div className="badge-line" />
          </div>
          <h1 className="hero-title">
            <span className="title-line">Redefining the</span>
            <span className="title-line title-accent">Art of Living</span>
          </h1>
          <p className="hero-description">
            Elevate your style with our meticulously crafted products that seamlessly blend form and function.
            Discover the perfect balance of quality, innovation, and sophistication.
          </p>
          <div className="hero-actions">
            <button type="button" className="btn btn-primary" onClick={() => scrollTo('products')}>
              <span>Shop Now</span>
              <i className="fas fa-arrow-right" />
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => scrollTo('explore')}>
              <span>Explore Collection</span>
              <i className="fas fa-play" />
            </button>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">{products.length || 500}</div>
              <div className="stat-label">Premium Products</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50</div>
              <div className="stat-label">Countries</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">98</div>
              <div className="stat-label">Satisfaction %</div>
            </div>
          </div>
        </div>
        <div className="scroll-indicator">
          <div className="mouse"><div className="wheel" /></div>
          <div className="arrow"><span /><span /><span /></div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="products" ref={productsRef}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Our Collection</span>
            <h2 className="section-title">
              <span>Discover the Perfect</span>
              <span className="title-highlight">Finishing Touch</span>
            </h2>
            <p className="section-description">
              Experience the embodiment of timeless elegance and modern sophistication in our thoughtfully designed collection.
            </p>
          </div>
          {loading ? (
            <div className="products-grid" style={{ placeItems: 'center', padding: '4rem' }}>
              <div className="loader-circle" style={{ width: 48, height: 48, border: '3px solid var(--gray-light)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
            </div>
          ) : (
            <div className="products-grid">
              {products.slice(0, 6).map((p, i) => (
                <div key={p.id} className="product-card" data-aos="fade-up" style={{ animationDelay: `${i * 100}ms` }}>
                  <div className="product-image" style={{ backgroundImage: `url('${img(p)}')` }}>
                    <div className="product-overlay">
                      <Link to={`/products/${p.id}`} className="btn-quick-view"><i className="fas fa-eye" /> Quick View</Link>
                      <button type="button" className="btn-wishlist"><i className="far fa-heart" /></button>
                    </div>
                    {i % 4 === 1 && <div className="product-badge sale">Sale</div>}
                    {i % 4 === 0 && <div className="product-badge">New</div>}
                  </div>
                  <div className="product-info">
                    <span className="product-category">{p.category || 'Collection'}</span>
                    <h3 className="product-name">{p.name}</h3>
                    <p className="product-description">{(p.description || 'Crafted for the discerning connoisseur').slice(0, 60)}{(p.description?.length ?? 0) > 60 ? '…' : ''}</p>
                    <div className="product-footer">
                      <span className="product-price">${Number(p.price).toFixed(2)}</span>
                      <button type="button" className="btn-add-cart" aria-label="Add to cart"><i className="fas fa-shopping-bag" /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="section-cta">
            <Link to="/products" className="btn btn-outline"><span>View All Products</span><i className="fas fa-arrow-right" /></Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card" data-aos="zoom-in">
              <div className="feature-icon"><i className="fas fa-gem" /></div>
              <h3 className="feature-title">Premium Quality</h3>
              <p className="feature-description">Meticulously crafted with the finest materials and attention to detail</p>
            </div>
            <div className="feature-card" data-aos="zoom-in" data-aos-delay="100">
              <div className="feature-icon"><i className="fas fa-shipping-fast" /></div>
              <h3 className="feature-title">Fast Shipping</h3>
              <p className="feature-description">Worldwide delivery with express options available</p>
            </div>
            <div className="feature-card" data-aos="zoom-in" data-aos-delay="200">
              <div className="feature-icon"><i className="fas fa-shield-alt" /></div>
              <h3 className="feature-title">Secure Payment</h3>
              <p className="feature-description">Your transactions are protected with industry-leading security</p>
            </div>
            <div className="feature-card" data-aos="zoom-in" data-aos-delay="300">
              <div className="feature-icon"><i className="fas fa-headset" /></div>
              <h3 className="feature-title">24/7 Support</h3>
              <p className="feature-description">Our dedicated team is here to assist you anytime</p>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="about" ref={aboutRef}>
        <div className="container">
          <div className="about-content">
            <div className="about-text" data-aos="fade-right">
              <span className="section-tag">Our Story</span>
              <h2 className="section-title">
                <span>Crafted for the</span>
                <span className="title-highlight">Discerning Connoisseur</span>
              </h2>
              <p className="about-description">
                Immerse yourself in a world of exceptional quality and timeless design. Our collection is
                meticulously crafted to elevate your everyday experiences, seamlessly blending form and function.
              </p>
              <p className="about-description">
                From luxurious accents to functional essentials, each piece is a testament to our unwavering
                commitment to quality and innovation.
              </p>
              <div className="about-stats">
                <div className="about-stat">
                  <div className="about-stat-number">15+</div>
                  <div className="about-stat-label">Years of Excellence</div>
                </div>
                <div className="about-stat">
                  <div className="about-stat-number">100K+</div>
                  <div className="about-stat-label">Happy Customers</div>
                </div>
              </div>
              <Link to="/products" className="btn btn-primary"><span>Learn More</span><i className="fas fa-arrow-right" /></Link>
            </div>
            <div className="about-image" data-aos="fade-left">
              <div className="image-wrapper" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80')" }}>
                <div className="image-overlay" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explore */}
      <section id="explore" className="explore">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Discover More</span>
            <h2 className="section-title">
              <span>Explore Our</span>
              <span className="title-highlight">Lifestyle Collection</span>
            </h2>
          </div>
          <div className="explore-grid">
            <div className="explore-card large" data-aos="fade-up">
              <div className="explore-image" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80')" }}>
                <div className="explore-overlay">
                  <h3 className="explore-title">Elevate Your Home</h3>
                  <Link to="/products" className="btn btn-white"><span>Shop Now</span><i className="fas fa-arrow-right" /></Link>
                </div>
              </div>
            </div>
            <div className="explore-card" data-aos="fade-up" data-aos-delay="100">
              <div className="explore-image" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80')" }}>
                <div className="explore-overlay">
                  <h3 className="explore-title">Amplify Your Style</h3>
                  <Link to="/products" className="btn btn-white"><span>Explore</span><i className="fas fa-arrow-right" /></Link>
                </div>
              </div>
            </div>
            <div className="explore-card" data-aos="fade-up" data-aos-delay="200">
              <div className="explore-image" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80')" }}>
                <div className="explore-overlay">
                  <h3 className="explore-title">Nurture Your Sanctuary</h3>
                  <Link to="/products" className="btn btn-white"><span>Discover</span><i className="fas fa-arrow-right" /></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter">
        <div className="container">
          <div className="newsletter-content">
            <div className="newsletter-text" data-aos="fade-right">
              <h2 className="newsletter-title">Stay in the Loop</h2>
              <p className="newsletter-description">
                Be the first to discover new collections, exclusive offers, and special events.
              </p>
            </div>
            <form className="newsletter-form" data-aos="fade-left" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <input type="email" placeholder="Enter your email address" required />
                <button type="submit" className="btn btn-primary"><span>Subscribe</span><i className="fas fa-arrow-right" /></button>
              </div>
              <p className="form-note">We respect your privacy. Unsubscribe at any time.</p>
            </form>
          </div>
        </div>
      </section>
      <Footer />
      <BackToTop />
    </>
  );
};

export default Home;
