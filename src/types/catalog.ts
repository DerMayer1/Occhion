export type CatalogCategoryId = 'grau' | 'solar';

export type CatalogSubcategoryId =
  | 'acetato'
  | 'metal'
  | 'tr90'
  | 'infantil'
  | 'solar'
  | 'clip-on'
  | 'bellocchio';

export interface ProductTechnicalSpec {
  measurements: string;
  format: string;
  fit: string;
  bridge: string;
  temples: string;
  lensCompatibility: string;
  productionNote?: string;
}

export interface ProductPrescriptionFlow {
  enabled: boolean;
  allowUpload: boolean;
  allowSendLater: boolean;
  note: string;
  lensNotes: string[];
}

export interface Product {
  id: string;
  brand: string;
  line: string;
  model: string;
  variant: string;
  displayName: string;
  basePriceCents: number;
  category: CatalogCategoryId;
  categoryLabel: string;
  subcategory: CatalogSubcategoryId;
  subcategoryLabel: string;
  material: string;
  audience: 'Adulto' | 'Infantil';
  badge: string;
  overview: string;
  description: string;
  story: string;
  colors: string[];
  features: string[];
  technical: ProductTechnicalSpec;
  prescriptionFlow: ProductPrescriptionFlow;
  image?: string;
  imageAlt: string;
}

export interface CatalogSubcategory {
  id: CatalogSubcategoryId;
  label: string;
  description: string;
}

export interface CatalogCategory {
  id: CatalogCategoryId;
  label: string;
  description: string;
  subcategories: CatalogSubcategory[];
}

export interface ContentCard {
  title: string;
  description: string;
  eyebrow?: string;
}

export interface PolicySection {
  title: string;
  description: string;
  bullets: string[];
}
