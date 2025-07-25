# 🏺 Greek Pottery Gallery Generator

This project creates a lightweight, searchable, and visually organized gallery website for documenting categorized image-based collections—such as Greek pottery—using only front-end technologies.

It allows you to:
- Prepare your own image dataset
- Add metadata in an Excel file
- Convert Excel to JSON
- Visualize it through a responsive website
- Deploy it for free via GitHub Pages

---

## 🛠 Requirements

Install the following tools before starting:

| Tool               | Purpose                            | Installation Link                                      |
|--------------------|------------------------------------|--------------------------------------------------------|
| Python 3.x         | Run the Excel → JSON converter     | [Python.org](https://www.python.org/)                 |
| VS Code            | Edit HTML, JS, and Python code     | [Visual Studio Code](https://code.visualstudio.com/)  |
| Pandas + Openpyxl  | Python libraries for spreadsheets  | Run `pip install pandas openpyxl`                     |
| Gatech GitHub       | Host files and publish your site  |[Gatech GitHub](https://github.gatech.edu/) |
| GitHub Pages       | Free hosting for your gallery site | Built-in in GitHub (no install needed)                |

---

## 🔁 Workflow Overview

### 1. 📸 Prepare Image Files
- Collect or photograph your objects.
- Name each image with a clear and **unique filename** such as:

```
49\_a.jpg
50\_a.jpg
50\_b.jpg
````
![Homepage View](readme_images/image_name.png)

### 2. 📊 Create Metadata in Excel
- Open Excel or Google Sheets.
- Create a table where each row represents an image.
- The table must include the following fields:

| Column Name         | Description                          |
|---------------------|--------------------------------------|
| `ImageFile_Name`    | Filename of the image                |
| `ItemID`            | Unique object identifier             |
| `Feature_01`…`07`   | Descriptive metadata fields          |

> 📝 Make sure the values in `ImageFile_Name` match exactly your actual image filenames.

![Homepage View](readme_images/excel.png)

### 3. 🔄 Convert Excel to JSON

- Save the Excel file as `Excel_demo.xlsx`.
- Use this Python script (`excel_to_json.py`) to convert your spreadsheet:

```python
import pandas as pd
import json
import os

excel_filename = "Excel_demo.xlsx"
json_filename = "converted_data.json"

if not os.path.exists(excel_filename):
    print(f"❌ Excel file '{excel_filename}' not found.")
else:
    df = pd.read_excel(excel_filename)
    json_structure = [
        {"type": "header", "version": "5.2.1", "comment": "Export to JSON plugin for PHPMyAdmin"},
        {"type": "database", "name": "greek_pottery"},
        {"type": "table", "name": "pottery", "database": "greek_pottery", "data": df.to_dict(orient="records")}
    ]
    with open(json_filename, "w", encoding="utf-8") as f:
        json.dump(json_structure, f, indent=2, ensure_ascii=False)
    print("✅ converted_data.json created successfully!")
````
- Create a folder on your computer and put this Python script (`excel_to_json.py`） together with your Excel spreadsheet such as `Excel_demo.xlsx`.

![Homepage View](readme_images/folder.png)

- Run `pip install pandas openpyxl`in VS Code using the Python terminal:

![Homepage View](readme_images/cmd_vscode_terminal.png)

- Run the `excel_to_json.py` code by clicking the "Running" button of the VS Code interface

![Homepage View](readme_images/vscode.png)
![Homepage View](readme_images/vscode_run.png)

- Then you will be able to see the `converted_data.json` appeared in the folder

---

## 📁 Organize Your Project Folder

- Please create `index.html` and `script.js` and put them in your project folder.
- Right now I have provided the `index.html` and `script.js` in this github project. Please feel free to download/copy the code for your own project.
- Your folder structure should look like this:

```
your-project/
├── index.html
├── script.js
├── converted_data.json
└── images/
    ├── 49_a.jpg
    ├── 50_a.jpg
    ├── 50_b.jpg
    └── ...
```

---

## 🎨 Customize the Frontend

* `index.html` defines layout and page structure
* `script.js` loads JSON data, renders cards, filters, and image sliders

- Modify styles, layout, or filtering logic as needed to match your collection or design goals. If the data structure of your `converted_data` is same with the demo that I made here, there is no need to change anything.
- Slight change can be made with the help of chatGPT

---

## 🚀 Deploy to GitHub Pages

1. Push your folder to a GitHub repository.
2. Go to **Settings → Pages**.
3. Under **Source**, select the `main` branch and `/root`.
4. Click **Save**.

Your site will be live at:

```
https://github.gatech.edu/pages/your-username/your-repo/
```

![Homepage View](readme_images/github_site.png)

---

## 🙋‍♀️ For Students: How to Use This Template

To adapt this project for your own use:

1. Replace the `images/` folder with your own image files.
2. Fill in the template Excel file with your metadata.
3. Use the provided script to generate a new `converted_data.json`.
4. Upload all updated files to your GitHub repository.
5. Your own gallery site will be generated automatically.
6. Please reach out to `yichao.shi@gatech.edu` if you have any questions

```
```


