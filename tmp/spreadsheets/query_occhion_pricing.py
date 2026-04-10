from __future__ import annotations

import json
import sys
from pathlib import Path

DATA_PATH = Path(r"C:\Users\lucas\Occhion-main\tmp\spreadsheets\occhion_pricing_data.json")


def main() -> None:
    data = json.loads(DATA_PATH.read_text(encoding="utf-8"))
    terms = [term.lower() for term in sys.argv[1:]]
    if not terms:
        print("Pass one or more search fragments.")
        return

    records = [*data["catalog"]["armacoes"], *data["catalog"]["solares"]]
    for record in records:
        haystack = " ".join(str(value) for value in record.values()).lower()
        if all(term in haystack for term in terms):
            print(record)


if __name__ == "__main__":
    main()
