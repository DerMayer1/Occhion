from __future__ import annotations

import json
from pathlib import Path
from xml.etree import ElementTree as ET
from zipfile import ZipFile

MAIN_NS = {"main": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}
REL_NS = {"rel": "http://schemas.openxmlformats.org/package/2006/relationships"}

LENSES_WORKBOOK = Path(r"C:\Users\lucas\Downloads\occhion_cliente\lentes site.xlsx")
CATALOG_WORKBOOK = Path(r"C:\Users\lucas\Downloads\occhion_cliente\Estoque e Precificação Occhion_Mar-26_site.xlsx")
OUTPUT_PATH = Path(r"C:\Users\lucas\Occhion-main\tmp\spreadsheets\occhion_pricing_data.json")


def column_index(cell_ref: str) -> int:
    letters = "".join(character for character in cell_ref if character.isalpha())
    result = 0
    for char in letters:
        result = result * 26 + (ord(char.upper()) - 64)
    return result - 1


def load_shared_strings(zip_file: ZipFile) -> list[str]:
    try:
        shared_strings_xml = zip_file.read("xl/sharedStrings.xml")
    except KeyError:
        return []

    root = ET.fromstring(shared_strings_xml)
    values: list[str] = []
    for item in root.findall("main:si", MAIN_NS):
        texts = [node.text or "" for node in item.findall(".//main:t", MAIN_NS)]
        values.append("".join(texts))
    return values


def workbook_sheet_targets(zip_file: ZipFile) -> dict[str, str]:
    workbook_root = ET.fromstring(zip_file.read("xl/workbook.xml"))
    rel_root = ET.fromstring(zip_file.read("xl/_rels/workbook.xml.rels"))
    relations = {
        rel.attrib["Id"]: rel.attrib["Target"]
        for rel in rel_root.findall("rel:Relationship", REL_NS)
    }

    result: dict[str, str] = {}
    for sheet in workbook_root.findall("main:sheets/main:sheet", MAIN_NS):
        name = sheet.attrib["name"]
        relation_id = sheet.attrib["{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id"]
        target = relations[relation_id]
        if not target.startswith("xl/"):
            target = f"xl/{target}"
        result[name] = target
    return result


def sheet_rows(zip_file: ZipFile, sheet_path: str, shared_strings: list[str]) -> list[list[str]]:
    root = ET.fromstring(zip_file.read(sheet_path))
    rows: list[list[str]] = []
    row_nodes = root.findall("main:sheetData/main:row", MAIN_NS)
    for row in row_nodes:
        values_by_index: dict[int, str] = {}
        max_index = -1
        for cell in row.findall("main:c", MAIN_NS):
            ref = cell.attrib.get("r", "")
            index = column_index(ref) if ref else max_index + 1
            max_index = max(max_index, index)
            value_node = cell.find("main:v", MAIN_NS)
            value = value_node.text if value_node is not None else ""
            if cell.attrib.get("t") == "s" and value:
                try:
                    values_by_index[index] = shared_strings[int(value)]
                except (ValueError, IndexError):
                    values_by_index[index] = value
            else:
                values_by_index[index] = value or ""

        if max_index >= 0:
            rows.append([values_by_index.get(i, "").strip() for i in range(max_index + 1)])
    return rows


def read_workbook(workbook_path: Path) -> dict[str, list[list[str]]]:
    with ZipFile(workbook_path) as zip_file:
        shared_strings = load_shared_strings(zip_file)
        targets = workbook_sheet_targets(zip_file)
        return {
            sheet_name: sheet_rows(zip_file, sheet_path, shared_strings)
            for sheet_name, sheet_path in targets.items()
        }


def normalize_whitespace(value: str) -> str:
    return " ".join(value.replace("\xa0", " ").split())


def parse_price_cents(value: str) -> int | None:
    text = normalize_whitespace(value).replace("R$", "").replace(".", "").replace(",", ".")
    if not text:
        return None
    try:
        return int(round(float(text) * 100))
    except ValueError:
        return None


def make_records(rows: list[list[str]]) -> list[dict[str, str]]:
    if not rows:
        return []

    headers = [normalize_whitespace(header) for header in rows[0]]
    records: list[dict[str, str]] = []
    for row in rows[1:]:
        record = {
            headers[index]: normalize_whitespace(row[index]) if index < len(row) else ""
            for index in range(len(headers))
            if headers[index]
        }
        if any(record.values()):
            records.append(record)
    return records


def add_catalog_metadata(records: list[dict[str, str]], sheet_name: str) -> list[dict[str, object]]:
    enriched: list[dict[str, object]] = []
    for record in records:
        price_cents = parse_price_cents(record.get("Valor de Venda", ""))
        enriched.append(
            {
                "sheet": sheet_name,
                "modelo": record.get("Modelo", ""),
                "material": record.get("Material", ""),
                "especificacao": record.get("Especificação", ""),
                "descricao": record.get("Descrição", ""),
                "sku": record.get("Codigo/SKU", ""),
                "categoria": record.get("Categoria", ""),
                "cor": record.get("Cor", ""),
                "foto_drive": record.get("Foto Drive", ""),
                "estoque": record.get("Quantidade Estoque", ""),
                "valor_venda": record.get("Valor de Venda", ""),
                "valor_venda_cents": price_cents,
                "observacoes": record.get("Observações", ""),
            }
        )
    return enriched


def main() -> None:
    catalog_data = read_workbook(CATALOG_WORKBOOK)
    lenses_data = read_workbook(LENSES_WORKBOOK)

    armacoes = add_catalog_metadata(make_records(catalog_data["Armações"]), "Armações")
    solares = add_catalog_metadata(make_records(catalog_data["Solares"]), "Solares")

    lenses_rows = [
        {"row": index, "cells": [normalize_whitespace(cell) for cell in row]}
        for index, row in enumerate(lenses_data["Planilha1"], start=1)
    ]

    payload = {
        "catalog": {
            "armacoes": armacoes,
            "solares": solares,
        },
        "lenses": {
            "rows": lenses_rows,
        },
    }

    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_PATH.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")

    print(f"Wrote {OUTPUT_PATH}")
    print(f"Armações: {len(armacoes)} registros")
    print(f"Solares: {len(solares)} registros")
    print(f"Lentes: {len(lenses_rows)} linhas")


if __name__ == "__main__":
    main()
