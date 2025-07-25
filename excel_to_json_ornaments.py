import pandas as pd
import json
import os

# Path to your Excel file
excel_file = os.path.join("Spreadsheet", "ornament_data.xlsx")

# Output JSON file
json_file = "converted_data.json"

# Load the Excel file
df = pd.read_excel(excel_file)

# Build the JSON structure
json_structure = [
    {
        "type": "database",
        "name": "greek_ornament"
    },
    {
        "type": "table",
        "name": "ornament",
        "database": "greek_ornament",
        "data": df.to_dict(orient="records")
    }
]

# Save as JSON
with open(json_file, "w", encoding="utf-8") as f:
    json.dump(json_structure, f, indent=2, ensure_ascii=False)

print(f"✅ Conversion successful! File generated: {json_file}")
