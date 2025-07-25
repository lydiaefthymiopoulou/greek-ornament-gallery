import pandas as pd
import json
import os
import numpy as np

# Path to your Excel file
excel_file = os.path.join("Spreadsheet", "ornament_data.xlsx")

# Output JSON file
json_file = "converted_data.json"

# Load the Excel file
df = pd.read_excel(excel_file)

# Replace NaN with None
df = df.replace({np.nan: None})

# Remove all fields with None values from each row
cleaned_records = [{k: v for k, v in row.items() if v is not None} for row in df.to_dict(orient="records")]

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
        "data": cleaned_records
    }
]

# Save as JSON
with open(json_file, "w", encoding="utf-8") as f:
    json.dump(json_structure, f, indent=2, ensure_ascii=False)

print(f"✅ Conversion successful! File generated: {json_file}")