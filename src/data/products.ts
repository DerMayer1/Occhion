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
