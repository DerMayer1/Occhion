export interface Product {
  id: string;
  name: string;
  category: 'grau' | 'solar';
  price: number;
  description: string;
  images: string[];
  features: string[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
}
