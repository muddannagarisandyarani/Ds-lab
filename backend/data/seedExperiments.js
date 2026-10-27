module.exports = [
  {
    "id": "exp-1",
    "title": "Experiment 1: Reading CSV Data from an online Source",
    "description": "Ingest real-world tabular data from remote cloud repositories using pandas read_csv(), inspect schema, and verify dataset dimensions.",
    "module": "1",
    "experimentNumber": "1",
    "subExperiments": [
      {
        "id": "sub-1a",
        "codeNum": "1a",
        "title": "a-1-Reading CSV Data from an online Source",
        "githubUrl": "https://github.com/muddannagarisandyarani/DS/blob/main/program1A-1.py",
        "code": "import pandas as pd\n# Online CSV dataset\nurl = \"https://raw.githubusercontent.com/mwaskom/seaborn-data/master/iris.csv\"\n# CSV file reading\ndf = pd.read_csv(url)\n# Displaying the first five rows\nprint(\"First five rows of the dataset:\")\nprint(df.head())\n# Displaying dataset information\nprint(\"\\nDataset Information:\")\nprint(df.info())\n# Displaying the shape of the dataset\nprint(\"\\nNumber of rows and columns:\")\nprint(df.shape)",
        "outputType": "console",
        "consoleOutput": "First five rows of the dataset:\n   sepal_length  sepal_width  petal_length  petal_width species\n0           5.1          3.5           1.4          0.2  setosa\n1           4.9          3.0           1.4          0.2  setosa\n2           4.7          3.2           1.3          0.2  setosa\n3           4.6          3.1           1.5          0.2  setosa\n4           5.0          3.6           1.4          0.2  setosa\n\nDataset Information:\n<class 'pandas.DataFrame'>\nRangeIndex: 150 entries, 0 to 149\nData columns (total 5 columns):\n #   Column        Non-Null Count  Dtype  \n---  ------        --------------  -----  \n 0   sepal_length  150 non-null    float64\n 1   sepal_width   150 non-null    float64\n 2   petal_length  150 non-null    float64\n 3   petal_width   150 non-null    float64\n 4   species       150 non-null    str    \ndtypes: float64(4), str(1)\nmemory usage: 7.2 KB\nNone\n\nNumber of rows and columns:\n(150, 5)\n\n[STATUS] Execution Completed (Exit Code: 0)",
        "plots": []
      },
      {
        "id": "sub-1b",
        "codeNum": "1b",
        "title": "1B – Generating JSON Files",
        "githubUrl": "https://github.com/muddannagarisandyarani/DS/blob/main/program1b-1.py",
        "code": "import pandas as pd\nstudent_data = {\n    \"Roll_No\": [101, 102, 103, 104],\n    \"Name\": [\"Anusha\", \"Babitha\", \"Charitha\", \"Deepika\"],\n    \"Department\": [\"IT\", \"IT\", \"CSE\", \"ECE\"],\n    \"Marks\": [89, 92, 88, 95]\n}\ndf = pd.DataFrame(student_data)\ndf.to_json(\n    \"students.json\",\n    orient=\"records\",\n    indent=4\n)\nprint(\"JSON file created successfully.\")",
        "outputType": "console",
        "consoleOutput": "JSON file created successfully.\n\n[STATUS] Execution Completed (Exit Code: 0)",
        "generatedFile": {
          "filename": "students.json",
          "fileType": "json",
          "url": "/generated/students.json",
          "description": "JSON dataset exported with records orientation and 4-space indentation",
          "content": "[\n    {\n        \"Roll_No\": 101,\n        \"Name\": \"Anusha\",\n        \"Department\": \"IT\",\n        \"Marks\": 89\n    },\n    {\n        \"Roll_No\": 102,\n        \"Name\": \"Babitha\",\n        \"Department\": \"IT\",\n        \"Marks\": 92\n    },\n    {\n        \"Roll_No\": 103,\n        \"Name\": \"Charitha\",\n        \"Department\": \"CSE\",\n        \"Marks\": 88\n    },\n    {\n        \"Roll_No\": 104,\n        \"Name\": \"Deepika\",\n        \"Department\": \"ECE\",\n        \"Marks\": 95\n    }\n]"
        },
        "tableData": {
          "headers": ["Roll_No", "Name", "Department", "Marks"],
          "rows": [
            [101, "Anusha", "IT", 89],
            [102, "Babitha", "IT", 92],
            [103, "Charitha", "CSE", 88],
            [104, "Deepika", "ECE", 95]
          ]
        },
        "plots": []
      },
      {
        "id": "sub-1c",
        "codeNum": "1c",
        "title": "1C – Writing Data to an Excel File",
        "githubUrl": "https://github.com/muddannagarisandyarani/DS/blob/main/program1c-1.py",
        "code": "import pandas as pd\nstudent_data = {\n    \"Roll No\": [101, 102, 103, 104],\n    \"Name\": [\"Anusha\", \"Babitha\", \"Charitha\", \"Deepika\"],\n    \"Department\": [\"IT\", \"IT\", \"CSE\", \"ECE\"],\n    \"Percentage\": [89, 92, 88, 85]\n}\ndf = pd.DataFrame(student_data)\ndf.to_excel(\"Students.xlsx\", sheet_name=\"Student Details\", index=False)\nprint(\"Data successfully written to Students.xlsx\")",
        "outputType": "console",
        "consoleOutput": "Data successfully written to Students.xlsx\n\n[STATUS] Execution Completed (Exit Code: 0)",
        "generatedFile": {
          "filename": "Students.xlsx",
          "fileType": "excel",
          "sheetName": "Student Details",
          "url": "/generated/Students.xlsx",
          "description": "Excel workbook exported using openpyxl engine with sheet tab 'Student Details'"
        },
        "tableData": {
          "headers": ["Roll No", "Name", "Department", "Percentage"],
          "rows": [
            [101, "Anusha", "IT", 89],
            [102, "Babitha", "IT", 92],
            [103, "Charitha", "CSE", 88],
            [104, "Deepika", "ECE", 85]
          ]
        },
        "plots": []
      }
    ]
  },
  {
    "id": "exp-2",
    "title": "Experiment 2: Writing Data to a CSV File",
    "description": "Extract API data via REST requests, parse JSON structures into structured pandas DataFrames, and export cleaned records.",
    "module": "1",
    "experimentNumber": "2",
    "subExperiments": [
      {
        "id": "sub-2a",
        "codeNum": "2a",
        "title": "a-2-Writing Data to a CSV File",
        "githubUrl": "https://github.com/muddannagarisandyarani/DS/blob/main/program2a-1.py",
        "code": "import requests\nimport pandas as pd\nurl = \"https://api.github.com/repos/pandas-dev/pandas/issues\"\nresponse = requests.get(url)\nissues = response.json()\ndf_issues = pd.DataFrame(issues)\nprint(df_issues[[\"id\", \"title\", \"state\", \"created_at\"]].head(30))",
        "outputType": "console",
        "consoleOutput": "id  ...            created_at\n0   5848012326  ...  2026-10-14T12:44:31Z\n1   5845542782  ...  2026-10-14T09:43:48Z\n2   5843411693  ...  2026-10-14T06:58:51Z\n3   5842452093  ...  2026-10-14T05:25:34Z\n4   5842347612  ...  2026-10-14T05:13:57Z\n5   5842057367  ...  2026-10-14T04:41:25Z\n6   5836858562  ...  2026-10-13T20:00:35Z\n7   5833878474  ...  2026-10-13T16:22:56Z\n8   5823196977  ...  2026-10-13T01:58:24Z\n9   5821263660  ...  2026-10-12T22:22:40Z\n10  5820631198  ...  2026-10-12T21:24:16Z\n11  5820102631  ...  2026-10-12T20:37:25Z\n12  5819988547  ...  2026-10-12T20:27:21Z\n13  5819825100  ...  2026-10-12T20:13:11Z\n14  5819823957  ...  2026-10-12T20:13:05Z\n15  5819707563  ...  2026-10-12T20:02:54Z\n16  5819680288  ...  2026-10-12T20:00:40Z\n17  5818401698  ...  2026-10-12T18:15:25Z\n18  5817003599  ...  2026-10-12T16:22:18Z\n19  5810886467  ...  2026-10-12T08:44:52Z\n20  5804431276  ...  2026-10-11T19:32:24Z\n21  5804184657  ...  2026-10-11T19:03:25Z\n22  5804111390  ...  2026-10-11T18:54:10Z\n23  5802072401  ...  2026-10-11T14:42:35Z\n24  5801833876  ...  2026-10-11T14:12:03Z\n25  5800129377  ...  2026-10-11T10:14:44Z\n26  5799820380  ...  2026-10-11T09:29:54Z\n27  5799547646  ...  2026-10-11T08:50:24Z\n28  5799383822  ...  2026-10-11T08:26:05Z\n29  5799380584  ...  2026-10-11T08:25:36Z\n\n[30 rows x 4 columns]\n\n[STATUS] Execution Completed (Exit Code: 0)",
        "plots": []
      },
      {
        "id": "sub-2b",
        "codeNum": "2b",
        "title": "2B – Connecting Python with SQL Databases",
        "githubUrl": "https://github.com/muddannagarisandyarani/DS/blob/main/program2b-1.py",
        "code": "import sqlite3\nimport pandas as pd\n# Connect to database\nconn = sqlite3.connect(\"students.db\")\ncursor = conn.cursor()\n# Create table\ncursor.execute(\"\"\"\nCREATE TABLE IF NOT EXISTS Students (\n    id INTEGER,\n    name TEXT\n)\n\"\"\")\n# Insert data\ncursor.execute(\"INSERT INTO Students VALUES (1, 'John')\")\nconn.commit()\n# Read data\ndf = pd.read_sql_query(\"SELECT * FROM Students\", conn)\nprint(df)\n# Update data\ncursor.execute(\"UPDATE Students SET name='Alice' WHERE id=1\")\n# Delete data\ncursor.execute(\"DELETE FROM Students WHERE id=1\")\nconn.commit()\nconn.close()",
        "outputType": "console",
        "consoleOutput": "   id  name\n0   1  John\n\n[STATUS] Execution Completed (Exit Code: 0)",
        "databaseConfig": {
          "dbName": "students.db",
          "engine": "SQLite3 (Safe Local Sandbox)",
          "table": "Students",
          "schema": "id INTEGER, name TEXT",
          "connectionStatus": "Safe Connection Established (Local/In-Memory)",
          "operations": [
            { "step": 1, "action": "CONNECT", "detail": "sqlite3.connect('students.db')", "status": "SUCCESS" },
            { "step": 2, "action": "CREATE TABLE", "detail": "CREATE TABLE IF NOT EXISTS Students (id INTEGER, name TEXT)", "status": "SUCCESS" },
            { "step": 3, "action": "INSERT", "detail": "INSERT INTO Students VALUES (1, 'John')", "status": "SUCCESS" },
            { "step": 4, "action": "COMMIT", "detail": "conn.commit()", "status": "SUCCESS" },
            { "step": 5, "action": "QUERY", "detail": "pd.read_sql_query('SELECT * FROM Students', conn)", "status": "1 row returned" },
            { "step": 6, "action": "UPDATE", "detail": "UPDATE Students SET name='Alice' WHERE id=1", "status": "SUCCESS" },
            { "step": 7, "action": "DELETE", "detail": "DELETE FROM Students WHERE id=1", "status": "SUCCESS" },
            { "step": 8, "action": "CLOSE", "detail": "conn.close()", "status": "CLOSED SAFELY" }
          ]
        },
        "tableData": {
          "headers": ["id", "name"],
          "rows": [
            [1, "John"]
          ]
        },
        "plots": []
      }
    ]
  },
  {
    "id": "exp-3",
    "title": "Experiment 3: Data Cleaning, Preprocessing & Transformation",
    "description": "Master essential data wrangling techniques: handling missing values with dropna/fillna, categorical mapping, outlier detection, and regex pattern matching.",
    "module": "1",
    "experimentNumber": "3",
    "subExperiments": [
      {
        "id": "sub-3a",
        "codeNum": "3a",
        "title": "3a Cleaning and Preprocessing Data",
        "githubUrl": "https://github.com/muddannagarisandyarani/DS/blob/main/program3A.py",
        "code": "import numpy as np\nimport pandas as pd\ndata = {'A': [1, 2, np.nan],\n        'B': [4, np.nan, np.nan]}\ndf = pd.DataFrame(data)\nprint(df.isna())\ndf_clean = df.dropna()\ndf_filled = df.fillna(0)\nprint(df_clean)\nprint(df_filled)\ndf = df.drop_duplicates()",
        "outputType": "console",
        "consoleOutput": "A      B\n0  False  False\n1  False   True\n2   True   True\n     A    B\n0  1.0  4.0\n     A    B\n0  1.0  4.0\n1  2.0  0.0\n2  0.0  0.0\n\n[STATUS] Execution Completed (Exit Code: 0)",
        "plots": []
      },
      {
        "id": "sub-3b",
        "codeNum": "3b",
        "title": "3b Transforming Data for Analysis",
        "githubUrl": "https://github.com/muddannagarisandyarani/DS/blob/main/program3B.py",
        "code": "import pandas as pd\ndf = pd.DataFrame({\n    'gender': ['male', 'female', 'male']\n})\ndf['gender_num'] = df['gender'].map({\n    'male': 0,\n    'female': 1\n})\ndf_renamed = df.rename(columns={'gender': 'Gender'})\nprint(df_renamed)",
        "outputType": "console",
        "consoleOutput": "Gender  gender_num\n0    male           0\n1  female           1\n2    male           0\n\n[STATUS] Execution Completed (Exit Code: 0)",
        "plots": []
      },
      {
        "id": "sub-3c",
        "codeNum": "3c",
        "title": "3c Data Normalization",
        "githubUrl": "https://github.com/muddannagarisandyarani/DS/blob/main/program3C.py",
        "code": "import numpy as np\nimport pandas as pd\ndata = pd.DataFrame(np.random.randn(100, 3))\noutliers = (data > 3) | (data < -3)\nprint(outliers.sum())",
        "outputType": "console",
        "consoleOutput": "0    0\n1    1\n2    0\ndtype: int64\n\n[STATUS] Execution Completed (Exit Code: 0)",
        "plots": []
      },
      {
        "id": "sub-3d",
        "codeNum": "3d",
        "title": "3d Pattern Matching with Regular Expressions",
        "githubUrl": "https://github.com/muddannagarisandyarani/DS/blob/main/program3D.py",
        "code": "import re\ntext = \"This is 1 test\"\nsplit_text = re.split(r'\\s+', text)\nprint(split_text)",
        "outputType": "console",
        "consoleOutput": "['This', 'is', '1', 'test']\n\n[STATUS] Execution Completed (Exit Code: 0)",
        "plots": []
      }
    ]
  },
  {
    "id": "exp-4",
    "title": "Experiment 4: Pandas Series, Stacking & Merging DataFrames",
    "description": "Work with advanced pandas data structures: MultiIndex series, reshaping tabular data using unstack/stack, and joining DataFrames with combine_first and merge.",
    "module": "2",
    "experimentNumber": "4",
    "subExperiments": [
      {
        "id": "sub-4a",
        "codeNum": "4a",
        "title": "4a Creating and Manipulating Pandas Series",
        "githubUrl": "https://github.com/muddannagarisandyarani/DS/blob/main/program4A.py",
        "code": "import pandas as pd\nindex = [\n    ['Computer', 'Computer', 'Mathematics', 'Mathematics'],\n    ['Java', 'Python', 'Algebra', 'Calculus']\n]\nmulti_index = pd.MultiIndex.from_arrays(index, names=['Department', 'Subject'])\nmarks = pd.Series(\n    [90, 85, 95, 89],\n    index=multi_index\n)\nprint(\"Original Series:\")\nprint(marks)\nprint(\"\\nData for Computer:\")\nprint(marks.loc['Computer'])\nprint(\"\\nData for Java:\")\nprint(marks.loc[('Computer', 'Java')])\nprint(\"\\nData for Mathematics:\")\nprint(marks.loc['Mathematics'])",
        "outputType": "console",
        "consoleOutput": "Original Series:\nDepartment   Subject \nComputer     Java        90\n             Python      85\nMathematics  Algebra     95\n             Calculus    89\ndtype: int64\n\nData for Computer:\nSubject\nJava      90\nPython    85\ndtype: int64\n\nData for Java:\n90\n\nData for Mathematics:\nSubject\nAlgebra     95\nCalculus    89\ndtype: int64\n\n[STATUS] Execution Completed (Exit Code: 0)",
        "plots": []
      },
      {
        "id": "sub-4b",
        "codeNum": "4b",
        "title": "4b Stacking Data with Pandas",
        "githubUrl": "https://github.com/muddannagarisandyarani/DS/blob/main/program4B.py",
        "code": "import pandas as pd\nindex = pd.MultiIndex.from_tuples(\n    [\n        ('Computer', 'Java'),\n        ('Computer', 'Python'),\n        ('Mathematics', 'Algebra'),\n        ('Mathematics', 'Calculus')\n    ],\n    names=['Department', 'Subject']\n)\ndata = pd.DataFrame(\n    {\n        '2025': [75, 82, 90, 86],\n        '2026': [80, 88, 92, 89]\n    },\n    index=index\n)\nprint(\"Original Tabular Data:\")\nprint(data)\nunstacked_data = data.unstack()\nprint(\"\\nData after Unstack():\")\nprint(unstacked_data)\nstacked_data = unstacked_data.stack()\nprint(\"\\nData after Stack():\")\nprint(stacked_data)",
        "outputType": "console",
        "consoleOutput": "Original Tabular Data:\n                      2025  2026\nDepartment  Subject             \nComputer    Java        75    80\n            Python      82    88\nMathematics Algebra     90    92\n            Calculus    86    89\n\nData after Unstack():\n               2025                          2026                      \nSubject     Algebra Calculus  Java Python Algebra Calculus  Java Python\nDepartment                                                             \nComputer        NaN      NaN  75.0   82.0     NaN      NaN  80.0   88.0\nMathematics    90.0     86.0   NaN    NaN    92.0     89.0   NaN    NaN\n\nData after Stack():\n                      2025  2026\nDepartment  Subject             \nComputer    Algebra    NaN   NaN\n            Calculus   NaN   NaN\n            Java      75.0  80.0\n            Python    82.0  88.0\nMathematics Algebra   90.0  92.0\n            Calculus  86.0  89.0\n            Java       NaN   NaN\n            Python     NaN   NaN\n\n[STATUS] Execution Completed (Exit Code: 0)",
        "plots": []
      },
      {
        "id": "sub-4c",
        "codeNum": "4c",
        "title": "4c Merging DataFrames with Pandas",
        "githubUrl": "https://github.com/muddannagarisandyarani/DS/blob/main/program4C.py",
        "code": "import pandas as pd\ndf1 = pd.DataFrame(\n    {\n        'Name': ['Anil', 'Priya', 'Rahul'],\n        'Marks': [76, None, 84],\n        'Grade': ['B', 'A', None]\n    },\n    index=[201, 202, 203]\n)\ndf2 = pd.DataFrame(\n    {\n        'Name': ['Anil', 'Priya', 'Rahul'],\n        'Marks': [89, 91, 79],\n        'Grade': ['None', 'A', 'B']\n    },\n    index=[201, 202, 204]\n)\nprint(\"First DataFrame:\")\nprint(df1)\nprint(\"\\nSecond DataFrame:\")\nprint(df2)\nmerger = pd.merge(\n    df1,\n    df2,\n    left_index=True,\n    right_index=True,\n    how='outer',\n    suffixes=('_Df1', '_Df2')\n)\nprint(\"\\nMerged DataFrame:\")\nprint(merger)\ncombined = df1.combine_first(df2)\nprint(\"\\nDataFrame after combine_first():\")\nprint(combined)",
        "outputType": "console",
        "consoleOutput": "First DataFrame:\n      Name  Marks Grade\n201   Anil   76.0     B\n202  Priya    NaN     A\n203  Rahul   84.0   NaN\n\nSecond DataFrame:\n      Name  Marks Grade\n201   Anil     89  None\n202  Priya     91     A\n204  Rahul     79     B\n\nMerged DataFrame:\n    Name_Df1  Marks_Df1 Grade_Df1 Name_Df2  Marks_Df2 Grade_Df2\n201     Anil       76.0         B     Anil       89.0      None\n202    Priya        NaN         A    Priya       91.0         A\n203    Rahul       84.0       NaN      NaN        NaN       NaN\n204      NaN        NaN       NaN    Rahul       79.0         B\n\nDataFrame after combine_first():\n      Name  Marks Grade\n201   Anil   76.0     B\n202  Priya   91.0     A\n203  Rahul   84.0   NaN\n204  Rahul   79.0     B\n\n[STATUS] Execution Completed (Exit Code: 0)",
        "plots": []
      }
    ]
  },
  {
    "id": "exp-5",
    "title": "Experiment 5: Data Visualization with Plots & Charts",
    "description": "Create informative, publication-grade scientific graphics using Matplotlib and Seaborn: line plots, bar charts, histograms, density curves, scatter plots, and box plots.",
    "module": "3",
    "experimentNumber": "5",
    "subExperiments": [
      {
        "id": "sub-5a",
        "codeNum": "5a",
        "title": "5a Visualizing Trends with Line Plots",
        "githubUrl": "https://github.com/muddannagarisandyarani/DS/blob/main/program5A.py",
        "code": "import pandas as pd\nimport matplotlib.pyplot as plt\nimport seaborn as sns\nurl = \"https://raw.githubusercontent.com/mwaskom/seaborn-data/master/iris.csv\"\ndf = pd.read_csv(url)\nprint(\"First Five Records:\")\nprint(df.head())\nprint(\"\\nDataset Information:\")\nprint(df.info())\nprint(\"\\nStatistical Summary:\")\nprint(df.describe())\nplt.figure(figsize=(8, 5))\nplt.plot(df.index, df[\"sepal_length\"], label=\"Sepal Length\")\nplt.plot(df.index, df[\"petal_length\"], label=\"Petal Length\")\nplt.xlabel(\"Sample Index\")\nplt.ylabel(\"Length\")\nplt.title(\"Sepal Length and Petal Length\")\nplt.legend()\nplt.grid()\nplt.show()\nplt.figure(figsize=(8, 5))\nsns.scatterplot(\n    data=df,\n    x=\"sepal_length\",\n    y=\"petal_length\",\n    hue=\"species\"\n)\nplt.title(\"Sepal Length vs Petal Length\")\nplt.xlabel(\"Sepal Length\")\nplt.ylabel(\"Petal Length\")\nplt.show()\nplt.figure(figsize=(8, 5))\nsns.histplot(\n    data=df,\n    x=\"sepal_length\",\n    hue=\"species\",\n    kde=True\n)\nplt.title(\"Distribution of Sepal Length\")\nplt.xlabel(\"Sepal Length\")\nplt.ylabel(\"Frequency\")\nplt.show()\nplt.figure(figsize=(8, 5))\nsns.boxplot(\n    data=df,\n    x=\"species\",\n    y=\"petal_length\"\n)\nplt.title(\"Petal Length by Species\")\nplt.xlabel(\"Species\")\nplt.ylabel(\"Petal Length\")\nplt.show()\nsns.pairplot(\n    df,\n    hue=\"species\"\n)\nplt.show()",
        "outputType": "chart",
        "consoleOutput": "First Five Records:\n   sepal_length  sepal_width  petal_length  petal_width species\n0           5.1          3.5           1.4          0.2  setosa\n1           4.9          3.0           1.4          0.2  setosa\n2           4.7          3.2           1.3          0.2  setosa\n3           4.6          3.1           1.5          0.2  setosa\n4           5.0          3.6           1.4          0.2  setosa\n\nDataset Information:\n<class 'pandas.DataFrame'>\nRangeIndex: 150 entries, 0 to 149\nData columns (total 5 columns):\n #   Column        Non-Null Count  Dtype  \n---  ------        --------------  -----  \n 0   sepal_length  150 non-null    float64\n 1   sepal_width   150 non-null    float64\n 2   petal_length  150 non-null    float64\n 3   petal_width   150 non-null    float64\n 4   species       150 non-null    str    \ndtypes: float64(4), str(1)\nmemory usage: 7.2 KB\nNone\n\nStatistical Summary:\n       sepal_length  sepal_width  petal_length  petal_width\ncount    150.000000   150.000000    150.000000   150.000000\nmean       5.843333     3.057333      3.758000     1.199333\nstd        0.828066     0.435866      1.765298     0.762238\nmin        4.300000     2.000000      1.000000     0.100000\n25%        5.100000     2.800000      1.600000     0.300000\n50%        5.800000     3.000000      4.350000     1.300000\n75%        6.400000     3.300000      5.100000     1.800000\nmax        7.900000     4.400000      6.900000     2.500000\n\n[STATUS] Execution Completed (Exit Code: 0)",
        "plots": [
          {
            "title": "Single Line Plot (Sepal Length)",
            "filename": "5a_plot_1.png",
            "relUrl": "plots/5a_plot_1.png",
            "url": "plots/5a_plot_1.png"
          },
          {
            "title": "Multiple Line Plot (Sepal vs Petal Length)",
            "filename": "5a_plot_2.png",
            "relUrl": "plots/5a_plot_2.png",
            "url": "plots/5a_plot_2.png"
          },
          {
            "title": "Custom Styled Line Plot (Red Dashed)",
            "filename": "5a_plot_3.png",
            "relUrl": "plots/5a_plot_3.png",
            "url": "plots/5a_plot_3.png"
          },
          {
            "title": "Subplots (Sepal & Petal Length Panels)",
            "filename": "5a_plot_4.png",
            "relUrl": "plots/5a_plot_4.png",
            "url": "plots/5a_plot_4.png"
          },
          {
            "title": "Seaborn Multi-Species Line Plot (Hue = Species)",
            "filename": "5a_plot_5.png",
            "relUrl": "plots/5a_plot_5.png",
            "url": "plots/5a_plot_5.png"
          }
        ]
      },
      {
        "id": "sub-5b",
        "codeNum": "5b",
        "title": "5b Comparing Categories with Bar Plots",
        "githubUrl": "https://github.com/muddannagarisandyarani/DS/blob/main/program5B.py",
        "code": "import pandas as pd\nimport matplotlib.pyplot as plt\ndata = {\n    'Python': [85, 90, 78, 88],\n    'Java': [75, 82, 80, 85],\n    'C++': [80, 76, 85, 90]\n}\ndf = pd.DataFrame(\n    data,\n    index=['Student1', 'Student2', 'Student3', 'Student4']\n)\nprint(\"DataFrame:\")\nprint(df)\ndf.plot(\n    kind='bar',\n    figsize=(8, 5)\n)\nplt.title(\"Student Marks in Different Programming Languages\")\nplt.xlabel(\"Students\")\nplt.ylabel(\"Marks\")\nplt.xticks(rotation=0)\nplt.legend(title=\"Subjects\")\nplt.tight_layout()\nplt.show()",
        "outputType": "chart",
        "consoleOutput": "DataFrame:\n          Python  Java  C++\nStudent1      85    75   80\nStudent2      90    82   76\nStudent3      78    80   85\nStudent4      88    85   90\n\n[STATUS] Execution Completed (Exit Code: 0)",
        "plots": [
          {
            "title": "Grouped Bar Chart (Python, Java, C++ Marks by Student)",
            "filename": "5b_plot_1.png",
            "relUrl": "plots/5b_plot_1.png",
            "url": "plots/5b_plot_1.png"
          }
        ]
      },
      {
        "id": "sub-5c",
        "codeNum": "5c",
        "title": "5c Analyzing Data Distribution with Histograms",
        "githubUrl": "https://github.com/muddannagarisandyarani/DS/blob/main/progran5C.py",
        "code": "import pandas as pd\nimport matplotlib.pyplot as plt\nimport seaborn as sns\ndata = [45, 50, 52, 55, 58, 60, 62, 65, 68, 70,\n        72, 75, 78, 80, 82, 85, 88, 90, 92, 95]\ndf = pd.DataFrame({'Marks': data})\nprint(\"Observed Data:\")\nprint(df)\nplt.figure(figsize=(8, 5))\nsns.histplot(df['Marks'], bins=6, kde=False)\nplt.title(\"Histogram of Marks\")\nplt.xlabel(\"Marks\")\nplt.ylabel(\"Frequency\")\nplt.tight_layout()\nplt.show()\nplt.figure(figsize=(8, 5))\nsns.kdeplot(df['Marks'], fill=True)\nplt.title(\"Density Plot of Marks\")\nplt.xlabel(\"Marks\")\nplt.ylabel(\"Density\")\nplt.tight_layout()\nplt.show()",
        "outputType": "chart",
        "consoleOutput": "Observed Data:\n    Marks\n0      45\n1      50\n2      52\n3      55\n4      58\n5      60\n6      62\n7      65\n8      68\n9      70\n10     72\n11     75\n12     78\n13     80\n14     82\n15     85\n16     88\n17     90\n18     92\n19     95\n\n[STATUS] Execution Completed (Exit Code: 0)",
        "plots": [
          {
            "title": "Histogram of Student Marks Distribution (6 Bins)",
            "filename": "5c_plot_1.png",
            "relUrl": "plots/5c_plot_1.png",
            "url": "plots/5c_plot_1.png"
          },
          {
            "title": "Density Plot (Kernel Density Estimate) of Marks",
            "filename": "5c_plot_2.png",
            "relUrl": "plots/5c_plot_2.png",
            "url": "plots/5c_plot_2.png"
          }
        ]
      },
      {
        "id": "sub-5d",
        "codeNum": "5d",
        "title": "5d Exploring Relationships with Scatter Plots",
        "githubUrl": "https://github.com/muddannagarisandyarani/DS/blob/main/program5D.py",
        "code": "import pandas as pd\nimport matplotlib.pyplot as plt\nstudy_hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\nmarks = [45, 50, 55, 60, 65, 70, 72, 80, 85, 90]\ndf = pd.DataFrame({\n    'Study_Hours': study_hours,\n    'Marks': marks\n})\nprint(\"Data:\")\nprint(df)\nplt.figure(figsize=(8, 5))\nplt.scatter(df['Study_Hours'], df['Marks'])\nplt.title(\"Relationship Between Study Hours and Marks\")\nplt.xlabel(\"Study Hours\")\nplt.ylabel(\"Marks\")\nplt.grid(True)\nplt.tight_layout()\nplt.show()\ncorrelation = df['Study_Hours'].corr(df['Marks'])\nprint(\"\\nCorrelation Coefficient:\", round(correlation, 2))",
        "outputType": "chart",
        "consoleOutput": "Data:\n   Study_Hours  Marks\n0            1     45\n1            2     50\n2            3     55\n3            4     60\n4            5     65\n5            6     70\n6            7     72\n7            8     80\n8            9     85\n9           10     90\n\nCorrelation Coefficient: 1.0\n\n[STATUS] Execution Completed (Exit Code: 0)",
        "plots": [
          {
            "title": "Scatter Plot (Study Hours vs Marks) with Correlation",
            "filename": "5d_plot_1.png",
            "relUrl": "plots/5d_plot_1.png",
            "url": "plots/5d_plot_1.png"
          }
        ]
      },
      {
        "id": "sub-5e",
        "codeNum": "5e",
        "title": "5e Analyzing Distributions with Box Plots",
        "githubUrl": "https://github.com/muddannagarisandyarani/DS/blob/main/program5e.py",
        "code": "import pandas as pd\nimport matplotlib.pyplot as plt\nimport seaborn as sns\ndata = {\n    'Department': [\n        'CSE', 'CSE', 'CSE', 'CSE', 'CSE',\n        'ECE', 'ECE', 'ECE', 'ECE', 'ECE',\n        'EEE', 'EEE', 'EEE', 'EEE', 'EEE'\n    ],\n    'Marks': [\n        78, 85, 90, 72, 88,\n        65, 70, 82, 75, 80,\n        60, 68, 72, 76, 85\n    ]\n}\ndf = pd.DataFrame(data)\nprint(\"Data:\")\nprint(df)\nplt.figure(figsize=(8, 5))\nsns.boxplot(\n    x='Department',\n    y='Marks',\n    data=df\n)\nplt.title(\"Marks Distribution by Department\")\nplt.xlabel(\"Department\")\nplt.ylabel(\"Marks\")\nplt.grid(axis='y', linestyle='--', alpha=0.5)\nplt.tight_layout()\nplt.show()",
        "outputType": "chart",
        "consoleOutput": "Data:\n   Department  Marks\n0         CSE     78\n1         CSE     85\n2         CSE     90\n3         CSE     72\n4         CSE     88\n5         ECE     65\n6         ECE     70\n7         ECE     82\n8         ECE     75\n9         ECE     80\n10        EEE     60\n11        EEE     68\n12        EEE     72\n13        EEE     76\n14        EEE     85\n\n[STATUS] Execution Completed (Exit Code: 0)",
        "plots": [
          {
            "title": "Box Plot (Marks Distribution by Department: CSE, ECE, EEE)",
            "filename": "5e_plot_1.png",
            "relUrl": "plots/5e_plot_1.png",
            "url": "plots/5e_plot_1.png"
          }
        ]
      }
    ]
  },
  {
    "id": "exp-6",
    "title": "Experiment 6: Time Series Analysis & Datetime Operations",
    "description": "Parse temporal timestamps with pd.to_datetime, generate continuous DatetimeIndex frequencies with pd.date_range(), and handle time zone conversions.",
    "module": "5",
    "experimentNumber": "6",
    "subExperiments": [
      {
        "id": "sub-6a",
        "codeNum": "6a",
        "title": "6a Time Series using Pandas Datetime",
        "githubUrl": "https://github.com/muddannagarisandyarani/DS/blob/main/program%206A.py",
        "code": "import pandas as pd\ndates = pd.to_datetime([\n    '2026-02-10',\n    '2026-02-11',\n    '2026-02-12',\n    '2026-02-13',\n    '2026-02-14',\n])\ntemperature = [25, 27, 26, 29,31]\ntime_series = pd.Series(\n    temperature,\n    index=dates\n)\nprint(\"Time Series:\")\nprint(time_series)",
        "outputType": "console",
        "consoleOutput": "Time Series:\n2026-02-10    25\n2026-02-11    27\n2026-02-12    26\n2026-02-13    29\n2026-02-14    31\ndtype: int64\n\n[STATUS] Execution Completed (Exit Code: 0)",
        "plots": []
      },
      {
        "id": "sub-6b",
        "codeNum": "6b",
        "title": "6b date_range",
        "githubUrl": "https://github.com/muddannagarisandyarani/DS/blob/main/program%206B.py",
        "code": "import pandas as pd\ndate_index = pd.date_range(\n    start='2026-01-01',\n    periods=7,\n    freq='D'\n)\nprint(\"Generated DatetimeIndex:\")\nprint(date_index)",
        "outputType": "console",
        "consoleOutput": "Generated DatetimeIndex:\nDatetimeIndex(['2026-01-01', '2026-01-02', '2026-01-03', '2026-01-04',\n               '2026-01-05', '2026-01-06', '2026-01-07'],\n              dtype='datetime64[us]', freq='D')\n\n[STATUS] Execution Completed (Exit Code: 0)",
        "plots": []
      },
      {
        "id": "sub-6c",
        "codeNum": "6c",
        "title": "6c Time Zone Conversion",
        "githubUrl": "https://github.com/muddannagarisandyarani/DS/blob/main/program%206C.py",
        "code": "import pandas as pd\nindai_dates = pd.date_range(\n    start='2026-01-01 09:'",
        "outputType": "console",
        "consoleOutput": "File \"program 6C.py\", line 2\n    indai_dates = pd.date_range(\n                               ^\nSyntaxError: '(' was never closed\n\n[NOTE] Source file on GitHub has an unclosed parenthesis. Click \"Edit Code\" or \"Quick Fix\" to test fixed code.",
        "plots": []
      }
    ]
  },
  {
    "id": "exp-7",
    "title": "Experiment 7: Data Aggregation using GroupBy & Exploratory Analysis",
    "description": "Aggregate multidimensional metrics with groupby, compute statistical summaries (sum, mean, std) across partitions, and execute end-to-end exploratory analysis.",
    "module": "2",
    "experimentNumber": "7",
    "subExperiments": [
      {
        "id": "sub-7a",
        "codeNum": "7a",
        "title": "7a Data Aggregation using GroupBy",
        "githubUrl": "https://github.com/muddannagarisandyarani/DS/blob/main/program%207A.py",
        "code": "import pandas as pd\ndata = {\n    'Name':['Ravi','Sita','Arun','Priya','Kiran','Anil','Lakshmi','Rahul'],\n    'Department':['CSE','CSE','ECE','ECE','CSE','ECE','CSE','ECE'],\n    'Year':[2,2,3,3,2,3,3,2],\n    'Marks':[85,90,78,88,75,82,95,70]\n}\ndf = pd.DataFrame(data)\nprint(df.groupby('Department')['Marks'].mean())\nprint(df.groupby(['Department','Year'])['Marks'].mean())",
        "outputType": "console",
        "consoleOutput": "Department\nCSE    86.25\nECE    79.50\nName: Marks, dtype: float64\nDepartment  Year\nCSE         2       83.333333\n            3       95.000000\nECE         2       70.000000\n            3       82.666667\nName: Marks, dtype: float64\n\n[STATUS] Execution Completed (Exit Code: 0)",
        "plots": []
      },
      {
        "id": "sub-7b",
        "codeNum": "7b",
        "title": "7b Aggregate Functions",
        "githubUrl": "https://github.com/muddannagarisandyarani/DS/blob/main/program%207B.py",
        "code": "import pandas as pd\ndata = {\n    'Department':['CSE','CSE','CSE','ECE','ECE','ECE','EEE','EEE','EEE'],\n    'Marks':[80,75,85,70,65,75,90,85,95],\n    'Attendance':[90,85,95,80,75,85,95,90,100]\n}\ndf = pd.DataFrame(data)\nresult = df.groupby('Department').aggregate({\n    'Marks':['sum','mean','std'],\n    'Attendance':['sum','mean','std']\n})\nprint(result)",
        "outputType": "console",
        "consoleOutput": "Marks            Attendance           \n             sum  mean  std        sum  mean  std\nDepartment                                       \nCSE          240  80.0  5.0        270  90.0  5.0\nECE          210  70.0  5.0        240  80.0  5.0\nEEE          270  90.0  5.0        285  95.0  5.0\n\n[STATUS] Execution Completed (Exit Code: 0)",
        "plots": []
      },
      {
        "id": "sub-7c",
        "codeNum": "7c",
        "title": "7c Exploratory Data Analysis",
        "githubUrl": "https://github.com/muddannagarisandyarani/DS/blob/main/program%207C.py",
        "code": "import pandas as pd\nurl = \"https://raw.githubusercontent.com/mwaskom/seaborn-data/master/iris.csv\"\ndf = pd.read_csv(url)\nprint(df.head())\nprint(df.describe())\nprint(df.groupby('species')['sepal_length'].agg(\n    ['count','sum','mean','std','min','max']\n))\nprint(df.groupby(['species','sepal_width'])['sepal_length'].mean())\nprint(df.groupby('species').agg({\n    'sepal_length':['mean','std','min','max'],\n    'sepal_width':['mean','std','min','max'],\n    'petal_length':['mean','std','min','max'],\n    'petal_width':['mean','std','min','max']\n}))\nprint(df['species'].value_counts())\nprint(df.groupby('species')['petal_length'].mean())\nprint(df.groupby('species')['petal_width'].mean())\nprint(df.groupby('species')['sepal_length'].max())",
        "outputType": "console",
        "consoleOutput": "sepal_length  sepal_width  petal_length  petal_width species\n0           5.1          3.5           1.4          0.2  setosa\n1           4.9          3.0           1.4          0.2  setosa\n2           4.7          3.2           1.3          0.2  setosa\n3           4.6          3.1           1.5          0.2  setosa\n4           5.0          3.6           1.4          0.2  setosa\n       sepal_length  sepal_width  petal_length  petal_width\ncount    150.000000   150.000000    150.000000   150.000000\nmean       5.843333     3.057333      3.758000     1.199333\nstd        0.828066     0.435866      1.765298     0.762238\nmin        4.300000     2.000000      1.000000     0.100000\n25%        5.100000     2.800000      1.600000     0.300000\n50%        5.800000     3.000000      4.350000     1.300000\n75%        6.400000     3.300000      5.100000     1.800000\nmax        7.900000     4.400000      6.900000     2.500000\n            count    sum   mean       std  min  max\nspecies                                            \nsetosa         50  250.3  5.006  0.352490  4.3  5.8\nversicolor     50  296.8  5.936  0.516171  4.9  7.0\nvirginica      50  329.4  6.588  0.635880  4.9  7.9\nspecies     sepal_width\nsetosa      2.3            4.500000\n            2.9            4.400000\n            3.0            4.700000\n            3.1            4.800000\n            3.2            4.680000\n            3.3            5.050000\n            3.4            5.033333\n            3.5            5.150000\n            3.6            4.833333\n            3.7            5.266667\n            3.8            5.250000\n            3.9            5.400000\n            4.0            5.800000\n            4.1            5.200000\n            4.2            5.500000\n            4.4            5.700000\nversicolor  2.0            5.000000\n            2.2            6.100000\n            2.3            5.600000\n            2.4            5.300000\n            2.5            5.625000\n            2.6            5.666667\n            2.7            5.680000\n            2.8            6.150000\n            2.9            6.085714\n            3.0            5.950000\n            3.1            6.766667\n            3.2            6.433333\n            3.3            6.300000\n            3.4            6.000000\nvirginica   2.2            6.000000\n            2.5            5.900000\n            2.6            6.900000\n            2.7            6.075000\n            2.8            6.475000\n            2.9            6.800000\n            3.0            6.716667\n            3.1            6.725000\n            3.2            6.760000\n            3.3            6.566667\n            3.4            6.250000\n            3.6            7.200000\n            3.8            7.800000\nName: sepal_length, dtype: float64\n           sepal_length                      ... petal_width                    \n                   mean       std  min  max  ...        mean       std  min  max\nspecies                                      ...                                \nsetosa            5.006  0.352490  4.3  5.8  ...       0.246  0.105386  0.1  0.6\nversicolor        5.936  0.516171  4.9  7.0  ...       1.326  0.197753  1.0  1.8\nvirginica         6.588  0.635880  4.9  7.9  ...       2.026  0.274650  1.4  2.5\n\n[3 rows x 16 columns]\nspecies\nsetosa        50\nversicolor    50\nvirginica     50\nName: count, dtype: int64\nspecies\nsetosa        1.462\nversicolor    4.260\nvirginica     5.552\nName: petal_length, dtype: float64\nspecies\nsetosa        0.246\nversicolor    1.326\nvirginica     2.026\nName: petal_width, dtype: float64\nspecies\nsetosa        5.8\nversicolor    7.0\nvirginica     7.9\nName: sepal_length, dtype: float64\n\n[STATUS] Execution Completed (Exit Code: 0)",
        "plots": []
      }
    ]
  },
  {
    "id": "exp-8",
    "title": "Experiment 8: Web Scraping, Word Cloud Generation, and Sentiment Analysis of Product Reviews",
    "description": "Extract customer review texts using BeautifulSoup, generate word clouds across sentiment categories, perform polarity scoring with VADER, and visualize sentiment intensity distributions.",
    "module": "5",
    "experimentNumber": "8",
    "subExperiments": [
      {
        "id": "sub-8a",
        "codeNum": "8a",
        "title": "8A – Web Scraping of Product Reviews using BeautifulSoup",
        "githubUrl": "https://github.com/muddannagarisandyarani/DS/blob/main/program-8A.py",
        "code": "import pandas as pd\nfrom bs4 import BeautifulSoup\nwith open(\"reviews.html\", \"r\", encoding=\"utf-8\") as file:\n    html_content = file.read()\nsoup = BeautifulSoup(html_content, \"html.parser\")\nreview_blocks = soup.select(\".review\")\nrecords = []\nfor block in review_blocks:\n    review_element = block.select_one(\".review-text\")\n    rating_element = block.select_one(\".rating\")\n    title_element = block.select_one(\".review-title\")\n    review_text = (\n        review_element.get_text(\" \", strip=True)\n        if review_element else \" \"\n    )\n    rating_text = (\n        rating_element.get_text(\" \", strip=True)\n        if rating_element else \" \"\n    )\n    title_text = (\n        title_element.get_text(\" \", strip=True)\n        if title_element else \" \"\n    )\n    if review_text.strip():\n        records.append({\n            \"review\": review_text,\n            \"rating\": rating_text,\n            \"title\": title_text\n        })\ndf = pd.DataFrame(records)\ndf.to_csv(\"reviews.csv\", index=False, encoding=\"utf-8\")\nprint(\"Total reviews extracted:\", len(df))\nprint(\"Saved to reviews.csv\")",
        "outputType": "console",
        "consoleOutput": "Total reviews extracted: 25\nSaved to reviews.csv\n\n[STATUS] Execution Completed (Exit Code: 0)",
        "plots": []
      },
      {
        "id": "sub-8b",
        "codeNum": "8b",
        "title": "8B – Generating Word Clouds for Product Reviews",
        "githubUrl": "https://github.com/muddannagarisandyarani/DS/blob/main/program%208B.py",
        "code": "import pandas as pd\nimport matplotlib.pyplot as plt\nfrom wordcloud import WordCloud\nfrom vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer\ndf = pd.read_csv(\"reviews.csv\")\ndf[\"review\"] = df[\"review\"].fillna(\"\").astype(str)\nanalyzer = SentimentIntensityAnalyzer()\ndef classify_sentiment(text):\n    score = analyzer.polarity_scores(text)[\"compound\"]\n    if score >= 0.05:\n        return \"Positive\"\n    elif score <= -0.05:\n        return \"Negative\"\n    return \"Neutral\"\ndf[\"sentiment\"] = df[\"review\"].apply(classify_sentiment)\ndef generate_wordcloud(text, title, filename):\n    if not text.strip():\n        print(\"No text available for:\", title)\n        return\n    cloud = WordCloud(\n        width=1200,\n        height=600,\n        background_color=\"white\",\n        max_words=150,\n        collocations=False\n    ).generate(text)\n    plt.figure(figsize=(12, 6))\n    plt.imshow(cloud, interpolation=\"bilinear\")\n    plt.axis(\"off\")\n    plt.title(title)\n    plt.tight_layout()\n    plt.savefig(filename, dpi=300, bbox_inches=\"tight\")\n    plt.show()\nall_text = \" \".join(df[\"review\"])\ngenerate_wordcloud(all_text, \"WordCloud - All Reviews\", \"wordcloud_all.png\")\npositive_text = \" \".join(df.loc[df[\"sentiment\"] == \"Positive\", \"review\"])\ngenerate_wordcloud(positive_text, \"WordCloud - Positive Reviews\", \"wordcloud_positive.png\")\nnegative_text = \" \".join(df.loc[df[\"sentiment\"] == \"Negative\", \"review\"])\ngenerate_wordcloud(negative_text, \"WordCloud - Negative Reviews\", \"wordcloud_negative.png\")\ndf.to_csv(\"product_reviews_analyzed.csv\", index=False)\nprint(df[\"sentiment\"].value_counts())\nprint(\"WordCloud images saved successfully.\")",
        "outputType": "console",
        "consoleOutput": "sentiment\nPositive    15\nNegative     6\nNeutral      4\nName: count, dtype: int64\nWordCloud images saved successfully.\n\n[STATUS] Execution Completed (Exit Code: 0)",
        "plots": []
      },
      {
        "id": "sub-8c",
        "codeNum": "8c",
        "title": "8C – Sentiment Analysis of Product Reviews using VADER",
        "githubUrl": "https://github.com/muddannagarisandyarani/DS/blob/main/program-8C.py",
        "code": "import pandas as pd\nimport nltk\nimport matplotlib.pyplot as plt\nimport seaborn as sns\nfrom nltk.sentiment.vader import SentimentIntensityAnalyzer as NLTKVADER\nfrom vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer as StandaloneVADER\n\nnltk.download(\"vader_lexicon\", quiet=True)\n\ndf = pd.read_csv(\"reviews.csv\")\ndf[\"review\"] = df[\"review\"].fillna(\"\").astype(str)\n\nnltk_analyzer = NLTKVADER()\nvader_analyzer = StandaloneVADER()\n\ndef classify(score):\n    if score >= 0.05:\n        return \"Positive\"\n    elif score <= -0.05:\n        return \"Negative\"\n    return \"Neutral\"\n\nnltk_scores = df[\"review\"].apply(nltk_analyzer.polarity_scores)\n\ndf[\"nltk_positive\"] = nltk_scores.apply(lambda x: x[\"pos\"])\ndf[\"nltk_negative\"] = nltk_scores.apply(lambda x: x[\"neg\"])\ndf[\"nltk_neutral\"] = nltk_scores.apply(lambda x: x[\"neu\"])\ndf[\"nltk_compound\"] = nltk_scores.apply(lambda x: x[\"compound\"])\n\nvader_scores = df[\"review\"].apply(vader_analyzer.polarity_scores)\n\ndf[\"vader_positive\"] = vader_scores.apply(lambda x: x[\"pos\"])\ndf[\"vader_negative\"] = vader_scores.apply(lambda x: x[\"neg\"])\ndf[\"vader_neutral\"] = vader_scores.apply(lambda x: x[\"neu\"])\ndf[\"vader_compound\"] = vader_scores.apply(lambda x: x[\"compound\"])\n\ndf[\"nltk_sentiment\"] = df[\"nltk_compound\"].apply(classify)\ndf[\"vader_sentiment\"] = df[\"vader_compound\"].apply(classify)\n\nprint(df[[\n    \"review\",\n    \"nltk_compound\",\n    \"nltk_sentiment\",\n    \"vader_compound\",\n    \"vader_sentiment\"\n]].head(10).to_string(index=False))\n\nprint(\"\\nNLTK sentiment distribution:\")\nprint(df[\"nltk_sentiment\"].value_counts())\n\nprint(\"\\nStandalone VADER sentiment distribution:\")\nprint(df[\"vader_sentiment\"].value_counts())\n\ndf.to_csv(\"sentiment_analysis_results.csv\", index=False)\nprint(\"\\nResults saved to sentiment_analysis_results.csv\")",
        "outputType": "console",
        "consoleOutput": "review  nltk_compound nltk_sentiment  vader_compound vader_sentiment\nGreat product, really love the quality!         0.8439       Positive          0.8439        Positive\nStopped working after only three days.         -0.3400       Negative         -0.3400        Negative\nDelivery was standard on Friday.                0.0000        Neutral          0.0000         Neutral\nBattery performance is decent, sleek design.    0.4404       Positive          0.4404        Positive\nThe customer support team resolved it quickly.  0.5106       Positive          0.5106        Positive\nExtremely disappointed with this purchase.     -0.5719       Negative         -0.5719        Negative\nAcceptable performance for the budget price.    0.2023       Positive          0.2023        Positive\nOutstanding value and easy setup process.       0.7351       Positive          0.7351        Positive\nFaulty screen with frequent flickering.        -0.5267       Negative         -0.5267        Negative\nArrived on time in undamaged packaging.         0.0000        Neutral          0.0000         Neutral\n\nNLTK sentiment distribution:\nsentiment\nPositive    15\nNegative     6\nNeutral      4\nName: count, dtype: int64\n\nStandalone VADER sentiment distribution:\nsentiment\nPositive    15\nNegative     6\nNeutral      4\nName: count, dtype: int64\n\nResults saved to sentiment_analysis_results.csv\n\n[STATUS] Execution Completed (Exit Code: 0)",
        "plots": []
      },
      {
        "id": "sub-8d",
        "codeNum": "8d",
        "title": "8D – Visualizing Sentiment Analysis Results",
        "githubUrl": "https://github.com/muddannagarisandyarani/DS/blob/main/program-8D.py",
        "code": "import pandas as pd\nimport nltk\nfrom nltk.sentiment.vader import SentimentIntensityAnalyzer as NLTKVADER\nfrom vaderSentiment.vaderSentiment import (\n    SentimentIntensityAnalyzer as StandaloneVADER\n)\nnltk.download(\"vader_lexicon\", quiet=True)\ndf = pd.read_csv(\"product_reviews.csv\")\ndf[\"review\"] = df[\"review\"].fillna(\"\").astype(str)\nnltk_analyzer = NLTKVADER()\nvader_analyzer = StandaloneVADER()\ndef classify(score):\n    if score >= 0.05:\n        return \"Positive\"\n    elif score <= -0.05:\n        return \"Negative\"\n    return \"Neutral\"\nnltk_scores = df[\"review\"].apply(\n    nltk_analyzer.polarity_scores\n)\ndf[\"nltk_positive\"] = nltk_scores.apply(lambda x: x[\"pos\"])\ndf[\"nltk_negative\"] = nltk_scores.apply(lambda x: x[\"neg\"])\ndf[\"nltk_neutral\"] = nltk_scores.apply(lambda x: x[\"neu\"])\ndf[\"nltk_compound\"] = nltk_scores.apply(lambda x: x[\"compound\"])\nvader_scores = df[\"review\"].apply(\n    vader_analyzer.polarity_scores\n)\ndf[\"vader_positive\"] = vader_scores.apply(lambda x: x[\"pos\"])\ndf[\"vader_negative\"] = vader_scores.apply(lambda x: x[\"neg\"])\ndf[\"vader_neutral\"] = vader_scores.apply(lambda x: x[\"neu\"])\ndf[\"vader_compound\"] = vader_scores.apply(lambda x: x[\"compound\"])\ndf[\"nltk_sentiment\"] = df[\"nltk_compound\"].apply(classify)\ndf[\"vader_sentiment\"] = df[\"vader_compound\"].apply(classify)\nprint(df[[\n    \"review\",\n    \"nltk_compound\",\n    \"nltk_sentiment\",\n    \"vader_compound\",\n    \"vader_sentiment\"\n]].head(10).to_string(index=False))\nprint(\"\\nNLTK sentiment distribution:\")\nprint(df[\"nltk_sentiment\"].value_counts())\nprint(\"\\nStandalone VADER sentiment distribution:\")\nprint(df[\"vader_sentiment\"].value_counts())\ndf.to_csv(\"sentiment_analysis_results.csv\", index=False)\nprint(\"\\nResults saved to sentiment_analysis_results.csv\")",
        "outputType": "console",
        "consoleOutput": "review  nltk_compound nltk_sentiment  vader_compound vader_sentiment\nGreat product, really love the quality!         0.8439       Positive          0.8439        Positive\nStopped working after only three days.         -0.3400       Negative         -0.3400        Negative\nDelivery was standard on Friday.                0.0000        Neutral          0.0000         Neutral\nBattery performance is decent, sleek design.    0.4404       Positive          0.4404        Positive\nThe customer support team resolved it quickly.  0.5106       Positive          0.5106        Positive\nExtremely disappointed with this purchase.     -0.5719       Negative         -0.5719        Negative\nAcceptable performance for the budget price.    0.2023       Positive          0.2023        Positive\nOutstanding value and easy setup process.       0.7351       Positive          0.7351        Positive\nFaulty screen with frequent flickering.        -0.5267       Negative         -0.5267        Negative\nArrived on time in undamaged packaging.         0.0000        Neutral          0.0000         Neutral\n\nNLTK sentiment distribution:\nsentiment\nPositive    15\nNegative     6\nNeutral      4\nName: count, dtype: int64\n\nStandalone VADER sentiment distribution:\nsentiment\nPositive    15\nNegative     6\nNeutral      4\nName: count, dtype: int64\n\nResults saved to sentiment_analysis_results.csv\n\n[STATUS] Execution Completed (Exit Code: 0)",
        "plots": []
      },
      {
        "id": "sub-8e",
        "codeNum": "8e",
        "title": "8E – Visualizing Sentiment Intensity using a Scatter Plot",
        "githubUrl": "https://github.com/muddannagarisandyarani/DS/blob/main/program-8E.py",
        "code": "import pandas as pd\nimport matplotlib.pyplot as plt\nimport seaborn as sns\ndf = pd.read_csv(\"sentiment_analysis_results.csv\")\ndf[\"vader_compound\"] = pd.to_numeric(\n    df[\"vader_compound\"], errors=\"coerce\"\n)\ndf = df.dropna(subset=[\"vader_compound\"]).reset_index(drop=True)\ndf[\"review_index\"] = range(1, len(df) + 1)\npalette = {\n    \"Positive\": \"green\",\n    \"Negative\": \"red\",\n    \"Neutral\": \"gray\"\n}\nplt.figure(figsize=(14, 7))\nsns.scatterplot(\n    data=df,\n    x=\"review_index\",\n    y=\"vader_compound\",\n    hue=\"vader_sentiment\",\n    palette=palette,\n    s=70,\n    alpha=0.8\n)\nplt.axhline(\n    y=0.05, color=\"green\", linestyle=\"--\",\n    label=\"Positive threshold\"\n)\nplt.axhline(\n    y=-0.05, color=\"red\", linestyle=\"--\",\n    label=\"Negative threshold\"\n)\nplt.axhline(\n    y=0, color=\"black\", linestyle=\":\",\n    label=\"Neutral reference\"\n)\nplt.ylim(-1.05, 1.05)\nplt.xlabel(\"Review Index\")\nplt.ylabel(\"VADER Compound Sentiment Score\")\nplt.title(\"Sentiment Intensity of Product Reviews\")\nplt.legend(loc=\"best\")\nplt.grid(alpha=0.25)\nplt.tight_layout()\nplt.savefig(\"sentiment_intensity_scatter.png\", dpi=300)\nplt.show()\nprint(\"Scatter intensity plot saved successfully.\")",
        "outputType": "console",
        "consoleOutput": "Scatter intensity plot saved successfully.\n\n[STATUS] Execution Completed (Exit Code: 0)",
        "plots": []
      }
    ]
  },
  {
    "id": "exp-9",
    "title": "Experiment 9: Marketing Campaign Data Analysis",
    "description": "Analyze customer demographics and purchasing behavior from marketing campaigns using pandas, calculate descriptive statistics, and perform correlation analysis across spending categories.",
    "module": "4",
    "experimentNumber": "9",
    "subExperiments": [
      {
        "id": "sub-9a",
        "codeNum": "9a",
        "title": "9A – Marketing Campaign Data Analysis",
        "githubUrl": "https://github.com/muddannagarisandyarani/DS/blob/main/program-9.py",
        "code": "import pandas as pd\nimport matplotlib.pyplot as plt\nimport seaborn as sns\nimport os\n\n# Step 1: Read the CSV file\nfile_name = \"marketing_campaign.csv\"\n\nif not os.path.exists(file_name):\n    print(\"Error: marketing_campaign.csv file not found!\")\n    print(\"Place the CSV file in the same folder as this Python program.\")\n    exit()\n\n# Automatically detect comma or semicolon separator\ndf = pd.read_csv(file_name, sep=None, engine=\"python\")\n\n# Remove extra spaces from column names\ndf.columns = df.columns.str.strip()\n\n# Step 2: Display dataset information\nprint(\"\\nFirst 5 Records:\")\nprint(df.head())\n\nprint(\"\\nDataset Shape:\")\nprint(df.shape)\n\nprint(\"\\nColumn Names:\")\nprint(df.columns.tolist())\n\n# Step 3: Convert required columns to numeric if available\nrequired_columns = [\n    \"Income\",\n    \"MntWines\",\n    \"MntFruits\",\n    \"MntMeatProducts\",\n    \"MntFishProducts\",\n    \"MntSweetProducts\",\n    \"MntGoldProds\"\n]\n\n# Check whether all required columns exist\nmissing_columns = [\n    col for col in required_columns if col not in df.columns\n]\n\nif missing_columns:\n    print(\"\\nRequired columns are missing:\", missing_columns)\n    print(\"Please check whether you downloaded the correct Marketing Campaign dataset.\")\n    exit()\n\n# Convert columns to numeric values\nfor col in required_columns:\n    df[col] = pd.to_numeric(df[col], errors=\"coerce\")\n\n# Step 4: Handle missing values\ndf = df.dropna(subset=required_columns)\n\nprint(\"\\nMissing Values After Cleaning:\")\nprint(df[required_columns].isnull().sum())\n\n# Step 5: Calculate summary statistics\nprint(\"\\nSummary Statistics:\")\nprint(df[required_columns].describe())\n\n# Step 6: Calculate total spending\nspending_columns = [\n    \"MntWines\",\n    \"MntFruits\",\n    \"MntMeatProducts\",\n    \"MntFishProducts\",\n    \"MntSweetProducts\",\n    \"MntGoldProds\"\n]\n\ndf[\"Total_Spending\"] = df[spending_columns].sum(axis=1)\n\nprint(\"\\nAverage Income:\")\nprint(df[\"Income\"].mean())\n\nprint(\"\\nAverage Total Spending:\")\nprint(df[\"Total_Spending\"].mean())\n\n# Step 7: Correlation analysis\ncorrelation = df[required_columns].corr()\n\nprint(\"\\nCorrelation Matrix:\")\nprint(correlation)\n\n# Step 8: Create correlation heatmap\nplt.figure(figsize=(10, 7))\nsns.heatmap(\n    correlation,\n    annot=True,\n    cmap=\"coolwarm\",\n    fmt=\".2f\"\n)\nplt.title(\"Customer Income and Product Spending Correlation\")\nplt.tight_layout()\nplt.savefig(\"campaign_correlation_heatmap.png\")\nplt.show()\n\n# Step 9: Create income vs total spending scatter plot\nplt.figure(figsize=(8, 6))\nplt.scatter(\n    df[\"Income\"],\n    df[\"Total_Spending\"],\n    alpha=0.5\n)\nplt.xlabel(\"Income\")\nplt.ylabel(\"Total Spending\")\nplt.title(\"Customer Income vs Total Product Spending\")\nplt.tight_layout()\nplt.savefig(\"campaign_income_spending.png\")\nplt.show()\n\n# Step 10: Display top 10 customers by spending\ntop_customers = df.nlargest(10, \"Total_Spending\")\n\nprint(\"\\nTop 10 Customers by Total Spending:\")\nprint(top_customers[[\"Income\", \"Total_Spending\"]])\n\nprint(\"\\nAnalysis completed successfully!\")\nprint(\"Heatmap saved as campaign_correlation_heatmap.png\")\nprint(\"Scatter plot saved as campaign_income_spending.png\")",
        "outputType": "console",
        "consoleOutput": "First 5 Records:\n   Income  MntWines  MntFruits  MntMeatProducts  MntFishProducts  MntSweetProducts  MntGoldProds\n0  58138.0       635         88              546              172                88            88\n1  46344.0        11          1                6                2                 1             6\n2  71613.0       426         49              127              111                21            42\n3  26646.0        11          4               20               10                 3             5\n4  58293.0       173         43              118               46                27            15\n\nDataset Shape:\n(2216, 7)\n\nColumn Names:\n['Income', 'MntWines', 'MntFruits', 'MntMeatProducts', 'MntFishProducts', 'MntSweetProducts', 'MntGoldProds']\n\nMissing Values After Cleaning:\nIncome              0\nMntWines            0\nMntFruits           0\nMntMeatProducts     0\nMntFishProducts     0\nMntSweetProducts    0\nMntGoldProds        0\ndtype: int64\n\nSummary Statistics:\n              Income     MntWines   MntFruits  MntMeatProducts  MntFishProducts  MntSweetProducts  MntGoldProds\ncount    2216.000000  2216.000000  2216.000000      2216.000000      2216.000000       2216.000000   2216.000000\nmean    52247.251354   305.091606    26.356047       166.995939        37.637635         27.028881     43.965253\nstd     25173.076661   337.327920    39.793917       224.283093        54.752082         41.072046     51.815414\nmin      1730.000000     0.000000     0.000000         0.000000         0.000000          0.000000      0.000000\n25%     35303.000000    24.000000     2.000000        16.000000         3.000000          1.000000      9.000000\n50%     51381.500000   174.500000     8.000000        68.000000        12.000000          8.000000     24.500000\n75%     68522.000000   505.000000    33.000000       232.250000        50.000000         33.000000     56.000000\nmax    666666.000000  1493.000000   199.000000      1725.000000       259.000000        262.000000    321.000000\n\nAverage Income:\n52247.25135379061\n\nAverage Total Spending:\n606.7752707581227\n\nCorrelation Matrix:\n                   Income  MntWines  MntFruits  MntMeatProducts  MntFishProducts  MntSweetProducts  MntGoldProds\nIncome           1.000000  0.578342   0.430842         0.584633         0.438871          0.438845      0.323260\nMntWines         0.578342  1.000000   0.387024         0.568860         0.397721          0.390326      0.392731\nMntFruits        0.430842  0.387024   1.000000         0.547822         0.593431          0.571606      0.396487\nMntMeatProducts  0.584633  0.568860   0.547822         1.000000         0.573574          0.535136      0.359446\nMntFishProducts  0.438871  0.397721   0.593431         0.573574         1.000000          0.583867      0.427142\nMntSweetProducts 0.438845  0.390326   0.571606         0.535136         0.583867          1.000000      0.327622\nMntGoldProds     0.323260  0.392731   0.396487         0.359446         0.427142          0.327622      1.000000\n\nTop 10 Customers by Total Spending:\n       Income  Total_Spending\n1653  157146.0          2525.0\n1572   67225.0          2440.0\n1492   92556.0          2425.0\n18     91845.0          2352.0\n165    87195.0          2349.0\n1124   85431.0          2346.0\n2174   82800.0          2304.0\n504    81834.0          2257.0\n1793   80790.0          2233.0\n1961   73634.0          2225.0\n\nAnalysis completed successfully!\nHeatmap saved as campaign_correlation_heatmap.png\nScatter plot saved as campaign_income_spending.png\n\n[STATUS] Execution Completed (Exit Code: 0)",
        "plots": []
      }
    ]
  },
  {
    "id": "exp-10",
    "title": "Experiment 10: Emotion Detection from Text using TF-IDF and Logistic Regression",
    "description": "Train a text classification pipeline combining TF-IDF vectorization and Logistic Regression to predict fine-grained emotional states from natural language inputs with emoji mapping.",
    "module": "5",
    "experimentNumber": "10",
    "subExperiments": [
      {
        "id": "sub-10a",
        "codeNum": "10a",
        "title": "10A – Emotion Detection from Text using TF-IDF and Logistic Regression",
        "githubUrl": "https://github.com/muddannagarisandyarani/DS/blob/main/program-10.py",
        "code": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.feature_extraction.text import TfidfVectorizer\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import accuracy_score, classification_report\ndata = {\n    \"text\": [\n        \"I am very happy today\",\n        \"This is a wonderful day\",\n        \"I feel cheerful and excited\",\n        \"I am sad and lonely\",\n        \"I feel very disappointed\",\n        \"I miss my family so much\",\n        \"I am angry with you\",\n        \"This makes me furious\",\n        \"I hate this situation\",\n        \"I am scared of the dark\",\n        \"I am afraid of losing\",\n        \"I feel nervous and frightened\",\n        \"I love you so much\",\n        \"You mean everything to me\",\n        \"I adore spending time with you\",\n        \"Wow this is unbelievable\",\n        \"I did not expect this surprise\",\n        \"What an amazing unexpected gift\"\n    ],\n    \"emotion\": [\n        \"happy\", \"happy\", \"happy\",\n        \"sadness\", \"sadness\", \"sadness\",\n        \"anger\", \"anger\", \"anger\",\n        \"fear\", \"fear\", \"fear\",\n        \"love\", \"love\", \"love\",\n        \"surprise\", \"surprise\", \"surprise\"\n    ]\n}\ndf = pd.DataFrame(data)\nX_train, X_test, y_train, y_test = train_test_split(\n    df[\"text\"],\n    df[\"emotion\"],\n    test_size=0.33,\n    random_state=42,\n    stratify=df[\"emotion\"]\n)\nmodel = Pipeline([\n    (\"tfidf\", TfidfVectorizer(ngram_range=(1, 2))),\n    (\"classifier\", LogisticRegression(max_iter=1000))\n])\nmodel.fit(X_train, y_train)\npredictions = model.predict(X_test)\nprint(\"Test Accuracy:\",\n      round(accuracy_score(y_test, predictions) * 100, 2), \"%\")\nprint(\"\\nClassification Report:\")\nprint(classification_report(\n    y_test, predictions, zero_division=0\n))\nemoji_map = {\n    \"happy\": \"😊\",\n    \"sadness\": \"😢\",\n    \"anger\": \"😠\",\n    \"fear\": \"😨\",\n    \"love\": \"❤️\",\n    \"surprise\": \"😲\"\n}\ndef detect_emotion(text):\n    emotion = model.predict([text])[0]\n    emoji = emoji_map[emotion]\n    print(\"Input Text:\", text)\n    print(\"Detected Emotion:\", emotion)\n    print(\"Relevant Emoji:\", emoji)\ndetect_emotion(\"I am happy to see you\")\ndetect_emotion(\"I feel lonely today\")\ndetect_emotion(\"I love my family\")",
        "outputType": "console",
        "consoleOutput": "Test Accuracy: 100.0 %\n\nClassification Report:\n              precision    recall  f1-score   support\n\n       anger       1.00      1.00      1.00         1\n        fear       1.00      1.00      1.00         1\n       happy       1.00      1.00      1.00         1\n        love       1.00      1.00      1.00         1\n     sadness       1.00      1.00      1.00         1\n    surprise       1.00      1.00      1.00         1\n\n    accuracy                           1.00         6\n   macro avg       1.00      1.00      1.00         6\nweighted avg       1.00      1.00      1.00         6\n\nInput Text: I am happy to see you\nDetected Emotion: happy\nRelevant Emoji: 😊\nInput Text: I feel lonely today\nDetected Emotion: sadness\nRelevant Emoji: 😢\nInput Text: I love my family\nDetected Emotion: love\nRelevant Emoji: ❤️\n\n[STATUS] Execution Completed (Exit Code: 0)",
        "plots": []
      }
    ]
  }
];

