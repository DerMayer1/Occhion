import type { Product } from '../types/catalog';
import { createClientAssetPath } from '../lib/formatters';
import { getSolarBasePriceCents, type SolarPriceGroup } from './catalog-pricing';

type SolarGroup = 'solar' | 'bellocchio' | 'clip-on';

interface SolarSeed {
  name: string;
  imagePath: string;
  group?: SolarGroup;
  line?: "Bell'occhio";
  audience?: 'Adulto' | 'Infantil';
}

const solarFlow = {
  enabled: false,
  allowUpload: false,
  allowSendLater: false,
  note: 'A linha solar é apresentada como produto final, com foco em estilo, acabamento e assinatura comercial.',
  lensNotes: ['Modelos com clip-on ou proposta híbrida aparecem sinalizados na própria vitrine.'],
} as const;

const GROUP_META: Record<
  SolarGroup,
  {
    subcategory: 'solar' | 'bellocchio' | 'clip-on';
    subcategoryLabel: string;
    defaultBadge: string;
    basePriceCents: number;
  }
> = {
  solar: {
    subcategory: 'solar',
    subcategoryLabel: 'Solar',
    defaultBadge: 'Solar',
    basePriceCents: 39900,
  },
  bellocchio: {
    subcategory: 'bellocchio',
    subcategoryLabel: "Bell'occhio",
    defaultBadge: "Bell'occhio",
    basePriceCents: 14990,
  },
  'clip-on': {
    subcategory: 'clip-on',
    subcategoryLabel: 'Clip-On',
    defaultBadge: 'Clip-On',
    basePriceCents: 27000,
  },
};

const solarSeeds: SolarSeed[] = [
  { name: 'Bell\'occhio Aurora', imagePath: 'Occhion Solar/Bellochio Aurora.jpg', group: 'bellocchio', line: "Bell'occhio" },
  { name: 'Bell\'occhio Cosmo Clip-On', imagePath: 'Occhion Solar/Bellochio Cosmo Clipon.jpg', group: 'clip-on', line: "Bell'occhio" },
  { name: 'Bell\'occhio Dark Glam', imagePath: 'Occhion Solar/Bellochio Dark Glam.jpg', group: 'bellocchio', line: "Bell'occhio" },
  { name: 'Bell\'occhio Fusion Clip-On', imagePath: 'Occhion Solar/Bellochio Fusion Clipon.jpg', group: 'clip-on', line: "Bell'occhio" },
  { name: 'Bell\'occhio Laguna', imagePath: 'Occhion Solar/Bellochio Laguna.jpg', group: 'bellocchio', line: "Bell'occhio" },
  { name: 'Bell\'occhio Lumina', imagePath: 'Occhion Solar/Bellochio Lumina.jpg', group: 'bellocchio', line: "Bell'occhio" },
  { name: 'Bell\'occhio Merlot', imagePath: 'Occhion Solar/Bellochio Merlot.jpg', group: 'bellocchio', line: "Bell'occhio" },
  { name: 'Bell\'occhio Nebbia', imagePath: 'Occhion Solar/Bellochio Nebbia.jpg', group: 'bellocchio', line: "Bell'occhio" },
  { name: 'Bell\'occhio Noir', imagePath: 'Occhion Solar/Bellochio Noir.jpg', group: 'bellocchio', line: "Bell'occhio" },
  { name: 'Bell\'occhio Oliva', imagePath: 'Occhion Solar/Bellochio oliva.jpg', group: 'bellocchio', line: "Bell'occhio" },
  { name: 'Bell\'occhio Smoke', imagePath: 'Occhion Solar/Bellochio Smoke', group: 'bellocchio', line: "Bell'occhio" },
  { name: 'Bell\'occhio Valerie Clip-On', imagePath: 'Occhion Solar/Bellochio Valerie Clipon.jpg', group: 'clip-on', line: "Bell'occhio" },
  { name: 'Bell\'occhio Âmbar', imagePath: 'Occhion Solar/Bellochio Âmbar.jpg', group: 'bellocchio', line: "Bell'occhio" },
  { name: 'Bell\'occhio Éden', imagePath: 'Occhion Solar/Bellochio éden .jpg', group: 'bellocchio', line: "Bell'occhio" },
  { name: 'Azurro', imagePath: 'Occhion Solar/Occhion Azurro' },
  { name: 'Bellagio', imagePath: 'Occhion Solar/Occhion Bellagio' },
  { name: 'Capri Blue', imagePath: 'Occhion Solar/Occhion Capri Blue' },
  { name: 'Capri Café', imagePath: 'Occhion Solar/Occhion Capri Café_' },
  { name: 'Capri Smoke', imagePath: 'Occhion Solar/Occhion Capri Smoke' },
  { name: 'Cote', imagePath: 'Occhion Solar/Occhion Cote' },
  { name: 'Cote Icon', imagePath: 'Occhion Solar/Occhion Cote icon' },
  { name: 'Cote Midnight', imagePath: 'Occhion Solar/Occhion Cote Midnight' },
  { name: 'Dolce Vitta', imagePath: 'Occhion Solar/Occhion Dolce Vitta' },
  { name: 'Dorato', imagePath: 'Occhion Solar/Occhion Dorato' },
  { name: 'Dorato Caramell', imagePath: 'Occhion Solar/Occhion Dorato Caramell' },
  { name: 'Firenze', imagePath: 'Occhion Solar/Occhion Firenze' },
  { name: 'Firenze Rose', imagePath: 'Occhion Solar/Occhion Firenze Rose' },
  { name: 'Gatta', imagePath: 'Occhion Solar/Occhion Gatta' },
  { name: 'Gatta Black', imagePath: 'Occhion Solar/Occhion Gatta Black' },
  { name: 'Gatta Nude', imagePath: 'Occhion Solar/Occhion Gatta Nude' },
  { name: 'Giada', imagePath: 'Occhion Solar/Occhion Giada' },
  { name: 'Helm Black', imagePath: 'Occhion Solar/Occhion Helm Black' },
  { name: 'Monza', imagePath: 'Occhion Solar/Occhion Monza' },
  { name: 'Pinot Noir', imagePath: 'Occhion Solar/Occhion Pinot Noir.jpg' },
  { name: 'Pinot Noir Black', imagePath: 'Occhion Solar/Occhion Pinot Noir Black.jpg' },
  { name: 'Pinot Noir Eclipse', imagePath: 'Occhion Solar/Occhion Pinot Noir Eclipse.jpg' },
  { name: 'Pinot Noir Mirror', imagePath: 'Occhion Solar/Occhion Pinot Noir Mirror.jpg' },
  { name: 'Pinot Noir Silver', imagePath: 'Occhion Solar/Occhion Pinot Noir Silver.jpg' },
  { name: 'Portofino', imagePath: 'Occhion Solar/Occhion Portofino' },
  { name: 'Positano', imagePath: 'Occhion Solar/Occhion Positano' },
  { name: 'Positano Black', imagePath: 'Occhion Solar/Occhion Positano Black' },
  { name: 'Positano Blue', imagePath: 'Occhion Solar/Occhion Positano Blue' },
  { name: 'Riviera', imagePath: 'Occhion Solar/Occhion Riviera' },
  { name: 'Sole Mio', imagePath: 'Occhion Solar/Occhion Sole Mio' },
  { name: 'Terra di Sole', imagePath: 'Occhion Solar/Occhion Terra di Sole' },
  { name: 'Torino', imagePath: 'Occhion Solar/Occhion Torino' },
  { name: 'Victorio Black', imagePath: 'Occhion Solar/Occhion Victorio Black' },
  { name: 'Victorio Blue', imagePath: 'Occhion Solar/Occhion Victorio Blue' },
  { name: 'Victorio Nude', imagePath: 'Occhion Solar/Occhion Victorio Nude' },
  { name: 'Capri Clip Black', imagePath: 'Occhion Solar/Occhi’on Capri Clip Black', group: 'clip-on' },
  { name: 'Capri Comfort Black', imagePath: 'Occhion Solar/Occhi’on Capri Comfort Black' },
  { name: 'Firenze Classic Black Gold', imagePath: 'Occhion Solar/Occhi’on Firenze Classic Black Gold' },
  { name: 'Firenze Clip Sport Black', imagePath: 'Occhion Solar/Occhi’on Firenze Clip Sport Black', group: 'clip-on' },
  { name: 'Firenze Clip Urban Black', imagePath: 'Occhion Solar/Occhi’on Firenze Clip Urban Black', group: 'clip-on' },
  { name: 'Firenze Comfort Black', imagePath: 'Occhion Solar/Occhi’on Firenze Comfort Black' },
  { name: 'Firenze Comfort Graphite', imagePath: 'Occhion Solar/Occhi’on Firenze Comfort Graphite' },
  { name: 'Firenze Matte Black Comfort', imagePath: 'Occhion Solar/Occhi’on Firenze Matte Black Comfort' },
  { name: 'Firenze Sport Black Red', imagePath: 'Occhion Solar/Occhi’on Firenze Sport Black Red' },
  { name: 'Kids Clip Navy', imagePath: 'Occhion Solar/Occhi’on Kids Clip Navy', group: 'clip-on', audience: 'Infantil' },
  { name: 'Venezia Clip Blush Gold', imagePath: 'Occhion Solar/Occhi’on Venezia Clip Blush Gold', group: 'clip-on' },
];

function slugify(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[']/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
}

function inferModel(name: string) {
  const tokens = name.split(' ');

  if (tokens[0] === 'Bell\'occhio') {
    return tokens[1];
  }

  if (tokens[0] === 'Kids' && tokens.length > 1) {
    return tokens.slice(0, 2).join(' ');
  }

  return tokens[0];
}

function inferVariant(name: string) {
  const tokens = name.split(' ');

  if (tokens[0] === 'Bell\'occhio') {
    return tokens.slice(2).join(' ') || 'Signature';
  }

  if (tokens[0] === 'Kids') {
    return tokens.slice(2).join(' ') || 'Signature';
  }

  return tokens.slice(1).join(' ') || 'Signature';
}

function inferGroup(seed: SolarSeed): SolarGroup {
  if (seed.group) return seed.group;
  if (seed.line === "Bell'occhio") return 'bellocchio';
  return 'solar';
}

function createOverview(seed: SolarSeed, group: SolarGroup) {
  if (seed.line === "Bell'occhio") {
    return 'Peça de assinatura da linha Bell\'occhio para destacar o lado mais autoral da coleção solar.';
  }

  if (group === 'clip-on') {
    return 'Modelo clip-on para apresentar a coleção por funcionalidade sem romper a linguagem premium do site.';
  }

  return 'Solar com leitura comercial clara, pronto para compor uma vitrine mais madura e coerente com a marca.';
}

function createDescription(seed: SolarSeed, group: SolarGroup) {
  if (seed.line === "Bell'occhio") {
    return `${seed.name} foi incorporado como item de assinatura para diferenciar a linha Bell'occhio dentro do catálogo solar.`;
  }

  if (group === 'clip-on') {
    return `${seed.name} reforça a navegação por recurso e mostra que o site já consegue organizar a coleção de forma mais inteligente.`;
  }

  return `${seed.name} amplia a coleção solar com organização comercial, clareza de naming e espaço para evolução posterior em Shopify.`;
}

function createStory(seed: SolarSeed, group: SolarGroup) {
  if (seed.line === "Bell'occhio") {
    return 'Na apresentação, este item sustenta a curadoria premium e a separação de linhas dentro da marca.';
  }

  if (group === 'clip-on') {
    return 'É uma peça estratégica para validar a taxonomia por função e uso, não só por estilo.';
  }

  return 'Ajuda a preencher a coleção de solares com repertório amplo e navegação mais convincente.';
}

function createFeatures(seed: SolarSeed, group: SolarGroup) {
  const features = ['Solar'];
  const name = seed.name.toLowerCase();

  if (seed.line === "Bell'occhio") features.unshift("Bell'occhio");
  if (group === 'clip-on') features.unshift('Clip-On');
  if (seed.audience === 'Infantil' || name.includes('kids')) features.push('Infantil');
  if (name.includes('comfort')) features.push('Comfort');
  if (name.includes('sport')) features.push('Sport');
  if (name.includes('classic')) features.push('Classic');

  return Array.from(new Set(features));
}

function createProduct(seed: SolarSeed): Product {
  const group = inferGroup(seed);
  const meta = GROUP_META[group];
  const displayName = seed.line === "Bell'occhio" ? `OCCHI'ON Bell'occhio ${seed.name.replace(/^Bell'occhio\s*/, '')}` : `OCCHI'ON ${seed.name}`;
  const model = inferModel(seed.name);
  const variant = inferVariant(seed.name);
  const audience = seed.audience ?? (seed.name.startsWith('Kids') ? 'Infantil' : 'Adulto');
  const resolvedBasePriceCents =
    getSolarBasePriceCents(seed.name, meta.subcategory as SolarPriceGroup) ??
    (audience === 'Infantil' && meta.subcategory === 'solar' ? 27000 : meta.basePriceCents);

  return {
    id: slugify(`${displayName}-${meta.subcategory}`),
    brand: "OCCHI'ON",
    line: seed.line ?? (audience === 'Infantil' ? "OCCHI'ON Kids" : "OCCHI'ON"),
    model,
    variant,
    displayName,
    basePriceCents: resolvedBasePriceCents,
    category: 'solar',
    categoryLabel: 'Óculos Solar',
    subcategory: meta.subcategory,
    subcategoryLabel: meta.subcategoryLabel,
    material: audience === 'Infantil' ? 'TR90' : 'Acetato',
    audience,
    badge: meta.defaultBadge,
    overview: createOverview(seed, group),
    description: createDescription(seed, group),
    story: createStory(seed, group),
    colors: [variant],
    features: createFeatures(seed, group),
    technical: {
      measurements: audience === 'Infantil' ? '48-16-130' : '54-18-145',
      format: group === 'clip-on' ? 'Construção híbrida para uso versátil' : 'Frente solar de apresentação comercial',
      fit: audience === 'Infantil' ? 'Uso infantil com leveza' : 'Cobertura média com leitura de coleção',
      bridge: audience === 'Infantil' ? 'Ponte leve para adaptação confortável' : 'Ponte estruturada para estabilidade de uso',
      temples: group === 'clip-on' ? 'Hastes equilibradas para uso com recurso adicional' : 'Hastes de presença média e acabamento limpo',
      lensCompatibility: group === 'clip-on' ? 'Clip solar' : 'Solar final',
      productionNote:
        audience === 'Infantil'
          ? 'Itens infantis e combinações especiais dependem de conferência operacional.'
          : undefined,
    },
    prescriptionFlow: solarFlow,
    image: createClientAssetPath(seed.imagePath),
    imageAlt: displayName,
  };
}

export const solarProducts: Product[] = solarSeeds.map(createProduct);
