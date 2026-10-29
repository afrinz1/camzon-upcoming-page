import { Product } from '../types';

type ProductRecord = Omit<
  Product,
  'name' | 'collection' | 'image' | 'originalPrice' | 'specs'
> & {
  originalPrice: number | null;
  specs: Record<string, string | undefined>;
};

const normalizeProduct = (product: ProductRecord, index: number): Product => ({
  ...product,
  name: product.title,
  collection: product.category,
  image: product.images[0] || '',
  images: product.images.slice(0, 1),
  originalPrice: typeof product.originalPrice === 'number' ? product.originalPrice : undefined,
  rating: typeof product.rating === 'number' && product.rating > 0 ? product.rating : 4.8,
  reviewsCount:
    typeof product.reviewsCount === 'number' && product.reviewsCount > 0
      ? product.reviewsCount
      : 24 + index,
  isFeatured: typeof product.isFeatured === 'boolean' ? product.isFeatured : index < 4,
  badge: product.badge || (index % 3 === 0 ? 'New Arrival' : ''),
  specs: {
    dimensions: product.specs.dimensions || 'Not specified',
    materials: product.specs.materials || 'Solid brass / premium chrome finish',
    finish: product.specs.finish || 'Polished chrome',
    weight: product.specs.weight || 'Not specified',
    assembly: product.specs.assembly || 'Standard deck or wall mount',
    origin: product.specs.origin || 'India',
  },
});

const collectionFiles = import.meta.glob<ProductRecord[]>('./collections/*.json', {
  eager: true,
  import: 'default',
});
const productData = Object.values(collectionFiles).flat();

const products = productData.map(normalizeProduct);
export const PRODUCTS: Product[] = products;

const PRODUCT_CATEGORY_GROUPS = [
  {
    id: 'gcc-lineups',
    name: '01 — GCC LINEUPS',
    categories: [
      { id: 'allied products', name: 'Allied Products' },
      { id: 'apex', name: 'Apex' },
      { id: 'Dove', name: 'Dove' },
      { id: 'erico', name: 'Erico' },
      { id: 'fon', name: 'Fon' },
      { id: 'huji', name: 'Huji' },
      { id: 'Muno', name: 'Muno' },
    ],
  },
  {
    id: 'indian-lineups',
    name: '02 — INDIAN LINEUPS',
    categories: [
      { id: 'dart', name: 'Dart' },
      { id: 'deck', name: 'Deck' },
      { id: 'exte-basin-sink-range', name: 'Exte Basin & Sink' },
      { id: 'exte-wall-utility-range', name: 'Exte Wall & Utility' },
      { id: 'facet', name: 'Facet' },
      { id: 'mace', name: 'Mace' },
      { id: 'mincio', name: 'Mincio' },
      { id: 'pebble', name: 'Pebble' },
      { id: 'ridge', name: 'Ridge' },
      { id: 'arno', name: 'Arno' },
      { id: 'kore', name: 'Kore' },
      { id: 'duero', name: 'Duero' },
      { id: 'minto', name: 'Minto' },
      { id: 'dune', name: 'Dune' },
    ],
  },
  {
    id: 'group-divertors-spout',
    name: '03 — DIVERTORS & SPOUT',
    categories: [{ id: 'DIVER TORS SPOUTS', name: 'Diver Tors Spouts' }],
  },
  {
    id: 'group-sensor-faucets',
    name: '04 — SENSOR FAUCETS',
    categories: [{ id: 'SENSOR FAUCETS', name: 'Sensor Faucets' }],
  },
  {
    id: 'group-exclusive',
    name: '05 — EXCLUSIVE',
    categories: [
      { id: 'EXCLUSIVE', name: 'Exclusive' }
    ],
  },
  {
    id: 'group-overhead-showers',
    name: '06 — OVERHEAD SHOWERS',
    categories: [{ id: 'OVERHEAD SHOWERS', name: 'Overhead Showers' }],
  },
  {
    id: 'group-accessories',
    name: '07 — ACCESSORIES',
    categories: [{ id: 'accessories', name: 'Accessories' }],
  },
] as const;

const getCategoryCount = (categoryId: string) =>
  PRODUCTS.filter((product) => product.category.toLowerCase() === categoryId.toLowerCase()).length;

export const SIDEBAR_CATEGORY_GROUPS = PRODUCT_CATEGORY_GROUPS.map((group) => ({
  ...group,
  count: group.categories.reduce((total, category) => total + getCategoryCount(category.id), 0),
  categories: group.categories.map((category) => ({
    ...category,
    count: getCategoryCount(category.id),
  })),
}));

export const CATEGORIES = [
  { id: 'all', name: 'All Collections', count: PRODUCTS.length },
  ...SIDEBAR_CATEGORY_GROUPS.flatMap((group) => group.categories),
];
