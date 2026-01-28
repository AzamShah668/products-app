/**
 * Application-wide constants
 */

export const CATEGORIES = {
  MEN: 'men',
  WOMEN: 'women',
  GENERAL: 'general',
} as const;

export const CATEGORY_LABELS: Record<string, string> = {
  [CATEGORIES.MEN]: "Men's",
  [CATEGORIES.WOMEN]: "Women's",
  [CATEGORIES.GENERAL]: 'General',
};

export const CATEGORY_COLORS: Record<string, { bg: string; text: string; badge: string }> = {
  [CATEGORIES.MEN]: {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    badge: 'bg-blue-600',
  },
  [CATEGORIES.WOMEN]: {
    bg: 'bg-pink-100',
    text: 'text-pink-800',
    badge: 'bg-pink-600',
  },
  [CATEGORIES.GENERAL]: {
    bg: 'bg-gray-100',
    text: 'text-gray-800',
    badge: 'bg-gray-600',
  },
};

export const STOCK_STATUS = {
  IN_STOCK: {
    label: 'In Stock',
    bg: 'bg-green-100',
    text: 'text-green-800',
  },
  OUT_OF_STOCK: {
    label: 'Out of Stock',
    bg: 'bg-red-100',
    text: 'text-red-800',
  },
} as const;

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  PRODUCTS: '/products',
  PRODUCT_NEW: '/products/new',
  PRODUCT_DETAIL: (id: number) => `/products/${id}`,
  PRODUCT_EDIT: (id: number) => `/products/${id}/edit`,
} as const;
