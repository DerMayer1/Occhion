export const ROUTES = {
  home: '/',
  collection: '/colecao',
  collectionCategory: (categoryId: string) => `/colecao/${categoryId}`,
  product: '/produto',
  productDetail: (productId: string) => `/produto/${productId}`,
  about: '/sobre',
  contact: '/contato',
  policies: '/politicas',
} as const;

export const PRIMARY_NAVIGATION = [
  { label: 'Início', to: ROUTES.home },
  { label: 'Coleção', to: ROUTES.collection },
  { label: 'Sobre', to: ROUTES.about },
  { label: 'Contato', to: ROUTES.contact },
  { label: 'Políticas', to: ROUTES.policies },
];
