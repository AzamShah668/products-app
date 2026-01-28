/**
 * Image utility functions for generating product images
 * Modified to prioritize local images from Docker volumes
 */

export interface ImageOptions {
  width?: number;
  height?: number;
  text?: string;
  bgColor?: string;
  textColor?: string;
}

/**
 * Generates a fallback placeholder image URL using via.placeholder.com
 */
export const generateProductImage = (
  productName: string,
  category: string,
  _productId?: number,
  options: ImageOptions = {}
): string => {
  const width = options.width || 600;
  const height = options.height || 600;

  const categoryColors: Record<string, { bg: string; text: string }> = {
    men: { bg: '4A90E2', text: 'FFFFFF' },
    women: { bg: 'E91E63', text: 'FFFFFF' },
    general: { bg: '9E9E9E', text: 'FFFFFF' },
  };

  const colors = categoryColors[category] || categoryColors.general;
  const bgColor = options.bgColor || colors.bg;
  const textColor = options.textColor || colors.text;
  const text = options.text || productName.substring(0, 20).replace(/\s+/g, '+');

  return `https://via.placeholder.com/${width}x${height}/${bgColor}/${textColor}?text=${encodeURIComponent(text)}`;
};

/**
 * Generates a local path to the images stored in your Docker volumes
 * Based on the folder structure: /images/products/[men|women]/[prefix]-[id].jpg
 */
export const generateSeededImage = (
  productId: number,
  category: string = 'men'
): string => {
  // Determine folder and filename prefix based on category
  const isWomen = category.toLowerCase() === 'women';
  const folder = isWomen ? 'women' : 'men';
  const prefix = isWomen ? 'women-shirt' : 'mens-shirt';
  
  // Returns path like: /images/products/men/mens-shirt-1.jpg
  return `/images/products/${folder}/${prefix}-${productId}.jpg`;
};

/**
 * Gets the best available image URL for a product
 * Prioritizes local volume images over external placeholders
 */
export const getProductImageUrl = (
  imageUrl: string | null | undefined,
  productName: string,
  category: string,
  productId?: number
): string => {
  // 1. If a valid external URL is provided in the DB (that isn't a placeholder), use it
  if (imageUrl && imageUrl.trim() !== '' && !imageUrl.includes('picsum.photos') && !imageUrl.includes('placeholder')) {
    return imageUrl;
  }

  // 2. Use our local Docker volume images if a productId is available
  if (productId) {
    return generateSeededImage(productId, category);
  }

  // 3. Absolute fallback to a generated placeholder
  return generateProductImage(productName, category, productId);
};

/**
 * Validates if an image URL is valid
 */
export const isValidImageUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return ['http:', 'https:'].includes(urlObj.protocol);
  } catch {
    // If it's a local path like /images/..., it's valid for our app
    return url.startsWith('/');
  }
};
