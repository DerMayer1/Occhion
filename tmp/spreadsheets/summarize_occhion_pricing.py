from __future__ import annotations

import json
from collections import Counter, defaultdict
from pathlib import Path

DATA_PATH = Path(r"C:\Users\lucas\Occhion-main\tmp\spreadsheets\occhion_pricing_data.json")


def main() -> None:
    data = json.loads(DATA_PATH.read_text(encoding="utf-8"))

    print("=== ARMAÇÕES SAMPLE ===")
    for record in data["catalog"]["armacoes"][:20]:
        print(record)

    print("\n=== SOLARES SAMPLE ===")
    for record in data["catalog"]["solares"][:20]:
        print(record)

    print("\n=== ARMAÇÕES PRICE COUNTS ===")
    arma_counts = Counter(record["valor_venda"] for record in data["catalog"]["armacoes"])
    for value, count in arma_counts.most_common():
        print(value, count)

    print("\n=== SOLARES PRICE COUNTS ===")
    solar_counts = Counter(record["valor_venda"] for record in data["catalog"]["solares"])
    for value, count in solar_counts.most_common():
        print(value, count)

    print("\n=== LENSES ROWS ===")
    for row in data["lenses"]["rows"]:
        print(row)

    print("\n=== ARMAÇÕES MODELS WITH MULTIPLE PRICES ===")
    armacao_prices = defaultdict(set)
    for record in data["catalog"]["armacoes"]:
        armacao_prices[record["modelo"]].add(record["valor_venda"])
    for model, prices in sorted(armacao_prices.items()):
        if len(prices) > 1:
            print(model, sorted(prices))

    print("\n=== SOLARES MODELS WITH MULTIPLE PRICES ===")
    solar_prices = defaultdict(set)
    for record in data["catalog"]["solares"]:
        solar_prices[record["modelo"]].add(record["valor_venda"])
    for model, prices in sorted(solar_prices.items()):
        if len(prices) > 1:
            print(model, sorted(prices))


if __name__ == "__main__":
    main()
