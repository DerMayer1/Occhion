import type { Product } from '../types/catalog';
import { createClientAssetPath } from './formatters';

const IMAGE_FALLBACKS = {
  acetato: createClientAssetPath("Armações Acetato/Occhi’on Bellocchio Toscana.jpg"),
  metal: createClientAssetPath("Armações Acetato/Occhi’on Bellocchio Toscana.jpg"),
  tr90: createClientAssetPath('Armações TR90/Bellochio Milano.jpg'),
  infantil: createClientAssetPath('Armações TR90/Bellochio Blush.jpg'),
  solar: createClientAssetPath('Occhion Solar/Bellochio Laguna.jpg'),
  bellocchio: createClientAssetPath('Occhion Solar/Bellochio Laguna.jpg'),
  'clip-on': createClientAssetPath('Occhion Solar/Bellochio Cosmo Clipon.jpg'),
} as const;

function isLikelyWebImage(source?: string) {
  if (!source) return false;
  return /\.(jpg|jpeg|png|webp|svg)$/i.test(source);
}

export function getProductImageSources(product: Product) {
  const sources: string[] = [];
  const subcategoryFallback = IMAGE_FALLBACKS[product.subcategory as keyof typeof IMAGE_FALLBACKS];
  const degreeFallbackKey = product.audience === 'Infantil' ? 'infantil' : (product.subcategory as keyof typeof IMAGE_FALLBACKS);
  const degreeFallback = IMAGE_FALLBACKS[degreeFallbackKey] ?? IMAGE_FALLBACKS.acetato;

  if (isLikelyWebImage(product.image)) {
    sources.push(product.image!);
  }

  if (subcategoryFallback) {
    sources.push(subcategoryFallback);
  }

  if (product.category === 'solar') {
    sources.push(IMAGE_FALLBACKS.solar);
  } else {
    sources.push(degreeFallback);
  }

  if (!isLikelyWebImage(product.image) && product.image) {
    sources.push(product.image);
  }

  return Array.from(new Set(sources.filter(Boolean)));
}
