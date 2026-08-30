import { Product } from '@/types';

const sampleReviews = (base: string) => [
  {
    id: `${base}-r1`,
    author: 'Charlotte M.',
    rating: 5,
    date: '2026-05-12',
    title: 'Exceeded expectations',
    body: 'The craftsmanship is stunning — feels every bit as luxurious in person. Packaging alone felt like a gift.',
    verified: true,
  },
  {
    id: `${base}-r2`,
    author: 'Isabella R.',
    rating: 4,
    date: '2026-04-28',
    title: 'Beautiful piece',
    body: 'Gorgeous detail and true to the photos. Shipping to the UK took a few extra days but well worth the wait.',
    verified: true,
  },
  {
    id: `${base}-r3`,
    author: 'Sophie K.',
    rating: 5,
    date: '2026-03-15',
    title: 'My new everyday favourite',
    body: 'Lux Pick Florence never disappoints. This has quickly become the piece I reach for most.',
    verified: false,
  },
];

export const products: Product[] = [
  // ---------------- BAGS ----------------
  {
    id: '1',
    slug: 'florence-structured-tote',
    name: 'Florence Structured Tote',
    category: 'Bags',
    price: 429,
    oldPrice: 590,
    rating: 4.8,
    reviewCount: 214,
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=900&q=80',
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=900&q=80',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=900&q=80',
    ],
    colors: [
      { name: 'Noir', hex: '#111111' },
      { name: 'Blush', hex: '#FF66C4' },
      { name: 'Ivory', hex: '#F7F7F7' },
    ],
    sizes: ['One Size'],
    description:
      'Hand-finished in Italian full-grain leather, the Florence Structured Tote pairs an architectural silhouette with a supple, buttery interior. A timeless investment piece designed to carry you from morning meetings to evening dinners.',
    specifications: [
      { label: 'Material', value: 'Full-grain Italian leather' },
      { label: 'Dimensions', value: '34 x 27 x 14 cm' },
      { label: 'Hardware', value: '24k gold-plated' },
      { label: 'Interior', value: 'Suede lining, 3 compartments' },
      { label: 'Origin', value: 'Made in Italy' },
    ],
    reviews: sampleReviews('tote'),
    isBestSeller: true,
    isSale: true,
    sku: 'LPF-BAG-001',
  },
  {
    id: '2',
    slug: 'mini-chain-shoulder-bag',
    name: 'Mini Chain Shoulder Bag',
    category: 'Bags',
    price: 349,
    rating: 4.7,
    reviewCount: 158,
    images: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=900&q=80',
      'https://images.unsplash.com/photo-1548863227-3af567fc3b27?w=900&q=80',
    ],
    colors: [
      { name: 'Noir', hex: '#111111' },
      { name: 'Blush', hex: '#FF66C4' },
    ],
    sizes: ['One Size'],
    description:
      'A quilted mini shoulder bag finished with a sculpted chain strap. Compact yet endlessly versatile — the perfect companion for evenings out.',
    specifications: [
      { label: 'Material', value: 'Quilted lambskin leather' },
      { label: 'Dimensions', value: '20 x 14 x 7 cm' },
      { label: 'Strap Drop', value: '55 cm adjustable' },
      { label: 'Origin', value: 'Made in Italy' },
    ],
    reviews: sampleReviews('mini-chain'),
    isNew: true,
    sku: 'LPF-BAG-002',
  },
  {
    id: '3',
    slug: 'top-handle-box-bag',
    name: 'Top-Handle Box Bag',
    category: 'Bags',
    price: 389,
    oldPrice: 465,
    rating: 4.6,
    reviewCount: 96,
    images: [
      'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=900&q=80',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=900&q=80',
    ],
    colors: [
      { name: 'Ivory', hex: '#F7F7F7' },
      { name: 'Noir', hex: '#111111' },
    ],
    sizes: ['One Size'],
    description:
      'A sculptural box bag with a rigid silhouette and polished top handle, designed to make an understated statement.',
    specifications: [
      { label: 'Material', value: 'Saffiano leather' },
      { label: 'Dimensions', value: '22 x 16 x 10 cm' },
      { label: 'Hardware', value: 'Brushed gold' },
      { label: 'Origin', value: 'Made in Italy' },
    ],
    reviews: sampleReviews('box-bag'),
    isSale: true,
    sku: 'LPF-BAG-003',
  },
  {
    id: '4',
    slug: 'quilted-crossbody-clutch',
    name: 'Quilted Crossbody Clutch',
    category: 'Bags',
    price: 299,
    rating: 4.9,
    reviewCount: 132,
    images: [
      'https://images.unsplash.com/photo-1548863227-3af567fc3b27?w=900&q=80',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=900&q=80',
    ],
    colors: [
      { name: 'Blush', hex: '#FF66C4' },
      { name: 'Noir', hex: '#111111' },
    ],
    sizes: ['One Size'],
    description:
      'Slim, quilted, and endlessly elegant. A crossbody clutch designed for those who travel light without compromising on style.',
    specifications: [
      { label: 'Material', value: 'Quilted calfskin' },
      { label: 'Dimensions', value: '24 x 15 x 4 cm' },
      { label: 'Strap', value: 'Detachable, 120 cm' },
      { label: 'Origin', value: 'Made in Italy' },
    ],
    reviews: sampleReviews('clutch'),
    isBestSeller: true,
    sku: 'LPF-BAG-004',
  },

  // ---------------- WATCHES ----------------
  {
    id: '5',
    slug: 'aurelia-gold-link-watch',
    name: 'Aurelia Gold-Link Watch',
    category: 'Watches',
    price: 549,
    oldPrice: 699,
    rating: 4.9,
    reviewCount: 187,
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=900&q=80',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=900&q=80',
    ],
    colors: [
      { name: 'Gold', hex: '#D4AF37' },
      { name: 'Rose Gold', hex: '#FF66C4' },
    ],
    sizes: ['32mm', '36mm'],
    description:
      'A precision Swiss movement housed in a polished link bracelet. The Aurelia is designed as an everyday heirloom — refined, resilient, and unmistakably Lux Pick Florence.',
    specifications: [
      { label: 'Movement', value: 'Swiss quartz' },
      { label: 'Case', value: 'Stainless steel, 18k gold-plated' },
      { label: 'Water Resistance', value: '5 ATM' },
      { label: 'Warranty', value: '2-year international warranty' },
    ],
    reviews: sampleReviews('aurelia'),
    isBestSeller: true,
    isSale: true,
    sku: 'LPF-WAT-001',
  },
  {
    id: '6',
    slug: 'noir-leather-strap-watch',
    name: 'Noir Leather Strap Watch',
    category: 'Watches',
    price: 419,
    rating: 4.7,
    reviewCount: 89,
    images: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=900&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=900&q=80',
    ],
    colors: [{ name: 'Noir', hex: '#111111' }],
    sizes: ['36mm'],
    description:
      'A minimalist dial paired with a hand-stitched Italian leather strap. Quietly confident, endlessly wearable.',
    specifications: [
      { label: 'Movement', value: 'Swiss quartz' },
      { label: 'Case', value: 'Matte black stainless steel' },
      { label: 'Strap', value: 'Genuine Italian leather' },
      { label: 'Warranty', value: '2-year international warranty' },
    ],
    reviews: sampleReviews('noir-watch'),
    isNew: true,
    sku: 'LPF-WAT-002',
  },
  {
    id: '7',
    slug: 'rose-petite-diamond-watch',
    name: 'Rose Petite Diamond Watch',
    category: 'Watches',
    price: 629,
    rating: 4.8,
    reviewCount: 74,
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=900&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=900&q=80',
    ],
    colors: [{ name: 'Rose Gold', hex: '#FF66C4' }],
    sizes: ['28mm'],
    description:
      'A petite rose-gold case rimmed with hand-set crystals. Delicate proportions make this the ultimate layering watch.',
    specifications: [
      { label: 'Movement', value: 'Swiss quartz' },
      { label: 'Case', value: 'Rose gold-plated, crystal bezel' },
      { label: 'Water Resistance', value: '3 ATM' },
      { label: 'Warranty', value: '2-year international warranty' },
    ],
    reviews: sampleReviews('rose-watch'),
    isNew: true,
    sku: 'LPF-WAT-003',
  },

  // ---------------- JEWELRY ----------------
  {
    id: '8',
    slug: 'eternity-diamond-pendant',
    name: 'Eternity Diamond Pendant',
    category: 'Jewelry',
    price: 289,
    oldPrice: 360,
    rating: 4.9,
    reviewCount: 241,
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=900&q=80',
      'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=900&q=80',
    ],
    colors: [
      { name: 'Gold', hex: '#D4AF37' },
      { name: 'Silver', hex: '#C0C0C0' },
    ],
    sizes: ['16"', '18"'],
    description:
      'A single brilliant-cut stone suspended on a whisper-fine chain. Designed to be worn every day and layered for evenings.',
    specifications: [
      { label: 'Material', value: '18k gold vermeil' },
      { label: 'Stone', value: 'Lab-grown diamond, 0.3ct' },
      { label: 'Chain', value: 'Adjustable, 16"–18"' },
      { label: 'Hypoallergenic', value: 'Yes' },
    ],
    reviews: sampleReviews('pendant'),
    isBestSeller: true,
    isSale: true,
    sku: 'LPF-JEW-001',
  },
  {
    id: '9',
    slug: 'pearl-drop-earrings',
    name: 'Pearl Drop Earrings',
    category: 'Jewelry',
    price: 179,
    rating: 4.8,
    reviewCount: 165,
    images: [
      'https://images.unsplash.com/photo-1620656798579-1984d9e87df7?w=900&q=80',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=900&q=80',
    ],
    colors: [{ name: 'Gold', hex: '#D4AF37' }],
    sizes: ['One Size'],
    description:
      'Freshwater pearls suspended from polished gold vermeil. A modern take on a timeless silhouette.',
    specifications: [
      { label: 'Material', value: '18k gold vermeil' },
      { label: 'Stone', value: 'Genuine freshwater pearl' },
      { label: 'Closure', value: 'Push back' },
      { label: 'Hypoallergenic', value: 'Yes' },
    ],
    reviews: sampleReviews('pearl'),
    sku: 'LPF-JEW-002',
  },
  {
    id: '10',
    slug: 'stackable-gold-ring-set',
    name: 'Stackable Gold Ring Set',
    category: 'Jewelry',
    price: 149,
    rating: 4.7,
    reviewCount: 203,
    images: [
      'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=900&q=80',
      'https://images.unsplash.com/photo-1620656798579-1984d9e87df7?w=900&q=80',
    ],
    colors: [
      { name: 'Gold', hex: '#D4AF37' },
      { name: 'Rose Gold', hex: '#FF66C4' },
    ],
    sizes: ['US 5', 'US 6', 'US 7', 'US 8'],
    description:
      'A set of three slim bands designed to be stacked, mixed, and worn on repeat. Comfort-fit and tarnish resistant.',
    specifications: [
      { label: 'Material', value: '18k gold vermeil' },
      { label: 'Set includes', value: '3 stacking bands' },
      { label: 'Fit', value: 'Comfort-fit interior' },
      { label: 'Hypoallergenic', value: 'Yes' },
    ],
    reviews: sampleReviews('rings'),
    isNew: true,
    sku: 'LPF-JEW-003',
  },

  // ---------------- SHOES ----------------
  {
    id: '11',
    slug: 'satin-point-toe-heels',
    name: 'Satin Point-Toe Heels',
    category: 'Shoes',
    price: 259,
    oldPrice: 320,
    rating: 4.6,
    reviewCount: 118,
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=900&q=80',
      'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=900&q=80',
    ],
    colors: [
      { name: 'Blush', hex: '#FF66C4' },
      { name: 'Noir', hex: '#111111' },
      { name: 'Ivory', hex: '#F7F7F7' },
    ],
    sizes: ['36', '37', '38', '39', '40'],
    description:
      'A sculpted point-toe silhouette in liquid satin, balanced on a slender 90mm heel. Elegant enough for the aisle, versatile enough for the office.',
    specifications: [
      { label: 'Upper', value: 'Satin' },
      { label: 'Heel Height', value: '90mm' },
      { label: 'Sole', value: 'Leather sole, non-slip pad' },
      { label: 'Origin', value: 'Made in Italy' },
    ],
    reviews: sampleReviews('heels'),
    isBestSeller: true,
    isSale: true,
    sku: 'LPF-SHO-001',
  },
  {
    id: '12',
    slug: 'crystal-embellished-sandals',
    name: 'Crystal-Embellished Sandals',
    category: 'Shoes',
    price: 279,
    rating: 4.8,
    reviewCount: 87,
    images: [
      'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=900&q=80',
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=900&q=80',
    ],
    colors: [{ name: 'Ivory', hex: '#F7F7F7' }],
    sizes: ['36', '37', '38', '39', '40'],
    description:
      'Delicate straps finished with hand-set crystals. A statement sandal built for golden-hour occasions.',
    specifications: [
      { label: 'Upper', value: 'Leather with crystal embellishment' },
      { label: 'Heel Height', value: '75mm' },
      { label: 'Sole', value: 'Leather sole' },
      { label: 'Origin', value: 'Made in Italy' },
    ],
    reviews: sampleReviews('sandals'),
    isNew: true,
    sku: 'LPF-SHO-002',
  },
  {
    id: '13',
    slug: 'leather-ankle-boots',
    name: 'Leather Ankle Boots',
    category: 'Shoes',
    price: 329,
    rating: 4.7,
    reviewCount: 142,
    images: [
      'https://images.unsplash.com/photo-1518049362265-d5b2a6467637?w=900&q=80',
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=900&q=80',
    ],
    colors: [{ name: 'Noir', hex: '#111111' }],
    sizes: ['36', '37', '38', '39', '40', '41'],
    description:
      'A refined ankle boot in supple leather with a sculpted block heel — the season-spanning essential.',
    specifications: [
      { label: 'Upper', value: 'Full-grain leather' },
      { label: 'Heel Height', value: '60mm' },
      { label: 'Closure', value: 'Side zip' },
      { label: 'Origin', value: 'Made in Italy' },
    ],
    reviews: sampleReviews('boots'),
    sku: 'LPF-SHO-003',
  },

  // ---------------- ACCESSORIES ----------------
  {
    id: '14',
    slug: 'silk-signature-scarf',
    name: 'Silk Signature Scarf',
    category: 'Accessories',
    price: 129,
    rating: 4.9,
    reviewCount: 176,
    images: [
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=900&q=80',
      'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=900&q=80',
    ],
    colors: [
      { name: 'Blush', hex: '#FF66C4' },
      { name: 'Ivory', hex: '#F7F7F7' },
    ],
    sizes: ['90x90cm'],
    description:
      'Hand-rolled edges and a signature print, printed on pure mulberry silk. As beautiful worn as it is displayed.',
    specifications: [
      { label: 'Material', value: '100% mulberry silk' },
      { label: 'Dimensions', value: '90 x 90 cm' },
      { label: 'Care', value: 'Dry clean only' },
      { label: 'Origin', value: 'Made in Italy' },
    ],
    reviews: sampleReviews('scarf'),
    isNew: true,
    sku: 'LPF-ACC-001',
  },
  {
    id: '15',
    slug: 'cat-eye-sunglasses',
    name: 'Cat-Eye Sunglasses',
    category: 'Accessories',
    price: 189,
    oldPrice: 240,
    rating: 4.7,
    reviewCount: 98,
    images: [
      'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=900&q=80',
      'https://images.unsplash.com/photo-1518544866330-4e761d1d9f92?w=900&q=80',
    ],
    colors: [
      { name: 'Noir', hex: '#111111' },
      { name: 'Blush', hex: '#FF66C4' },
    ],
    sizes: ['One Size'],
    description:
      'A dramatic cat-eye frame with polarised UV400 lenses. Instant glamour for sun-soaked afternoons.',
    specifications: [
      { label: 'Frame', value: 'Acetate' },
      { label: 'Lenses', value: 'Polarised, UV400 protection' },
      { label: 'Includes', value: 'Signature case and cloth' },
      { label: 'Origin', value: 'Made in Italy' },
    ],
    reviews: sampleReviews('sunglasses'),
    isSale: true,
    sku: 'LPF-ACC-002',
  },
  {
    id: '16',
    slug: 'gold-buckle-leather-belt',
    name: 'Gold-Buckle Leather Belt',
    category: 'Accessories',
    price: 139,
    rating: 4.6,
    reviewCount: 61,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=900&q=80',
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=900&q=80',
    ],
    colors: [
      { name: 'Noir', hex: '#111111' },
      { name: 'Ivory', hex: '#F7F7F7' },
    ],
    sizes: ['S', 'M', 'L'],
    description:
      'A slim leather belt finished with a signature polished gold buckle — the finishing touch for tailored silhouettes.',
    specifications: [
      { label: 'Material', value: 'Full-grain leather' },
      { label: 'Width', value: '2.5 cm' },
      { label: 'Buckle', value: '18k gold-plated' },
      { label: 'Origin', value: 'Made in Italy' },
    ],
    reviews: sampleReviews('belt'),
    sku: 'LPF-ACC-003',
  },

  // ---------------- NEW ADDITIONS ----------------
  {
    id: '17',
    slug: 'capri-top-handle',
    name: 'The Capri Top-Handle',
    category: 'Bags',
    price: 450,
    oldPrice: 599,
    rating: 4.8,
    reviewCount: 12,
    images: [
      '/products/capri-top-handle-1.jpg',
    ],
    colors: [{ name: 'Cream', hex: '#EFE3D0' }],
    sizes: ['Mini Size'],
    description:
      'An elegant cream top-handle handbag with a refined textured finish and a detachable shoulder strap — perfect for everyday luxury and special occasions.',
    specifications: [
      { label: 'Material', value: 'Premium textured leather' },
      { label: 'Dimensions', value: 'Mini — approx. 20 x 14 x 8 cm' },
      { label: 'Hardware', value: 'Gold-tone' },
      { label: 'Strap', value: 'Detachable shoulder strap included' },
      { label: 'Origin', value: 'Made in Italy' },
    ],
    reviews: sampleReviews('capri'),
    isBestSeller: true,
    isSale: true,
    sku: 'LPF-BAG-005',
  },
  {
    id: '18',
    slug: 'tuscan-reserve-tote',
    name: 'The Tuscan Reserve Tote',
    category: 'Bags',
    price: 750,
    oldPrice: 999,
    rating: 4.9,
    reviewCount: 9,
    images: [
      '/products/tuscan-reserve-tote-1.jpg',
    ],
    colors: [{ name: 'Tan Brown', hex: '#8B5E3C' }],
    sizes: ['30 cm'],
    description:
      'A classic tan-brown handbag with a timeless structured silhouette, premium textured leather finish, elegant top handles, and a signature front lock detail — a sophisticated choice for everyday wear and special occasions alike.',
    specifications: [
      { label: 'Material', value: 'Full-grain textured leather' },
      { label: 'Dimensions', value: '30 cm width' },
      { label: 'Hardware', value: 'Palladium-tone front lock' },
      { label: 'Interior', value: 'Suede lining, 2 compartments' },
      { label: 'Origin', value: 'Made in Italy' },
    ],
    reviews: sampleReviews('tuscan'),
    isBestSeller: true,
    isSale: true,
    sku: 'LPF-BAG-006',
  },
  {
    id: '19',
    slug: 'rosetta-quilted-flap',
    name: 'The Rosetta Quilted Flap',
    category: 'Bags',
    price: 530,
    oldPrice: 800,
    rating: 4.9,
    reviewCount: 15,
    images: [
      '/products/rosetta-quilted-flap-1.jpg',
    ],
    colors: [{ name: 'Pink Quilted', hex: '#F291C4' }],
    sizes: ['25 cm'],
    description:
      'An elegant pink quilted shoulder bag featuring a gold-tone turn-lock closure, chain strap, and a timeless flap design — perfect for parties, dinners, and everyday chic style.',
    specifications: [
      { label: 'Material', value: 'Quilted lambskin-finish leather' },
      { label: 'Dimensions', value: '25 cm width' },
      { label: 'Hardware', value: 'Gold-tone chain strap' },
      { label: 'Closure', value: 'Turn-lock flap closure' },
      { label: 'Origin', value: 'Made in Italy' },
    ],
    reviews: sampleReviews('rosetta'),
    isBestSeller: true,
    isSale: true,
    sku: 'LPF-BAG-007',
  },
  {
    id: '20',
    slug: 'serena-rose-gold-timepiece',
    name: 'The Serena Rose Gold Timepiece',
    category: 'Watches',
    price: 1200,
    oldPrice: 1800,
    rating: 4.9,
    reviewCount: 7,
    images: [
      '/products/serena-rose-gold-timepiece-1.jpg',
    ],
    colors: [{ name: 'Rose Gold', hex: '#B76E79' }],
    sizes: ['31mm'],
    description:
      'An elegant rose gold timepiece with a 31mm case, fluted bezel, soft pink dial detailing, and a two-tone bracelet. A timeless watch featuring a date display, suitable for both everyday wear and special occasions.',
    specifications: [
      { label: 'Movement', value: 'Swiss quartz' },
      { label: 'Case', value: '31mm, rose gold-plated stainless steel' },
      { label: 'Bracelet', value: 'Two-tone, fluted bezel' },
      { label: 'Water Resistance', value: '5 ATM' },
      { label: 'Warranty', value: '2-year international warranty' },
    ],
    reviews: sampleReviews('serena'),
    isBestSeller: true,
    isSale: true,
    sku: 'LPF-WAT-004',
  },
];

export const categories: { name: string; slug: string; image: string }[] = [
  {
    name: 'Luxury Bags',
    slug: 'bags',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80',
  },
  {
    name: 'Luxury Watches',
    slug: 'watches',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80',
  },
  {
    name: 'Luxury Jewelry',
    slug: 'jewelry',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80',
  },
  {
    name: 'Luxury Shoes',
    slug: 'shoes',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80',
  },
  {
    name: 'Luxury Accessories',
    slug: 'accessories',
    image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&q=80',
  },
];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product, count = 4) {
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, count);
}

export function getBestSellers() {
  return products.filter((p) => p.isBestSeller);
}

export function getNewArrivals() {
  return products.filter((p) => p.isNew);
}

export function getSaleProducts() {
  return products.filter((p) => p.isSale);
}

export function getProductsByCategory(categoryName: string) {
  return products.filter(
    (p) => p.category.toLowerCase() === categoryName.toLowerCase()
  );
}
