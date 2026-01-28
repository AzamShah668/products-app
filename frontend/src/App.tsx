import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Loader from './components/layout/Loader';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Content from './pages/Content';
import Products from './components/products/Products';
import ProductDetail from './components/products/ProductDetail';
import ProductForm from './components/products/ProductForm';
import Register from './components/auth/Register';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <div className="app-container">
        <Loader />
        <Routes>
          {/* Home: full abc landing, no Layout */}
          <Route path="/" element={<Home />} />

          {/* Public with Layout */}
          <Route path="/welcome" element={<Navigate to="/" replace />} />
          <Route path="/login" element={<Layout><Login /></Layout>} />
          <Route path="/register" element={<Layout><Register /></Layout>} />
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/content" element={<Layout><Content /></Layout>} />

          {/* Protected product routes with Layout */}
          <Route path="/products" element={<ProtectedRoute><Layout><Products /></Layout></ProtectedRoute>} />
          <Route path="/products/new" element={<ProtectedRoute><Layout><ProductForm /></Layout></ProtectedRoute>} />
          <Route path="/products/:id/edit" element={<ProtectedRoute><Layout><ProductForm /></Layout></ProtectedRoute>} />
          <Route path="/products/:id" element={<ProtectedRoute><Layout><ProductDetail /></Layout></ProtectedRoute>} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;
