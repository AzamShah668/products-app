# ProductsHub Frontend

A production-ready React + TypeScript frontend for the Products Management System.

## Features

- 🎨 **Modern UI/UX**: Beautiful, responsive design with Tailwind CSS
- 🖼️ **Smart Image Handling**: Automatic placeholder generation based on product data
- 🔒 **Authentication**: Secure login and registration with JWT tokens
- 📦 **Product Management**: Full CRUD operations for products
- 🏷️ **Category Filtering**: Filter products by category (Men's, Women's, General)
- ⚡ **Performance**: Optimized with lazy loading, memoization, and code splitting
- ♿ **Accessibility**: ARIA labels, keyboard navigation, and semantic HTML
- 🎯 **Type Safety**: Full TypeScript coverage
- 🧩 **Reusable Components**: Modular, maintainable component architecture

## Tech Stack

- **React 18** with TypeScript
- **React Router** for navigation
- **Axios** for API communication
- **Tailwind CSS** for styling
- **Vite** for build tooling

## Project Structure

```
src/
├── api/              # API client and types
├── components/       # React components
│   ├── auth/        # Authentication components
│   ├── common/      # Reusable UI components
│   ├── products/    # Product-related components
│   └── Navbar.tsx   # Navigation bar
├── contexts/        # React contexts (Auth)
├── utils/           # Utility functions
│   ├── constants.ts # App-wide constants
│   └── imageUtils.ts # Image generation utilities
├── App.tsx          # Main app component
├── main.tsx         # Entry point
├── index.css        # Global styles
└── App.css          # App-specific styles
```

## Key Components

### Common Components
- **LoadingSpinner**: Reusable loading indicator
- **ErrorAlert**: Error message display
- **ImageWithFallback**: Smart image component with fallback
- **CategoryBadge**: Category display badge
- **StockBadge**: Stock status indicator

### Product Components
- **Products**: Product listing with filtering
- **ProductDetail**: Detailed product view
- **ProductForm**: Create/edit product form

### Auth Components
- **Login**: User login form
- **Register**: User registration form

## Image Generation

The app automatically generates placeholder images for products without image URLs:

- Uses `picsum.photos` with product ID as seed for consistent images
- Falls back to `placeholder.com` with category-based colors
- Images are generated based on product name, category, and ID

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Format code
npm run format
```

## Environment Variables

Create a `.env` file:

```env
VITE_API_URL=http://localhost:8000
```

For production (Docker), the nginx proxy handles API routing automatically.

## Production Build

The frontend is containerized with Docker:

1. Builds the React app using Vite
2. Serves with nginx
3. Proxies API requests to backend
4. Handles client-side routing

## Code Quality

- ✅ TypeScript for type safety
- ✅ ESLint for code linting
- ✅ Prettier for code formatting
- ✅ Consistent code structure
- ✅ Reusable components
- ✅ Error handling
- ✅ Loading states
- ✅ Accessibility features

## Performance Optimizations

- Lazy loading for images
- Memoization for expensive computations
- Optimized re-renders with React hooks
- Code splitting with Vite
- Gzip compression in nginx
- Static asset caching

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
