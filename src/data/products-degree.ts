import type { Product } from '../types/catalog';
import { createClientAssetPath } from '../lib/formatters';
import { getDegreeBasePriceCents, type DegreePriceGroup } from './catalog-pricing';

type DegreeGroup = 'acetato' | 'metal' | 'tr90' | 'infantil';

interface DegreeSeed {
  name: string;
  imagePath: string;
  group: DegreeGroup;
  line?: "Bell'occhio";
}

const degreePrescriptionFlow = {
  enabled: true,
  allowUpload: true,
  allowSendLater: true,
  note: 'O fluxo de grau foi apresentado para receber receita, pendência de envio e conferência manual quando necessário.',
  lensNotes: [
    'Composição óptica e tratamentos seguem a tabela comercial da cliente.',
    'Combinações especiais podem alterar prazo e valor final.',
    'Casos fora do padrão seguem para validação humana.',
  ],
} as const;

const GROUP_META: Record<
  DegreeGroup,
  {
    subcategory: 'acetato' | 'metal' | 'tr90' | 'infantil';
    subcategoryLabel: string;
    material: string;
    audience: 'Adulto' | 'Infantil';
    defaultBadge: string;
    basePriceCents: number;
    measurements: string;
    format: string;
    fit: string;
    bridge: string;
    temples: string;
  }
> = {
  acetato: {
    subcategory: 'acetato',
    subcategoryLabel: 'Acetato',
    material: 'Acetato',
    audience: 'Adulto',
    defaultBadge: 'Acetato',
    basePriceCents: 18990,
    measurements: '52-18-140',
    format: 'Frente estruturada com leitura contemporânea',
    fit: 'Uso diário com presença visual',
    bridge: 'Ponte integrada com encaixe firme',
    temples: 'Hastes em acetato com sustentação equilibrada',
  },
  metal: {
    subcategory: 'metal',
    subcategoryLabel: 'Metal',
    material: 'Metal',
    audience: 'Adulto',
    defaultBadge: 'Metal',
    basePriceCents: 16990,
    measurements: '52-18-140',
    format: 'Aro leve e refinado',
    fit: 'Leitura discreta e confortável',
    bridge: 'Ponte metálica mais delicada',
    temples: 'Hastes slim para acabamento elegante',
  },
  tr90: {
    subcategory: 'tr90',
    subcategoryLabel: 'TR90',
    material: 'TR90',
    audience: 'Adulto',
    defaultBadge: 'TR90',
    basePriceCents: 13990,
    measurements: '53-17-143',
    format: 'Construção leve para rotina de uso',
    fit: 'Conforto prolongado',
    bridge: 'Ponte moldada de adaptação prática',
    temples: 'Hastes leves e flexíveis',
  },
  infantil: {
    subcategory: 'infantil',
    subcategoryLabel: 'Infantil',
    material: 'TR90',
    audience: 'Infantil',
    defaultBadge: 'Infantil',
    basePriceCents: 13990,
    measurements: '47-15-130',
    format: 'Frente leve para adaptação infantil',
    fit: 'Rotina infantil com conforto',
    bridge: 'Ponte confortável para uso contínuo',
    temples: 'Hastes flexíveis e estáveis',
  },
};

const degreeSeeds: DegreeSeed[] = [
  { name: 'Bell\'occhio Toscana', imagePath: 'Armações Acetato/Occhi’on Bellocchio Toscana.jpg', group: 'acetato', line: "Bell'occhio" },
  { name: 'Bell\'occhio Polaris', imagePath: 'Armações Acetato/Bellochio Polaris.jpg', group: 'acetato', line: "Bell'occhio" },
  { name: 'Capri Black Tartaruga', imagePath: 'Armações Acetato/Occhi’on Capri Black Tartaruga', group: 'acetato' },
  { name: 'Capri Classic Black', imagePath: 'Armações Acetato/Occhi’on Capri Classic Black', group: 'acetato' },
  { name: 'Capri Classic Navy', imagePath: 'Armações Acetato/Occhi’on Capri Classic Navy', group: 'acetato' },
  { name: 'Capri Classic Tartaruga', imagePath: 'Armações Acetato/Occhi’on Capri Classic Tartaruga', group: 'acetato' },
  { name: 'Capri Crystal Navy Sport', imagePath: 'Armações Acetato/Occhi’on Capri Crystal Navy Sport', group: 'acetato' },
  { name: 'Capri Dark Tortoise', imagePath: 'Armações Acetato/Occhi’on Capri Dark Tortoise', group: 'acetato' },
  { name: 'Capri Deep Black', imagePath: 'Armações Acetato/Occhi’on Capri Deep Black', group: 'acetato' },
  { name: 'Capri Honey Havana', imagePath: 'Armações Acetato/Occhi’on Capri Honey Havana', group: 'acetato' },
  { name: 'Capri Mocha', imagePath: 'Armações Acetato/Occhi’on Capri Mocha', group: 'acetato' },
  { name: 'Capri Navy', imagePath: 'Armações Acetato/Occhi’on Capri Navy', group: 'acetato' },
  { name: 'Capri Ocean Tartaruga', imagePath: 'Armações Acetato/Occhi’on Capri Ocean Tartaruga', group: 'acetato' },
  { name: 'Firenze Amber Pop', imagePath: 'Armações Acetato/Occhi’on Firenze Amber Pop', group: 'acetato' },
  { name: 'Firenze Aurora Green', imagePath: 'Armações Acetato/Occhi’on Firenze Aurora Green', group: 'acetato' },
  { name: 'Firenze Bold Navy', imagePath: 'Armações Acetato/Occhi’on Firenze Bold Navy', group: 'acetato' },
  { name: 'Firenze Classic Blend', imagePath: 'Armações Acetato/Occhi’on Firenze Classic Blend', group: 'acetato' },
  { name: 'Firenze Classic Dark', imagePath: 'Armações Acetato/Occhi’on Firenze Classic Dark', group: 'acetato' },
  { name: 'Firenze Classic Havana', imagePath: 'Armações Acetato/Occhi’on Firenze Classic Havana', group: 'acetato' },
  { name: 'Firenze Classic Havana Bold', imagePath: 'Armações Acetato/Occhi’on Firenze Classic Havana Bold', group: 'acetato' },
  { name: 'Firenze Classic Navy Matte', imagePath: 'Armações Acetato/Occhi’on Firenze Classic Navy Matte', group: 'acetato' },
  { name: 'Firenze Classic Navy', imagePath: 'Armações Acetato/Occhi’on Firenze Classic Navy_', group: 'acetato' },
  { name: 'Firenze Crystal Line', imagePath: 'Armações Acetato/Occhi’on Firenze Crystal Line', group: 'acetato' },
  { name: 'Firenze Crystal Navy', imagePath: 'Armações Acetato/Occhi’on Firenze Crystal Navy', group: 'acetato' },
  { name: 'Firenze Dark Havana', imagePath: 'Armações Acetato/Occhi’on Firenze Dark Havana.jpg', group: 'acetato' },
  { name: 'Firenze Deep Navy', imagePath: 'Armações Acetato/Occhi’on Firenze Deep Navy', group: 'acetato' },
  { name: 'Firenze Essential Navy', imagePath: 'Armações Acetato/Occhi’on Firenze Essential Navy', group: 'acetato' },
  { name: 'Firenze Forest Blend', imagePath: 'Armações Acetato/Occhi’on Firenze Forest Blend', group: 'acetato' },
  { name: 'Firenze Gradient Brown', imagePath: 'Armações Acetato/Occhi’on Firenze Gradient Brown', group: 'acetato' },
  { name: 'Firenze Graphite Navy', imagePath: 'Armações Acetato/Occhi’on Firenze Graphite Navy', group: 'acetato' },
  { name: 'Firenze Honey', imagePath: 'Armações Acetato/Occhi’on Firenze Honey', group: 'acetato' },
  { name: 'Firenze Navy Soft', imagePath: 'Armações Acetato/Occhi’on Firenze Navy Soft', group: 'acetato' },
  { name: 'Firenze Ruby Marble', imagePath: 'Armações Acetato/Occhi’on Firenze Ruby Marble', group: 'acetato' },
  { name: 'Firenze Slim Havana', imagePath: 'Armações Acetato/Occhi’on Firenze Slim Havana', group: 'acetato' },
  { name: 'Firenze Soft Havana', imagePath: 'Armações Acetato/Occhi’on Firenze Soft Havana', group: 'acetato' },
  { name: 'Firenze Soft Navy', imagePath: 'Armações Acetato/Occhi’on Firenze Soft Navy', group: 'acetato' },
  { name: 'Firenze Sunset Amber', imagePath: 'Armações Acetato/Occhi’on Firenze Sunset Amber_', group: 'acetato' },
  { name: 'Firenze Sunset Blend', imagePath: 'Armações Acetato/Occhi’on Firenze Sunset Blend', group: 'acetato' },
  { name: 'Firenze Wine Art', imagePath: 'Armações Acetato/Occhi’on Firenze Wine Art', group: 'acetato' },
  { name: 'Torino Blue Crystal', imagePath: 'Armações Acetato/Occhi’on Torino Blue Crystal', group: 'acetato' },
  { name: 'Torino Crystal Smoke', imagePath: 'Armações Acetato/Occhi’on Torino Crystal Smoke', group: 'acetato' },
  { name: 'Torino Graphite Texture', imagePath: 'Armações Acetato/Occhi’on Torino Graphite Texture', group: 'acetato' },
  { name: 'Torino Ice', imagePath: 'Armações Acetato/Occhi’on Torino Ice', group: 'acetato' },
  { name: 'Torino Ice Blue', imagePath: 'Armações Acetato/Occhi’on Torino Ice Blue', group: 'acetato' },
  { name: 'Torino Ocean', imagePath: 'Armações Acetato/Occhi’on Torino Ocean', group: 'acetato' },
  { name: 'Torino Ocean Blue', imagePath: 'Armações Acetato/Occhi’on Torino Ocean Blue', group: 'acetato' },
  { name: 'Torino Smoke', imagePath: 'Armações Acetato/Occhi’on Torino Smoke', group: 'acetato' },
  { name: 'Torino Sport Blue', imagePath: 'Armações Acetato/Occhi’on Torino Sport Blue', group: 'acetato' },
  { name: 'Torino Texture Blue', imagePath: 'Armações Acetato/Occhi’on Torino Texture Blue', group: 'acetato' },
  { name: 'Venezia Aurora', imagePath: 'Armações Acetato/Occhi’on Venezia Aurora', group: 'acetato' },
  { name: 'Venezia Gold Havana', imagePath: 'Armações Acetato/Occhi’on Venezia Gold Havana', group: 'acetato' },
  { name: 'Firenze Air', imagePath: 'Armações Metal/Occhi’on Firenze Air', group: 'metal' },
  { name: 'Firenze Gold', imagePath: 'Armações Metal/Occhi’on Firenze Gold', group: 'metal' },
  { name: 'Roma Graphite', imagePath: 'Armações Metal/Occhi’on Roma Graphite', group: 'metal' },
  { name: 'Roma Silver', imagePath: 'Armações Metal/Occhi’on Roma Silver', group: 'metal' },
  { name: 'Torino Navy', imagePath: 'Armações Metal/Occhi’on Torino Navy', group: 'metal' },
  { name: 'Torino Silver', imagePath: 'Armações Metal/Occhi’on Torino Silver', group: 'metal' },
  { name: 'Venezia Gold', imagePath: 'Armações Metal/Occhi’on Venezia Gold', group: 'metal' },
  { name: 'Bell\'occhio Blush', imagePath: 'Armações TR90/Bellochio Blush.jpg', group: 'tr90', line: "Bell'occhio" },
  { name: 'Bell\'occhio Camélia', imagePath: 'Armações TR90/Bellochio Camélia .jpg', group: 'tr90', line: "Bell'occhio" },
  { name: 'Bell\'occhio Milano', imagePath: 'Armações TR90/Bellochio Milano.jpg', group: 'tr90', line: "Bell'occhio" },
  { name: 'Bell\'occhio Milano Color Mix', imagePath: 'Armações TR90/Occhi’on Bellocchio Milano Color Mix', group: 'tr90', line: "Bell'occhio" },
  { name: 'Capri Deep Black', imagePath: 'Armações TR90/Occhi’on Capri Deep Black', group: 'tr90' },
  { name: 'Capri Light', imagePath: 'Armações TR90/Occhi’on Capri Light', group: 'tr90' },
  { name: 'Capri Light Black', imagePath: 'Armações TR90/Occhi’on Capri Light Black', group: 'tr90' },
  { name: 'Capri Matte Black', imagePath: 'Armações TR90/Occhi’on Capri Matte Black', group: 'tr90' },
  { name: 'Capri Matte Black Comfort', imagePath: 'Armações TR90/Occhi’on Capri Matte Black Comfort', group: 'tr90' },
  { name: 'Capri Midnight', imagePath: 'Armações TR90/Occhi’on Capri Midnight', group: 'tr90' },
  { name: 'Capri Ocean Mix', imagePath: 'Armações TR90/Occhi’on Capri Ocean Mix', group: 'tr90' },
  { name: 'Capri Rosé Crystal', imagePath: 'Armações TR90/Occhi’on Capri Rosé Crystal', group: 'tr90' },
  { name: 'Capri Vintage Black', imagePath: 'Armações TR90/Occhi’on Capri Vintage Black', group: 'tr90' },
  { name: 'Capri Vintage Gold', imagePath: 'Armações TR90/Occhi’on Capri Vintage Gold', group: 'tr90' },
  { name: 'Capri Vintage Ruby', imagePath: 'Armações TR90/Occhi’on Capri Vintage Ruby', group: 'tr90' },
  { name: 'Firenze Black Marble', imagePath: 'Armações TR90/Occhi’on Firenze Black Marble', group: 'tr90' },
  { name: 'Firenze Classic Contrast', imagePath: 'Armações TR90/Occhi’on Firenze Classic Contrast', group: 'tr90' },
  { name: 'Firenze Classic Line', imagePath: 'Armações TR90/Occhi’on Firenze Classic Line', group: 'tr90' },
  { name: 'Firenze Clear Light', imagePath: 'Armações TR90/Occhi’on Firenze Clear Light', group: 'tr90' },
  { name: 'Firenze Crystal Marble', imagePath: 'Armações TR90/Occhi’on Firenze Crystal Marble', group: 'tr90' },
  { name: 'Firenze Crystal Mocha', imagePath: 'Armações TR90/Occhi’on Firenze Crystal Mocha', group: 'tr90' },
  { name: 'Firenze Forest Blend', imagePath: 'Armações TR90/Occhi’on Firenze Forest Blend', group: 'tr90' },
  { name: 'Firenze Honey Tartaruga', imagePath: 'Armações TR90/Occhi’on Firenze Honey Tartaruga', group: 'tr90' },
  { name: 'Firenze Ivory Pearl', imagePath: 'Armações TR90/Occhi’on Firenze Ivory Pearl', group: 'tr90' },
  { name: 'Firenze Light Ivory', imagePath: 'Armações TR90/Occhi’on Firenze Light Ivory', group: 'tr90' },
  { name: 'Firenze Light Marble', imagePath: 'Armações TR90/Occhi’on Firenze Light Marble', group: 'tr90' },
  { name: 'Firenze Marble Steel', imagePath: 'Armações TR90/Occhi’on Firenze Marble Steel', group: 'tr90' },
  { name: 'Firenze Ruby Tartaruga', imagePath: 'Armações TR90/Occhi’on Firenze Ruby Tartaruga', group: 'tr90' },
  { name: 'Firenze Urban Havana', imagePath: 'Armações TR90/Occhi’on Firenze Urban Havana', group: 'tr90' },
  { name: 'Firenze Urban Mix', imagePath: 'Armações TR90/Occhi’on Firenze Urban Mix', group: 'tr90' },
  { name: 'Kids Active Round Blue', imagePath: 'Armações TR90/Occhi’on Kids Active Round Blue', group: 'infantil' },
  { name: 'Kids Classic Black', imagePath: 'Armações TR90/Occhi’on Kids Classic Black', group: 'infantil' },
  { name: 'Kids Classic Clear', imagePath: 'Armações TR90/Occhi’on Kids Classic Clear', group: 'infantil' },
  { name: 'Kids Flex Blue', imagePath: 'Armações TR90/Occhi’on Kids Flex Blue', group: 'infantil' },
  { name: 'Kids Flex Ice Blue', imagePath: 'Armações TR90/Occhi’on Kids Flex Ice Blue', group: 'infantil' },
  { name: 'Kids Fresh Clear', imagePath: 'Armações TR90/Occhi’on Kids Fresh Clear', group: 'infantil' },
  { name: 'Kids Sport Black Orange', imagePath: 'Armações TR90/Occhi’on Kids Sport Black Orange', group: 'infantil' },
  { name: 'Kids Sport Strap Black', imagePath: 'Armações TR90/Occhi’on Kids Sport Strap Black', group: 'infantil' },
  { name: 'Kids Sweet Rosé', imagePath: 'Armações TR90/Occhi’on Kids Sweet Rosé', group: 'infantil' },
  { name: 'Milano Dual Contrast', imagePath: 'Armações TR90/Occhi’on Milano Dual Contrast', group: 'tr90' },
  { name: 'Roma Wine Gold', imagePath: 'Armações TR90/Occhi’on Roma Wine Gold', group: 'tr90' },
  { name: 'Torino Clear Flex', imagePath: 'Armações TR90/Occhi’on Torino Clear Flex', group: 'tr90' },
  { name: 'Torino Crystal Clear', imagePath: 'Armações TR90/Occhi’on Torino Crystal Clear', group: 'tr90' },
  { name: 'Torino Emerald', imagePath: 'Armações TR90/Occhi’on Torino Emerald', group: 'tr90' },
  { name: 'Torino Flex Blue', imagePath: 'Armações TR90/Occhi’on Torino Flex Blue', group: 'tr90' },
  { name: 'Torino Graphite Blue', imagePath: 'Armações TR90/Occhi’on Torino Graphite Blue', group: 'tr90' },
  { name: 'Torino Heritage Blue', imagePath: 'Armações TR90/Occhi’on Torino Heritage Blue', group: 'tr90' },
  { name: 'Torino Navy Comfort', imagePath: 'Armações TR90/Occhi’on Torino Navy Comfort', group: 'tr90' },
  { name: 'Torino Navy Line', imagePath: 'Armações TR90/Occhi’on Torino Navy Line', group: 'tr90' },
  { name: 'Torino Shadow Blue', imagePath: 'Armações TR90/Occhi’on Torino Shadow Blue', group: 'tr90' },
  { name: 'Torino Texture', imagePath: 'Armações TR90/Occhi’on Torino Texture', group: 'tr90' },
  { name: 'Torino Wood Touch', imagePath: 'Armações TR90/Occhi’on Torino Wood Touch', group: 'tr90' },
  { name: 'Venezia Champagne', imagePath: 'Armações TR90/Occhi’on Venezia Champagne', group: 'tr90' },
  { name: 'Venezia Navy Ornament', imagePath: 'Armações TR90/Occhi’on Venezia Navy Ornament', group: 'tr90' },
  { name: 'Venezia Wine Gold', imagePath: 'Armações TR90/Occhi’on Venezia Wine Gold', group: 'tr90' },
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

  if (tokens[0] === 'Kids' && tokens.length > 1) {
    return tokens.slice(0, 2).join(' ');
  }

  if (tokens[0] === 'Bell\'occhio' && tokens.length > 1) {
    return tokens[1];
  }

  return tokens[0];
}

function inferVariant(name: string) {
  const tokens = name.split(' ');

  if (tokens[0] === 'Kids') {
    return tokens.slice(2).join(' ') || 'Signature';
  }

  if (tokens[0] === 'Bell\'occhio') {
    return tokens.slice(2).join(' ') || 'Signature';
  }

  return tokens.slice(1).join(' ') || 'Signature';
}

function createOverview(seed: DegreeSeed) {
  if (seed.line === "Bell'occhio") {
    return 'Peça de assinatura da linha Bell\'occhio, incorporada ao catálogo com papel de destaque visual.';
  }

  switch (seed.group) {
    case 'acetato':
      return 'Armação de acetato apresentada com leitura comercial clara, cor bem definida e presença visual consistente.';
    case 'metal':
      return 'Modelo metálico com proposta mais leve e refinada para equilibrar a coleção de grau.';
    case 'tr90':
      return 'Peça leve e funcional para comunicar conforto e uso diário sem perder aparência de coleção.';
    case 'infantil':
      return 'Modelo infantil com foco em adaptação, conforto e segurança de uso contínuo.';
  }
}

function createDescription(seed: DegreeSeed) {
  if (seed.line === "Bell'occhio") {
    return `${seed.name} foi integrado ao site como peça de assinatura, ajudando a separar a linha Bell'occhio dentro do universo OCCHI'ON.`;
  }

  switch (seed.group) {
    case 'acetato':
      return `${seed.name} amplia a frente de acetato com linguagem mais premium e pronta para apresentação comercial.`;
    case 'metal':
      return `${seed.name} reforça a coleção de metal com uma proposta mais leve, discreta e alinhada à vitrine óptica.`;
    case 'tr90':
      return `${seed.name} traduz o repertório de TR90 em uma narrativa de conforto, leveza e rotina de uso.`;
    case 'infantil':
      return `${seed.name} ajuda a estruturar a categoria infantil com comunicação mais clara para pais e responsáveis.`;
  }
}

function createStory(seed: DegreeSeed) {
  if (seed.line === "Bell'occhio") {
    return 'Na apresentação do site, este item funciona como reforço de curadoria e assinatura de linha.';
  }

  switch (seed.group) {
    case 'acetato':
      return 'É um item útil para demonstrar amplitude de cor e acabamento dentro da coleção de grau.';
    case 'metal':
      return 'Ajuda a equilibrar a vitrine com uma leitura mais limpa e refinada.';
    case 'tr90':
      return 'Sustenta a organização do catálogo por material e benefício sem deixar a navegação técnica demais.';
    case 'infantil':
      return 'Mostra que o site já comporta a linha infantil de forma organizada e coerente com o restante do catálogo.';
  }
}

function createFeatures(seed: DegreeSeed, meta: (typeof GROUP_META)[DegreeGroup]) {
  const features = [meta.subcategoryLabel, 'Recebe lente'];

  if (seed.line === "Bell'occhio") {
    features.unshift("Bell'occhio");
  }

  const name = seed.name.toLowerCase();

  if (name.includes('classic')) features.push('Classic');
  if (name.includes('comfort')) features.push('Comfort');
  if (name.includes('sport')) features.push('Sport');
  if (name.includes('clip')) features.push('Clip-On');
  if (name.includes('crystal')) features.push('Crystal');
  if (name.includes('flex')) features.push('Flex');

  return Array.from(new Set(features));
}

function createProduct(seed: DegreeSeed): Product {
  const meta = GROUP_META[seed.group];
  const displayName = seed.line === "Bell'occhio" ? `OCCHI'ON Bell'occhio ${seed.name.replace(/^Bell'occhio\s*/, '')}` : `OCCHI'ON ${seed.name}`;
  const model = inferModel(seed.name);
  const variant = inferVariant(seed.name);
  const resolvedBasePriceCents = getDegreeBasePriceCents(seed.name, meta.subcategory as DegreePriceGroup) ?? meta.basePriceCents;

  return {
    id: slugify(`${displayName}-${meta.subcategory}`),
    brand: "OCCHI'ON",
    line: seed.line ?? (seed.group === 'infantil' ? "OCCHI'ON Kids" : "OCCHI'ON"),
    model,
    variant,
    displayName,
    basePriceCents: resolvedBasePriceCents,
    category: 'grau',
    categoryLabel: 'Óculos de Grau',
    subcategory: meta.subcategory,
    subcategoryLabel: meta.subcategoryLabel,
    material: meta.material,
    audience: meta.audience,
    badge: seed.line === "Bell'occhio" ? "Bell'occhio" : meta.defaultBadge,
    overview: createOverview(seed),
    description: createDescription(seed),
    story: createStory(seed),
    colors: [variant],
    features: createFeatures(seed, meta),
    technical: {
      measurements: meta.measurements,
      format: meta.format,
      fit: meta.fit,
      bridge: meta.bridge,
      temples: meta.temples,
      lensCompatibility:
        seed.group === 'infantil' ? 'Monofocal e digital sob conferência de adaptação' : 'Monofocal, digital e multifocal sob avaliação',
      productionNote:
        seed.group === 'infantil'
          ? 'Parâmetros infantis e combinações especiais seguem para conferência humana.'
          : seed.group === 'metal'
            ? 'Ajustes de lente e grau final dependem da validação operacional da ótica.'
            : undefined,
    },
    prescriptionFlow: degreePrescriptionFlow,
    image: createClientAssetPath(seed.imagePath),
    imageAlt: displayName,
  };
}

export const degreeProducts: Product[] = degreeSeeds.map(createProduct);
