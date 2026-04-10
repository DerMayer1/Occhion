from __future__ import annotations

import json
import re
import unicodedata
from pathlib import Path

ROOT = Path(r"C:\Users\lucas\Occhion-main")
DATA_PATH = ROOT / "tmp" / "spreadsheets" / "occhion_pricing_data.json"
DEGREE_FILE = ROOT / "src" / "data" / "products-degree.ts"
SOLAR_FILE = ROOT / "src" / "data" / "products-solar.ts"


def normalize(value: str) -> str:
    normalized = unicodedata.normalize("NFKD", value)
    normalized = normalized.encode("ascii", "ignore").decode("ascii")
    normalized = normalized.lower()
    normalized = normalized.replace("bell'occhio", "bellocchio")
    normalized = normalized.replace("bell occhio", "bellocchio")
    normalized = normalized.replace("occhi'on", "")
    normalized = normalized.replace("occhion", "")
    normalized = normalized.replace("bellochio", "bellocchio")
    normalized = normalized.replace("porto fino", "portofino")
    normalized = normalized.replace("clipon", "clip on")
    normalized = re.sub(r"[^a-z0-9]+", " ", normalized)
    normalized = re.sub(r"\s+", " ", normalized).strip()
    aliases = {
        "azurro": "azzurro",
        "bellocchio cosmo": "bellocchio cosmos",
        "bellocchio cosmo clip on": "bellocchio cosmos",
        "bellocchio fusion clip on": "bellocchio fusion",
        "bellocchio valerie clip on": "bellocchio valerie",
        "capri cafe": "capri caffe",
        "capri vintage black": "capri vintage black gold",
        "torino texture": "torino texture black",
    }
    return aliases.get(normalized, normalized)


def extract_names(path: Path) -> list[str]:
    text = path.read_text(encoding="utf-8")
    return [match.replace("\\'", "'") for match in re.findall(r"name:\s*'((?:\\'|[^'])+)'", text)]


def main() -> None:
    data = json.loads(DATA_PATH.read_text(encoding="utf-8"))
    degree_names = extract_names(DEGREE_FILE)
    solar_names = extract_names(SOLAR_FILE)

    degree_prices = {normalize(record["modelo"]): record for record in data["catalog"]["armacoes"]}
    solar_prices = {normalize(record["modelo"]): record for record in data["catalog"]["solares"]}

    print("=== DEGREE MATCHES ===")
    degree_missing: list[str] = []
    for name in degree_names:
        key = normalize(name)
        record = degree_prices.get(key)
        if record:
            print(f"OK | {name} -> {record['modelo']} | {record['valor_venda']}")
        else:
            degree_missing.append(name)
            print(f"MISS | {name}")

    print("\n=== SOLAR MATCHES ===")
    solar_missing: list[str] = []
    for name in solar_names:
        key = normalize(name)
        record = solar_prices.get(key)
        if record:
            print(f"OK | {name} -> {record['modelo']} | {record['valor_venda']}")
        else:
            solar_missing.append(name)
            print(f"MISS | {name}")

    print(f"\nDegree missing: {len(degree_missing)}")
    for name in degree_missing:
        print(" -", name)
    print(f"Solar missing: {len(solar_missing)}")
    for name in solar_missing:
        print(" -", name)


if __name__ == "__main__":
    main()
