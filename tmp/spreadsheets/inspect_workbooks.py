from __future__ import annotations

from collections import defaultdict
from pathlib import Path
from xml.etree import ElementTree as ET
from zipfile import ZipFile


WORKBOOKS = [
    Path(r"C:\Users\lucas\Downloads\occhion_cliente\lentes site.xlsx"),
    Path(r"C:\Users\lucas\Downloads\occhion_cliente\Estoque e Precificação Occhion_Mar-26_site.xlsx"),
]

MAIN_NS = {"main": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}
REL_NS = {"rel": "http://schemas.openxmlformats.org/package/2006/relationships"}


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


def workbook_sheet_targets(zip_file: ZipFile) -> list[tuple[str, str]]:
    workbook_root = ET.fromstring(zip_file.read("xl/workbook.xml"))
    rel_root = ET.fromstring(zip_file.read("xl/_rels/workbook.xml.rels"))

    relations = {
        rel.attrib["Id"]: rel.attrib["Target"]
        for rel in rel_root.findall("rel:Relationship", REL_NS)
    }

    targets: list[tuple[str, str]] = []
    for sheet in workbook_root.findall("main:sheets/main:sheet", MAIN_NS):
        name = sheet.attrib["name"]
        relation_id = sheet.attrib["{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id"]
        target = relations[relation_id]
        if not target.startswith("xl/"):
            target = f"xl/{target}"
        targets.append((name, target))
    return targets


def sheet_rows(zip_file: ZipFile, sheet_path: str, shared_strings: list[str]) -> list[list[str]]:
    root = ET.fromstring(zip_file.read(sheet_path))
    rows: list[list[str]] = []
    row_nodes = root.findall("main:sheetData/main:row", MAIN_NS)
    for row in row_nodes:
        values_by_index: dict[int, str] = defaultdict(str)
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
            rows.append([values_by_index[i].strip() for i in range(max_index + 1)])
    return rows


for workbook_path in WORKBOOKS:
    print(f"\n=== WORKBOOK: {workbook_path.name} ===")
    with ZipFile(workbook_path) as zip_file:
        shared_strings = load_shared_strings(zip_file)
        for sheet_name, sheet_path in workbook_sheet_targets(zip_file):
            rows = sheet_rows(zip_file, sheet_path, shared_strings)
            max_columns = max((len(row) for row in rows), default=0)
            print(f"\n--- SHEET: {sheet_name} (rows={len(rows)}, cols={max_columns}) ---")
            for row_index, row in enumerate(rows[:12], start=1):
                print(f"{row_index:02d}: {row}")
