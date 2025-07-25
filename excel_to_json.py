import pandas as pd
import json
import os

# Set file paths
excel_filename = "Excel_demo.xlsx" #Put the path to your Excel file here
json_filename = "converted_data.json" # Put the desired output JSON file name here

# Check if the Excel file exists
if not os.path.exists(excel_filename):
    print(f"❌ Excel file '{excel_filename}' not found. Please place it in the current directory.")
else:
    # Read the Excel file
    df = pd.read_excel(excel_filename)

    # Convert to target JSON structure
    json_structure = [
        {
            "type": "header",
            "version": "5.2.1",
            "comment": "Export to JSON plugin for PHPMyAdmin"
        },
        {
            "type": "database",
            "name": "greek_pottery"
        },
        {
            "type": "table",
            "name": "pottery",
            "database": "greek_pottery",
            "data": df.to_dict(orient="records")
        }
    ]

    # Write to JSON file
    with open(json_filename, "w", encoding="utf-8") as f:
        json.dump(json_structure, f, indent=2, ensure_ascii=False)

    print(f"✅ Conversion successful! File generated: {json_filename}")
