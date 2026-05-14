// Using picsum.photos with fixed seeds for consistent fashion-style images
export const categories = [
  {
    id: 1,
    name: 'Men',
    slug: 'men',
    image: '/men_yellow_shirt.png',
    video: '/videos/men_walking.mp4',
    count: 140,
  },
  {
    id: 2,
    name: 'Women',
    slug: 'women',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4', // Replace with a real 3D video URL
    hoverImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80',
    count: 220,
  },
  {
    id: 3,
    name: 'Kids',
    slug: 'kids',
    image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&q=80',
    video: '/@fs/C:/Users/Dell/Downloads/WhatsApp%20Video%202026-03-30%20at%203.04.56%20PM.mp4',
    hoverImage: 'https://images.unsplash.com/photo-1503919005314-30d93d07d823?w=600&q=80',
    count: 95,
  },
]

export const featuredProducts = [
  { id: 20, name: 'Linen Casual Shirt', category: 'Men', subcategory: 'Shirts', price: 99, oldPrice: 139, rating: 4.7, reviews: 184, image: '/men-card-1-final.png', badge: 'NEW', colors: ['#2d6a4f', '#e07a8f', '#6b1a2e'], images: ['/shirt-pink.png', '/shirt-maroon.png'], hoverVideo: '/shirt-hover.mp4' },
  { id: 21, name: 'Stripe Linen Shirt', category: 'Men', subcategory: 'Shirts', price: 109, oldPrice: 149, rating: 4.8, reviews: 97, image: '/shirt-stripe-full.png', badge: 'NEW', colors: ['#8b7355', '#4a6741', '#f5f0e8'], images: ['/shirt-stripe-close.png'], hoverVideo: '/shirt-stripe-hover.mp4' },
  { id: 22, name: 'Quarter Zip Hoodie', category: 'Men', subcategory: 'Hoodies', price: 119, oldPrice: 159, rating: 4.8, reviews: 142, image: '/hoodie-green.png', badge: 'NEW', colors: ['#1a4a2e', '#6b1a2e'], images: ['/hoodie-maroon.png'], hoverVideo: '/hoodie-hover.mp4' },
  { id: 25, name: 'Kids Casual Shorts Set', category: 'Kids', subcategory: 'Shorts', price: 69, oldPrice: 89, rating: 4.7, reviews: 98, image: '/kids-short-grey.png', badge: 'NEW', colors: ['#5a5a5a', '#1a2c6b', '#6b7a3a'], images: ['/kids-short-navy.png', '/kids-short-olive.png'], hoverVideo: '/kids-short-hover.mp4' },
  { id: 24, name: 'Striped Polo Tee', category: 'Kids', subcategory: 'T-Shirts', price: 59, oldPrice: 79, rating: 4.8, reviews: 113, image: '/kids-polo-pink.png', badge: 'NEW', colors: ['#e8a0c0', '#1a2c6b', '#2a7fbf'], images: ['/kids-polo-navy.png', '/kids-polo-blue.png'], hoverVideo: '/kids-polo-hover.mp4' },
  { id: 26, name: 'Floral Peplum Top', category: 'Women', subcategory: 'Tops', price: 89, oldPrice: 119, rating: 4.8, reviews: 167, image: '/women-top-card1-v2.png', badge: 'NEW', colors: ['#e8a0b0', '#6b1a2e', '#f5f0e8'], images: ['/women-top-maroon.png', '/women-top-cream.png'], hoverVideo: '/women-top-hover.mp4' },
  { id: 23, name: 'Satin Formal Shirt', category: 'Women', subcategory: 'Formal', price: 129, oldPrice: 179, rating: 4.9, reviews: 86, image: '/women-formal-pink.png', badge: 'NEW', colors: ['#e8b4c8', '#1a4a2e'], images: ['/women-formal-green.png'], hoverVideo: '/women-formal-hover.mp4' },
]

export const newArrivals = [
]

export const testimonials = [
  { id: 1, name: 'Sophia Reeves', role: 'Fashion Blogger', rating: 5, avatar: 'https://i.pravatar.cc/80?img=47', text: 'TwistWear has completely elevated my wardrobe. The quality is unparalleled — every stitch speaks luxury. My followers are obsessed with my hauls!' },
  { id: 2, name: 'Marcus Chen', role: 'Creative Director', rating: 5, avatar: 'https://i.pravatar.cc/80?img=11', text: 'I\'ve shopped luxury brands globally. TwistWear delivers that same premium feel at a fraction of the cost. The Obsidian Overcoat is my statement piece.' },
  { id: 3, name: 'Amara Nwosu', role: 'Stylist & Model', rating: 5, avatar: 'https://i.pravatar.cc/80?img=5', text: 'The attention to detail is extraordinary. From packaging to the garment itself — it feels like opening a gift from Paris every single time.' },
  { id: 4, name: 'Lucas Ferreira', role: 'Entrepreneur', rating: 5, avatar: 'https://i.pravatar.cc/80?img=33', text: 'Fast shipping, immaculate packaging, and the clothes fit perfectly. TwistWear is my go-to for every important meeting and event.' },
]
