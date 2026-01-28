/**
 * Image utility functions for generating product images
 * Based on product data, generates appropriate placeholder images
 */

export interface ImageOptions {
  width?: number;
  height?: number;
  text?: string;
  bgColor?: string;
  textColor?: string;
}

/**
 * Generates a placeholder image URL based on product data
 * Uses placeholder.com service with product-specific parameters
 */
export const generateProductImage = (
  productName: string,
  category: string,
  _productId?: number,
  options: ImageOptions = {}
): string => {
  const width = options.width || 600;
  const height = options.height || 600;
  
  // Generate colors based on category
  const categoryColors: Record<string, { bg: string; text: string }> = {
    men: { bg: '4A90E2', text: 'FFFFFF' },
    women: { bg: 'E91E63', text: 'FFFFFF' },
    general: { bg: '9E9E9E', text: 'FFFFFF' },
  };

  const colors = categoryColors[category] || categoryColors.general;
  const bgColor = options.bgColor || colors.bg;
  const textColor = options.textColor || colors.text;

  // Create a short text from product name (max 20 chars)
  const text = options.text || productName.substring(0, 20).replace(/\s+/g, '+');

  // Use placeholder.com service
  return `https://via.placeholder.com/${width}x${height}/${bgColor}/${textColor}?text=${encodeURIComponent(text)}`;
};

/**
 * Generates a more sophisticated placeholder using picsum.photos with seed
 * This provides consistent images for the same product
 */
export const generateSeededImage = (
  productId: number,
  width: number = 600,
  height: number = 600
): string => {
  // Use product ID as seed for consistent images
  return `https://picsum.photos/seed/product-${productId}/${width}/${height}`;
};

/**
 * Gets the best available image URL for a product
 * Falls back to generated placeholder if no image_url is provided
 */
export const getProductImageUrl = (
  imageUrl: string | null | undefined,
  productName: string,
  category: string,
  productId?: number
): string => {
  if (imageUrl && imageUrl.trim() !== '') {
    return imageUrl;
  }
  
  if (productId) {
    // Use seeded image for consistency
    return generateSeededImage(productId);
  }
  
  // Fallback to placeholder with product name
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
    return false;
  }
};
