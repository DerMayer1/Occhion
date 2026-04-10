from __future__ import annotations

import json
from decimal import Decimal, InvalidOperation
from pathlib import Path

ROOT = Path(r"C:\Users\lucas\Occhion-main")
DATA_PATH = ROOT / "tmp" / "spreadsheets" / "occhion_pricing_data.json"
OUTPUT_PATH = ROOT / "src" / "data" / "catalog-pricing.ts"


def parse_price_cents(value: str) -> int:
    text = value.strip().replace("R$", "").replace(",", ".")
    decimal_value = Decimal(text)
    return int(decimal_value * 100)


def escape_ts(value: str) -> str:
    return value.replace("\\", "\\\\").replace("'", "\\'")


def degree_group(record: dict[str, object]) -> str:
    model = str(record["modelo"]).lower()
    material = str(record["material"]).lower()
    if "kids" in model:
        return "infantil"
    if material == "metal":
        return "metal"
    if material == "tr90":
        return "tr90"
    return "acetato"


def solar_group(record: dict[str, object]) -> str:
    model = str(record["modelo"]).lower()
    category = str(record["categoria"]).lower()
    if "clip" in category:
        return "clip-on"
    if "bellochio" in model or "bellocchio" in model:
        return "bellocchio"
    return "solar"


def build_record_lines(records: list[dict[str, object]], group_fn) -> list[str]:
    lines: list[str] = []
    for record in records:
        value = str(record.get("valor_venda", "")).strip()
        if not value:
            continue
        try:
            price_cents = parse_price_cents(value)
        except (InvalidOperation, ValueError):
            continue
        model = escape_ts(str(record["modelo"]))
        group = group_fn(record)
        lines.append(f"  ['{model}', '{group}', {price_cents}],")
    return lines


def main() -> None:
    payload = json.loads(DATA_PATH.read_text(encoding="utf-8"))
    degree_lines = build_record_lines(payload["catalog"]["armacoes"], degree_group)
    solar_lines = build_record_lines(payload["catalog"]["solares"], solar_group)

    file_contents = f"""import type {{ CatalogSubcategoryId }} from '../types/catalog';

export type DegreePriceGroup = Extract<CatalogSubcategoryId, 'acetato' | 'metal' | 'tr90' | 'infantil'>;
export type SolarPriceGroup = Extract<CatalogSubcategoryId, 'solar' | 'bellocchio' | 'clip-on'>;

type PriceRecord<TGroup extends string> = readonly [modelName: string, group: TGroup, priceCents: number];

const DEGREE_PRICE_RECORDS: PriceRecord<DegreePriceGroup>[] = [
{chr(10).join(degree_lines)}
];

const SOLAR_PRICE_RECORDS: PriceRecord<SolarPriceGroup>[] = [
{chr(10).join(solar_lines)}
];

const MANUAL_NAME_ALIASES: Record<string, string> = {{
  'azurro': 'azzurro',
  'bellocchio cosmo': 'bellocchio cosmos',
  'bellocchio cosmo clip on': 'bellocchio cosmos',
  'bellocchio fusion clip on': 'bellocchio fusion',
  'bellocchio valerie clip on': 'bellocchio valerie',
  'capri cafe': 'capri caffe',
  'capri vintage black': 'capri vintage black gold',
  'torino texture': 'torino texture black',
}};

const MANUAL_PRICE_OVERRIDES: Record<string, number> = {{
  'firenze classic blend|acetato': 18990,
  'roma silver|metal': 16990,
}};

function normalizeModelName(value: string) {{
  const aliasAware = value
    .normalize('NFD')
    .replace(/[\\u0300-\\u036f]/g, '')
    .replace(/bell['’]?\\s*occhio/gi, 'bellocchio')
    .replace(/bellochio/gi, 'bellocchio')
    .replace(/occhi['’]?on/gi, '')
    .replace(/occhion/gi, '')
    .replace(/porto\\s*fino/gi, 'portofino')
    .replace(/clip[\\s-]*on/gi, 'clip on')
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .toLowerCase();

  return MANUAL_NAME_ALIASES[aliasAware] ?? aliasAware;
}}

function resolveCatalogPrice<TGroup extends string>(
  records: PriceRecord<TGroup>[],
  modelName: string,
  group: TGroup,
): number | undefined {{
  const normalizedName = normalizeModelName(modelName);
  const overrideKey = `${{normalizedName}}|${{group}}`;

  if (MANUAL_PRICE_OVERRIDES[overrideKey]) {{
    return MANUAL_PRICE_OVERRIDES[overrideKey];
  }}

  const exactMatch = records.find(([recordName, recordGroup]) => normalizeModelName(recordName) === normalizedName && recordGroup === group);
  if (exactMatch) {{
    return exactMatch[2];
  }}

  const sameNameCandidates = records.filter(([recordName]) => normalizeModelName(recordName) === normalizedName);
  if (sameNameCandidates.length === 1) {{
    return sameNameCandidates[0][2];
  }}

  return undefined;
}}

export function getDegreeBasePriceCents(modelName: string, group: DegreePriceGroup) {{
  return resolveCatalogPrice(DEGREE_PRICE_RECORDS, modelName, group);
}}

export function getSolarBasePriceCents(modelName: string, group: SolarPriceGroup) {{
  return resolveCatalogPrice(SOLAR_PRICE_RECORDS, modelName, group);
}}
"""

    OUTPUT_PATH.write_text(file_contents, encoding="utf-8")
    print(f"Wrote {{OUTPUT_PATH}}")


if __name__ == "__main__":
    main()
