export function createClientAssetPath(relativePath: string) {
  const normalized = relativePath.replace(/\\/g, '/').replace(/^\/+/, '');
  return `/client-assets/${encodeURIComponent(normalized)}`;
}

export function toTitleCase(value: string) {
  return value
    .toLowerCase()
    .split(' ')
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' ');
}

export function normalizeVariantLabel(value: string) {
  return value.replace(/_/g, '').replace(/\(1\)/g, '').trim();
}

export function joinList(values: string[]) {
  return values.filter(Boolean).join(' • ');
}

export function formatCurrency(valueInCents: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valueInCents / 100);
}
