<<<<<<< HEAD
import { Product, Category } from '../types';

export const categories: Category[] = [
  {
    id: 'grau',
    name: 'Óculos de Grau',
    description: 'Conforto e precisão visual para o seu dia a dia.',
    image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'solar',
    name: 'Óculos Solar',
    description: 'Proteção e estilo sob o sol com as melhores lentes.',
    image: 'https://images.unsplash.com/photo-1511499767350-a1590f65838a?auto=format&fit=crop&q=80&w=800',
  },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Classic Noir',
    category: 'grau',
    price: 450,
    description: 'Armação em acetato premium com design atemporal. Leveza e resistência para uso prolongado.',
    images: [
      'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800',
    ],
    features: ['Acetato Italiano', 'Hastes Flexíveis', 'Design Unissex'],
  },
  {
    id: '2',
    name: 'Aviator Gold',
    category: 'solar',
    price: 580,
    description: 'O clássico aviador com acabamento em ouro 18k e lentes polarizadas de alta definição.',
    images: [
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800',
    ],
    features: ['Lentes Polarizadas', 'Proteção UV400', 'Metal Nobre'],
  },
  {
    id: '3',
    name: 'Modern Tortoise',
    category: 'grau',
    price: 420,
    description: 'Estampa tartaruga moderna em formato arredondado. Ideal para rostos angulares.',
    images: [
      'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=800',
    ],
    features: ['Acabamento Fosco', 'Ergonômico', 'Alta Durabilidade'],
  },
  {
    id: '4',
    name: 'Sport Stealth',
    category: 'solar',
    price: 650,
    description: 'Desenvolvido para performance. Lentes espelhadas e armação ultra leve em fibra de carbono.',
    images: [
      'https://images.unsplash.com/photo-1511499767350-a1590f65838a?auto=format&fit=crop&q=80&w=800',
    ],
    features: ['Fibra de Carbono', 'Lentes Anti-reflexo', 'Grip de Silicone'],
  },
  {
    id: '5',
    name: 'Minimalist Silver',
    category: 'grau',
    price: 490,
    description: 'Estrutura em titânio ultra-fina. O máximo da sofisticação e leveza.',
    images: [
      'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&q=80&w=800',
    ],
    features: ['Titânio Puro', 'Hipoalergênico', 'Peso Pena'],
  },
  {
    id: '6',
    name: 'Urban Crystal',
    category: 'solar',
    price: 520,
    description: 'Armação transparente com lentes degradê. O toque moderno que seu look precisa.',
    images: [
      'https://images.unsplash.com/photo-1509100194014-d49809396daa?auto=format&fit=crop&q=80&w=800',
    ],
    features: ['Acetato Cristal', 'Lentes Degradê', 'Proteção Total'],
  },
];
=======
import type { CatalogCategory } from '../types/catalog';
import { degreeProducts } from './products-degree';
import { solarProducts } from './products-solar';

export const CATALOG: CatalogCategory[] = [
  {
    id: 'grau',
    label: 'Óculos de Grau',
    description:
      'Armações organizadas por material, com leitura comercial e preparação para a etapa de lentes e prescrição.',
    subcategories: [
      {
        id: 'acetato',
        label: 'Acetato',
        description: 'Modelos com presença visual mais marcante e repertório forte de cor e acabamento.',
      },
      {
        id: 'metal',
        label: 'Metal',
        description: 'Linhas leves e discretas para uma apresentação mais refinada.',
      },
      {
        id: 'tr90',
        label: 'TR90',
        description: 'Peças leves e flexíveis para rotina de uso contínuo.',
      },
      {
        id: 'infantil',
        label: 'Infantil',
        description: 'Produtos para conforto, adaptação e rotina de uso das crianças.',
      },
    ],
  },
  {
    id: 'solar',
    label: 'Óculos Solar',
    description:
      'Coleções organizadas por assinatura, recurso e estilo para apresentar melhor o mix OCCHI\'ON e Bell\'occhio.',
    subcategories: [
      {
        id: 'solar',
        label: 'Solar',
        description: 'Modelos principais da coleção OCCHI\'ON com leitura comercial direta.',
      },
      {
        id: 'bellocchio',
        label: "Bell'occhio",
        description: 'Linha com assinatura própria e papel de destaque visual na coleção.',
      },
      {
        id: 'clip-on',
        label: 'Clip-On',
        description: 'Coleção transversal por funcionalidade, útil para organizar o catálogo com clareza.',
      },
    ],
  },
];

export const PRODUCTS = [...degreeProducts, ...solarProducts];

export const FEATURED_PRODUCT_IDS = [
  'occhion-bellocchio-laguna-bellocchio',
  'occhion-bellocchio-noir-bellocchio',
  'occhion-bellocchio-milano-tr90',
  'occhion-firenze-classic-havana-acetato',
  'occhion-capri-matte-black-tr90',
  'occhion-firenze-clip-urban-black-clip-on',
];

export const FEATURED_PRODUCTS = PRODUCTS.filter((product) => FEATURED_PRODUCT_IDS.includes(product.id));

export function getProductById(productId: string) {
  return PRODUCTS.find((product) => product.id === productId);
}

export function getProductsByCategory(categoryId?: string) {
  if (!categoryId || (categoryId !== 'grau' && categoryId !== 'solar')) {
    return PRODUCTS;
  }

  return PRODUCTS.filter((product) => product.category === categoryId);
}

export function getRelatedProducts(productId: string) {
  const product = getProductById(productId);

  if (!product) {
    return FEATURED_PRODUCTS.slice(0, 3);
  }

  return PRODUCTS.filter(
    (candidate) =>
      candidate.id !== product.id &&
      (candidate.subcategory === product.subcategory || candidate.line === product.line),
  ).slice(0, 3);
}
>>>>>>> edacafd (feat: initial Occhion site (clean structure + catalog))
