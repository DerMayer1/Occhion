import type { CatalogSubcategoryId } from '../types/catalog';

export type DegreePriceGroup = Extract<CatalogSubcategoryId, 'acetato' | 'metal' | 'tr90' | 'infantil'>;
export type SolarPriceGroup = Extract<CatalogSubcategoryId, 'solar' | 'bellocchio' | 'clip-on'>;

type PriceRecord<TGroup extends string> = readonly [modelName: string, group: TGroup, priceCents: number];

const DEGREE_PRICE_RECORDS: PriceRecord<DegreePriceGroup>[] = [
  ['Occhi’on Capri Vintage Black Gold', 'tr90', 13990],
  ['Occhi’on Capri Vintage Gold', 'tr90', 13990],
  ['Occhi’on Firenze Light Ivory', 'tr90', 13990],
  ['Occhi’on Milano Graphite', 'metal', 16990],
  ['Occhi’on Torino Navy Comfort', 'tr90', 13990],
  ['Occhi’on Firenze Air', 'metal', 16990],
  ['Occhi’on Roma Wine Gold', 'tr90', 13990],
  ['Occhi’on Venezia Wine Gold', 'tr90', 13990],
  ['Occhi’on Torino Silver', 'metal', 16990],
  ['Occhi’on Bellocchio Toscana', 'acetato', 18990],
  ['Occhi’on Capri Vintage Ruby', 'tr90', 13990],
  ['Occhi’on Torino Ocean Blue', 'acetato', 18990],
  ['Occhi’on Torino Ocean', 'acetato', 18990],
  ['Occhi’on Torino Navy', 'metal', 16990],
  ['Occhi’on Capri Honey Havana', 'acetato', 18990],
  ['Occhi’on Capri Classic Black', 'acetato', 18990],
  ['Occhi’on Firenze Gradient Brown', 'acetato', 18990],
  ['Occhi’on Capri Black Tartaruga', 'acetato', 18990],
  ['Occhi’on Capri Light', 'tr90', 13990],
  ['Occhi’on Capri Light Black', 'tr90', 13990],
  ['Occhi’on Firenze Ruby Marble', 'acetato', 18990],
  ['Occhi’on Firenze Forest Blend', 'acetato', 18990],
  ['Occhi’on Firenze Urban Mix', 'tr90', 13990],
  ['Occhi’on Firenze Sunset Amber', 'acetato', 18990],
  ['Occhi’on Firenze Bold Navy', 'acetato', 18990],
  ['Occhi’on Capri Rosé Crystal', 'tr90', 13990],
  ['Occhi’on Capri Navy', 'acetato', 18990],
  ['Occhi’on Capri Classic Navy', 'acetato', 18990],
  ['Occhi’on Capri Mocha', 'acetato', 18990],
  ['Occhi’on Capri Dark Tortoise', 'acetato', 18990],
  ['Occhi’on Capri Classic Tartaruga', 'acetato', 18990],
  ['Occhi’on Torino Emerald', 'tr90', 13990],
  ['Occhi’on Firenze Sunset Blend', 'acetato', 18990],
  ['Occhi’on Firenze Forest Blend', 'tr90', 13990],
  ['Occhi’on Capri Ocean Tartaruga', 'tr90', 13990],
  ['Occhi’on Kids Fresh Clear', 'infantil', 13990],
  ['Occhi’on Kids Sport Black Orange', 'infantil', 13990],
  ['Occhi’on Roma Graphite', 'metal', 16990],
  ['Occhi’on Capri Ocean Mix', 'acetato', 18990],
  ['Occhi’on Firenze Classic Contrast', 'tr90', 13990],
  ['Occhi’on Firenze Ruby Tartaruga', 'tr90', 13990],
  ['Occhi’on Kids Active Round Blue', 'infantil', 13990],
  ['Occhi’on Capri Matte Black Comfort', 'tr90', 13990],
  ['Occhi’on Firenze Classic Line', 'tr90', 13990],
  ['Occhi’on Torino Shadow Blue', 'tr90', 13990],
  ['Occhi’on Bellochio Camelia', 'tr90', 13990],
  ['Occhi’on Bellocchio Milano', 'tr90', 13990],
  ['Occhi’on Bellocchio Polaris', 'acetato', 18990],
  ['Occhi’on Firenze Ivory Pearl', 'tr90', 13990],
  ['Occhi’on Firenze Amber Pop', 'acetato', 18990],
  ['Occhi’on Firenze Wine Art', 'acetato', 18990],
  ['Occhi’on Firenze Aurora Green', 'acetato', 18990],
  ['Occhi’on Firenze Light Marble', 'tr90', 13990],
  ['Occhi’on Firenze Navy Soft', 'acetato', 18990],
  ['Occhi’on Firenze Black Marble', 'tr90', 13990],
  ['Occhi’on Firenze Essential Navy', 'acetato', 18990],
  ['Occhi’on Firenze Crystal Mocha', 'tr90', 13990],
  ['Occhi’on Torino Flex Blue', 'tr90', 13990],
  ['Occhi’on Firenze Classic Havana Bold', 'acetato', 18990],
  ['Occhi’on Firenze Classic Navy', 'acetato', 18990],
  ['Occhi’on Firenze Crystal Navy', 'acetato', 18990],
  ['Occhi’on Firenze Dark Havana', 'acetato', 18990],
  ['Occhi’on Firenze Soft Navy', 'acetato', 18990],
  ['Occhi’on Firenze Crystal Line', 'acetato', 18990],
  ['Occhi’on Torino Clear Flex', 'tr90', 13990],
  ['Occhi’on Torino Ice', 'acetato', 18990],
  ['Occhi’on Firenze Slim Havana', 'acetato', 18990],
  ['Occhi’on Capri Deep Black', 'tr90', 13990],
  ['Occhi’on Firenze Soft Havana', 'acetato', 18990],
  ['Occhi’on Torino Ice Blue', 'acetato', 18990],
  ['Occhi’on Torino Texture Blue', 'acetato', 18990],
  ['Occhi’on Firenze Graphite Navy', 'acetato', 18990],
  ['Occhi’on Torino Heritage Blue', 'tr90', 13990],
  ['Occhi’on Torino Graphite Blue', 'tr90', 13990],
  ['Occhi’on Capri Crystal Navy Sport', 'acetato', 18990],
  ['Occhi’on Capri Midnight', 'tr90', 13990],
  ['Occhi’on Firenze Clear Light', 'tr90', 13990],
  ['Occhi’on Torino Crystal Smoke', 'acetato', 18990],
  ['Occhi’on Torino Blue Crystal', 'acetato', 18990],
  ['Occhi’on Torino Texture Black', 'tr90', 13990],
  ['Occhi’on Firenze Deep Navy', 'acetato', 18990],
  ['Occhi’on Firenze Classic Navy Matte', 'acetato', 18990],
  ['Occhi’on Capri Matte Black', 'tr90', 13990],
  ['Occhi’on Firenze Urban Havana', 'tr90', 13990],
  ['Occhi’on Torino Crystal Clear', 'tr90', 13990],
  ['Occhi’on Firenze Classic Dark', 'acetato', 18990],
  ['Occhi’on Torino Sport Blue', 'acetato', 18990],
  ['Occhi’on Firenze Gold', 'metal', 16990],
  ['Occhi’on Venezia Ruby', 'acetato', 18990],
  ['Occhi’on Venezia Aurora', 'acetato', 18990],
  ['Occhi’on Capri Matte Black', 'tr90', 13990],
  ['Occhi’on Firenze Honey', 'acetato', 18990],
  ['Occhi’on Milano Dual Contrast', 'tr90', 13990],
  ['Occhi’on Bellocchio Milano Color Mix', 'tr90', 13990],
  ['Occhi’on Venezia Champagne', 'tr90', 13990],
  ['Occhi’on Venezia Gold Havana', 'acetato', 18990],
  ['Occhi’on Torino Smoke', 'acetato', 18990],
  ['Occhi’on Torino Wood Touch', 'acetato', 18990],
  ['Occhi’on Firenze Crystal Marble', 'tr90', 13990],
  ['Occhi’on Firenze Classic Havana', 'acetato', 18990],
  ['Occhi’on Kids Sweet Rosé', 'infantil', 13990],
  ['Occhi’on Kids Classic Black', 'infantil', 13990],
  ['Occhi’on Torino Graphite Texture', 'acetato', 18990],
  ['Occhi’on Kids Sport Strap Black', 'infantil', 13990],
  ['Occhi’on Bellocchio Blush', 'tr90', 13990],
  ['Tommy Hilfiger TH Pink Line', 'metal', 16990],
  ['Occhi’on Kids Flex Blue', 'infantil', 13990],
  ['Occhi’on Kids Flex Ice Blue', 'infantil', 13990],
  ['Occhi’on Firenze Marble Steel', 'tr90', 13990],
  ['Occhi’on Venezia Navy Ornament', 'tr90', 13990],
  ['Occhi’on Firenze Honey Tartaruga', 'tr90', 13990],
  ['Occhi’on Torino Navy Line', 'tr90', 13990],
  ['Occhi’on Venezia Gold', 'metal', 16990],
  ['Occhi’on Kids Classic Clear', 'infantil', 13990],
];

const SOLAR_PRICE_RECORDS: PriceRecord<SolarPriceGroup>[] = [
  ['Occhi’on Firenze Sport Black Red', 'solar', 27000],
  ['Occhi’on Firenze Clip Urban Black', 'clip-on', 27000],
  ['Occhi’on Firenze Clip Sport Black', 'clip-on', 27000],
  ['Occhi’on Venezia Clip Blush Gold', 'clip-on', 27000],
  ['Occhi’on Kids Clip Navy', 'clip-on', 27000],
  ['Occhion Bellochio Fusion', 'clip-on', 14990],
  ['Occhion Porto Fino', 'solar', 39900],
  ['Occhion Terra di Sole', 'solar', 39900],
  ['Occhion Sole Mio', 'solar', 39900],
  ['Occhion Victorio Black', 'solar', 39900],
  ['Occhion Positano', 'solar', 27000],
  ['Occhion Positano Black', 'solar', 27000],
  ['Occhion Cote Icon', 'solar', 39900],
  ['Occhion Torino', 'solar', 39900],
  ['Occhion Dorato Caramell', 'solar', 39900],
  ['Occhion Dorato', 'solar', 39900],
  ['Occhion Victorio Blue', 'solar', 39900],
  ['Occhion Victorio Nude', 'solar', 39900],
  ['Occhion Gatta Black', 'solar', 27000],
  ['Occhi’on Capri Clip Black', 'clip-on', 27000],
  ['Occhion Monza', 'solar', 24990],
  ['Occhion Bellochio Aurora', 'bellocchio', 14990],
  ['Occhion Bellochio Noir', 'bellocchio', 14990],
  ['Occhion Bellochio Lumina', 'bellocchio', 14990],
  ['Occhion Bellochio Eden', 'bellocchio', 14990],
  ['Occhion Bellochio Nebbia', 'bellocchio', 14990],
  ['Occhion Bellagio', 'solar', 14990],
  ['Occhion Bellochio Oliva', 'bellocchio', 12990],
  ['Occhion Bellochio Merlot', 'bellocchio', 12990],
  ['Occhion Bellochio Smoke', 'bellocchio', 12990],
  ['Occhion Bellochio Ambar', 'bellocchio', 12990],
  ['Occhion Bellochio Laguna', 'bellocchio', 12990],
  ['Occhion Dolce Vitta', 'solar', 39900],
  ['Occhi’on Firenze Comfort Graphite', 'solar', 27000],
  ['Occhion Firenze', 'solar', 39900],
  ['Occhion Firenze Rosé', 'solar', 39900],
  ['Occhion Capri Smoke', 'solar', 39900],
  ['Occhion Azzurro', 'solar', 39900],
  ['Occhion Positano Blue', 'solar', 27000],
  ['Occhion Bellochio Valerie', 'clip-on', 14990],
  ['Occhion Bellochio Cosmos', 'clip-on', 12990],
  ['Occhion Bellochio Dark Glam', 'bellocchio', 14990],
  ['Occhion Gatta Nude', 'solar', 27000],
  ['Occhi’on Firenze Classic Black Gold', 'solar', 39900],
  ['Occhion Capri Blue', 'solar', 39900],
  ['Occhion Riviera', 'solar', 39900],
  ['Occhion Pinot Noir Black', 'solar', 39900],
  ['Occhion Pinot Noir Eclipse', 'solar', 39900],
  ['Occhion Pinot Noir Silver', 'solar', 39900],
  ['Occhi’on Firenze Matte Black Comfort', 'solar', 27000],
  ['Occhion Cote', 'solar', 39900],
  ['Occhion Cote Midnight', 'solar', 39900],
  ['Occhion Capri Caffé', 'solar', 39900],
  ['Occhion Giada', 'solar', 39900],
  ['Occhion Gatta', 'solar', 27000],
  ['Occhion Helm Black', 'solar', 27000],
  ['Occhi’on Firenze Comfort Black', 'solar', 27000],
  ['Occhion Pinot Noir Mirror', 'solar', 39900],
  ['Occhion Pinot Noir', 'solar', 39900],
  ['Occhi’on Firenze Essential Black', 'solar', 27000],
  ['Occhi’on Capri Comfort Black', 'solar', 27000],
];

const MANUAL_NAME_ALIASES: Record<string, string> = {
  'azurro': 'azzurro',
  'bellocchio cosmo': 'bellocchio cosmos',
  'bellocchio cosmo clip on': 'bellocchio cosmos',
  'bellocchio fusion clip on': 'bellocchio fusion',
  'bellocchio valerie clip on': 'bellocchio valerie',
  'capri cafe': 'capri caffe',
  'capri vintage black': 'capri vintage black gold',
  'torino texture': 'torino texture black',
};

const MANUAL_PRICE_OVERRIDES: Record<string, number> = {
  'firenze classic blend|acetato': 18990,
  'roma silver|metal': 16990,
};

function normalizeModelName(value: string) {
  const aliasAware = value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/bell['’]?\s*occhio/gi, 'bellocchio')
    .replace(/bellochio/gi, 'bellocchio')
    .replace(/occhi['’]?on/gi, '')
    .replace(/occhion/gi, '')
    .replace(/porto\s*fino/gi, 'portofino')
    .replace(/clip[\s-]*on/gi, 'clip on')
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .toLowerCase();

  return MANUAL_NAME_ALIASES[aliasAware] ?? aliasAware;
}

function resolveCatalogPrice<TGroup extends string>(
  records: PriceRecord<TGroup>[],
  modelName: string,
  group: TGroup,
): number | undefined {
  const normalizedName = normalizeModelName(modelName);
  const overrideKey = `${normalizedName}|${group}`;

  if (MANUAL_PRICE_OVERRIDES[overrideKey]) {
    return MANUAL_PRICE_OVERRIDES[overrideKey];
  }

  const exactMatch = records.find(([recordName, recordGroup]) => normalizeModelName(recordName) === normalizedName && recordGroup === group);
  if (exactMatch) {
    return exactMatch[2];
  }

  const sameNameCandidates = records.filter(([recordName]) => normalizeModelName(recordName) === normalizedName);
  if (sameNameCandidates.length === 1) {
    return sameNameCandidates[0][2];
  }

  return undefined;
}

export function getDegreeBasePriceCents(modelName: string, group: DegreePriceGroup) {
  return resolveCatalogPrice(DEGREE_PRICE_RECORDS, modelName, group);
}

export function getSolarBasePriceCents(modelName: string, group: SolarPriceGroup) {
  return resolveCatalogPrice(SOLAR_PRICE_RECORDS, modelName, group);
}
