import { getAssetUrl } from '../utils/assetUrl';

export const initialProfile = {
  name: "M. Sandya Rani",
  rollNo: "24102A030063",
  branch: "Data Science",
  section: "1",
  assistantProfessor: "S.Bosubabu",
  professor: "S.Bosubabu",
  quote: "Small steps every day lead to big results.",
  photo: getAssetUrl("sandya.jpeg"),
  github: "https://github.com/muddannagarisandyarani/DS",
  linkedin: "https://www.linkedin.com/in/sandya-rani-3b547b378/"
};

// Course Syllabus and Curriculum (Permanent academic reference)
export const courseSyllabus = [
  {
    unit: 1,
    id: "unit-1",
    title: "INTRODUCTION TO DATA SCIENCE",
    description: "Understand data sources, data types, collection pipelines, cleaning and preprocessing techniques.",
    icon: "Database",
    colorTheme: "blue",
    badgeColor: "from-blue-500 to-cyan-400",
    bgColor: "bg-blue-950/40",
    borderColor: "border-blue-500/30",
    topics: [
      "1.1 Definition of data science",
      "1.2 Skills for data science",
      "1.3 Tools for data science",
      "1.4 Data types",
      "1.5 Data collections",
      "1.6 Data preprocessing"
    ],
    outcomes: [
      "Understand the multidisciplinary nature of data science and key lifecycle stages",
      "Distinguish between structured, unstructured, and semi-structured data formats",
      "Perform ingestion from diverse data sources (APIs, flat files, databases)",
      "Clean noisy datasets by handling missing values, duplicates, and outliers"
    ],
    tools: ["Python", "Pandas", "NumPy", "Jupyter Notebook", "OpenRefine"],
    summary: "Master fundamental data wrangling skills. Learn how to ingest structured and unstructured datasets, resolve missing values, normalize scales, and prepare feature sets ready for machine learning algorithms."
  },
  {
    unit: 2,
    id: "unit-2",
    title: "DATA EXTRACTION",
    description: "Feature selection, filtering methods, entropy metrics, and decision tree algorithms.",
    icon: "BarChart3",
    colorTheme: "purple",
    badgeColor: "from-purple-500 to-indigo-400",
    bgColor: "bg-purple-950/40",
    borderColor: "border-purple-500/30",
    topics: [
      "2.1 Extracting meaning from data - Feature selection",
      "2.2 User retention and behavioral metrics",
      "2.3 Filters (Filter methods for feature selection)",
      "2.4 Wrappers (Forward/backward selection wrappers)",
      "2.5 Information Gain and Entropy calculation",
      "2.6 Decision tree algorithm & node splitting"
    ],
    outcomes: [
      "Formulate feature selection strategies to reduce dimensionality and curse of dimensionality",
      "Compute information entropy and Gini impurity for algorithmic splits",
      "Construct and prune decision trees for classification and regression tasks",
      "Evaluate feature importance scores across models"
    ],
    tools: ["Scikit-Learn", "SciPy", "Pandas", "Graphviz", "DecisionTreeClassifier"],
    summary: "Learn to uncover hidden patterns and stories in data. Master statistical summary techniques, feature filtering, wrapper methods, entropy, and decision tree induction."
  },
  {
    unit: 3,
    id: "unit-3",
    title: "DATA VISUALIZATION",
    description: "Matplotlib priming, exploratory plotting, categorical charts, distributions, and facet grids.",
    icon: "Brain",
    colorTheme: "green",
    badgeColor: "from-emerald-500 to-teal-400",
    bgColor: "bg-emerald-950/40",
    borderColor: "border-emerald-500/30",
    topics: [
      "3.1 A Brief matplotlib API primer",
      "3.2 Bar plots & grouped bar representations",
      "3.3 Histograms & frequency distribution bins",
      "3.4 Density plots (KDE) and probability spreads",
      "3.5 Scatter plots, bivariate relationships, and regression lines",
      "3.6 Facet grids, multi-panel layouts, and pairwise visualizations"
    ],
    outcomes: [
      "Design informative, presentation-grade scientific visualizations",
      "Select effective visual encodings (color, position, shape, size) based on data scale",
      "Build multi-faceted comparative dashboards using Seaborn and Matplotlib",
      "Uncover nonlinear distributions, clusters, and anomalies visually"
    ],
    tools: ["Matplotlib", "Seaborn", "Plotly", "Chart.js"],
    summary: "Explore visualization as both an exploratory analysis tool and storytelling medium. Build high-impact visual representations including distributions, scatter plots, pairplots, and facet grids."
  },
  {
    unit: 4,
    id: "unit-4",
    title: "STATISTICAL THINKING",
    description: "Outlier detection, distribution summaries, variance metrics, PMFs, and diagnostic reporting.",
    icon: "Network",
    colorTheme: "orange",
    badgeColor: "from-amber-500 to-orange-400",
    bgColor: "bg-amber-950/40",
    borderColor: "border-amber-500/30",
    topics: [
      "4.1 Outlier identification & IQR/Z-score thresholds",
      "4.2 Summarizing distributions (Mean, Median, Skewness, Kurtosis)",
      "4.3 Variance, standard deviation, and interquartile measures",
      "4.4 Reporting results and statistical hypothesis formulation",
      "4.5 Plotting Probability Mass Functions (PMFs) and CDFs",
      "4.6 Other statistical visualizations (Box plots, violin plots, Q-Q plots)"
    ],
    outcomes: [
      "Apply statistical rigor to quantify uncertainty, central tendency, and dispersion",
      "Identify influential outliers and evaluate their impact on statistical estimations",
      "Model empirical data using theoretical probability distributions",
      "Interpret p-values, confidence intervals, and hypothesis tests"
    ],
    tools: ["Statsmodels", "SciPy Stats", "NumPy", "Matplotlib"],
    summary: "Build foundational statistical reasoning. Learn how to summarize distributions rigorously, detect anomalies, compute variance, and communicate data findings with statistical confidence."
  },
  {
    unit: 5,
    id: "unit-5",
    title: "TIME SERIES ANALYSIS AND PREDICTIVE MODELING",
    description: "Moving averages, temporal cleaning, serial correlation, predictive models, and sentiment analysis.",
    icon: "FileCode",
    colorTheme: "pink",
    badgeColor: "from-pink-500 to-rose-400",
    bgColor: "bg-pink-950/40",
    borderColor: "border-pink-500/30",
    topics: [
      "5.1 Importing and temporal plotting of time-series data",
      "5.2 Moving averages & trend smoothing (SMA, EMA)",
      "5.3 Handling missing values and gaps in temporal datasets",
      "5.4 Serial correlation & autocorrelation function (ACF/PACF)",
      "5.5 Predictive modeling & regression forecasting",
      "5.6 Sentiment analysis and text classification pipelines"
    ],
    outcomes: [
      "Decompose temporal series into trend, seasonality, and residual noise",
      "Calculate rolling statistics and autocorrelation structures",
      "Build predictive forecasting models and evaluate MSE/RMSE/MAE errors",
      "Implement NLP tokenization and sentiment classification pipelines"
    ],
    tools: ["Pandas DateTime", "Statsmodels ARIMA", "NLTK/TextBlob", "Scikit-Learn"],
    summary: "Bridge exploratory techniques with predictive capabilities. Solve real-world time series problems, trend tracking, serial correlation modeling, and natural language sentiment scoring."
  }
];

// 5 Standard Course Modules with Preserved Syllabus & Bundled Course Materials
export const initialModules = [
  {
    id: "mod-1",
    moduleNumber: 1,
    title: "INTRODUCTION TO DATA SCIENCE",
    description: "Understand data sources, cleaning and preprocessing techniques.",
    icon: "Database",
    colorTheme: "blue",
    badgeColor: "from-blue-500 to-cyan-400",
    bgColor: "bg-blue-950/40",
    borderColor: "border-blue-500/30",
    btnColor: "bg-blue-600 hover:bg-blue-500",
    syllabus: [
      "1.1 Definition of data science",
      "1.2 Skills for data science",
      "1.3 Tools for data science",
      "1.4 Data types",
      "1.5 Data collections",
      "1.6 Data preprocessing"
    ],
    resources: [
      {
        id: "pdf-ds-unit-1",
        moduleId: "mod-1",
        name: "Module 1: Introduction to Data Science Material.pdf",
        type: "pdf",
        size: "900 KB",
        rawSize: 900349,
        date: "2026-03-01",
        url: getAssetUrl("modules/Module1_Introduction.pdf")
      }
    ],
    summary: "Master fundamental data wrangling skills. Learn how to ingest structured and unstructured datasets, resolve missing values, normalize scales, and prepare feature sets ready for machine learning algorithms."
  },
  {
    id: "mod-2",
    moduleNumber: 2,
    title: "DATA EXTRACTION",
    description: "Explore data using statistical methods and visualizations.",
    icon: "BarChart3",
    colorTheme: "purple",
    badgeColor: "from-purple-500 to-indigo-400",
    bgColor: "bg-purple-950/40",
    borderColor: "border-purple-500/30",
    btnColor: "bg-purple-600 hover:bg-purple-500",
    syllabus: [
      "2.1 Extracting meaning from data - Feature selection",
      "2.2 User retention and behavioral metrics",
      "2.3 Filters",
      "2.4 Wrappers",
      "2.5 Entropy",
      "2.6 Decision tree algorithm"
    ],
    resources: [
      {
        id: "pdf-ds-unit-2",
        moduleId: "mod-2",
        name: "Module 2: Data Extraction & Feature Selection Material.pdf",
        type: "pdf",
        size: "1.2 MB",
        rawSize: 1189659,
        date: "2026-03-01",
        url: getAssetUrl("modules/Module2_Data_Extraction.pdf")
      }
    ],
    summary: "Learn to uncover hidden patterns and stories in data. Master statistical summary techniques and high-impact visualizations including distributions, scatter plots, pairplots, and heatmaps."
  },
  {
    id: "mod-3",
    moduleNumber: 3,
    title: "DATA VISUALIZATION",
    description: "Learn supervised & unsupervised learning techniques.",
    icon: "Brain",
    colorTheme: "green",
    badgeColor: "from-emerald-500 to-teal-400",
    bgColor: "bg-emerald-950/40",
    borderColor: "border-emerald-500/30",
    btnColor: "bg-emerald-600 hover:bg-emerald-500",
    syllabus: [
      "3.1 A Brief matplotlib API primer",
      "3.2 Bar plots",
      "3.3 Histograms",
      "3.4 Density plots",
      "3.5 Scatter plots",
      "3.6 Facet grids"
    ],
    resources: [
      {
        id: "pdf-ds-unit-3",
        moduleId: "mod-3",
        name: "Module 3: Data Visualization & Matplotlib Primer.pdf",
        type: "pdf",
        size: "1.4 MB",
        rawSize: 1405939,
        date: "2026-03-01",
        url: getAssetUrl("modules/Module3_Plotting_Visualization.pdf")
      }
    ],
    summary: "Explore classical AI algorithms for classification, regression, and clustering. Build end-to-end predictive models using Scikit-Learn with cross-validation and hyperparameter tuning."
  },
  {
    id: "mod-4",
    moduleNumber: 4,
    title: "STATISTICAL THINKING",
    description: "Build neural networks and work with advanced models.",
    icon: "Network",
    colorTheme: "orange",
    badgeColor: "from-amber-500 to-orange-400",
    bgColor: "bg-amber-950/40",
    borderColor: "border-amber-500/30",
    btnColor: "bg-amber-600 hover:bg-amber-500",
    syllabus: [
      "4.1 Outliers",
      "4.2 Summarizing distributions",
      "4.3 Variance",
      "4.4 Reporting results",
      "4.5 Plotting PMFs",
      "4.6 Other visualizations"
    ],
    resources: [
      {
        id: "pdf-ds-unit-4",
        moduleId: "mod-4",
        name: "Module 4: Statistical Thinking & Distributions Material.pdf",
        type: "pdf",
        size: "1.8 MB",
        rawSize: 1811060,
        date: "2026-03-01",
        url: getAssetUrl("modules/Module4_Statistical_Thinking.pdf")
      }
    ],
    summary: "Dive deep into modern neural network architectures. Learn how backpropagation works, build CNN models for image processing, and analyze sequential text/time-series data with RNNs."
  },
  {
    id: "mod-5",
    moduleNumber: 5,
    title: "TIME SERIES ANALYSIS AND PREDICTIVE MODELING",
    description: "Apply data science in real-world problems and projects.",
    icon: "FileCode",
    colorTheme: "pink",
    badgeColor: "from-pink-500 to-rose-400",
    bgColor: "bg-pink-950/40",
    borderColor: "border-pink-500/30",
    btnColor: "bg-pink-600 hover:bg-pink-500",
    syllabus: [
      "5.1 Importing and cleaning Plotting",
      "5.2 Moving averages",
      "5.3 Missing values",
      "5.4 Serial correlation",
      "5.5 Predictive modeling",
      "5.6 Sentiment analysis"
    ],
    resources: [
      {
        id: "pdf-ds-unit-5",
        moduleId: "mod-5",
        name: "Module 5: Time Series Analysis & Predictive Modeling Material.pdf",
        type: "pdf",
        size: "982 KB",
        rawSize: 982290,
        date: "2026-03-01",
        url: getAssetUrl("modules/Module5_Time_Series_Predictive_Modeling.pdf")
      }
    ],
    summary: "Bridge theory and industry practice. Solve end-to-end industry case studies, tackle imbalanced data, build recommender engines, and deploy models to web endpoints."
  }
];

// Experiments initial data (5 Academic Data Science Lab Experiments)

// Experiments initial data (7 Academic Data Science Lab Experiments & 20 Sub-Experiments)
export const initialExperiments = [
{
    id: "exp-1",
    title: "Experiment 1: Reading CSV Data from an online Source",
    description: "Ingest real-world tabular data from remote cloud repositories using pandas read_csv(), inspect schema, and verify dataset dimensions.",
    module: "1",
    experimentNumber: "1",
    subExperiments: [
{
        id: "sub-1a",
        codeNum: "1a",
        title: "a-1-Reading CSV Data from an online Source",
        githubUrl: "https://github.com/muddannagarisandyarani/DS/blob/main/program1A-1.py",
        code: "import pandas as pd\n# Online CSV dataset\nurl = \"https://raw.githubusercontent.com/mwaskom/seaborn-data/master/iris.csv\"\n# CSV file reading\ndf = pd.read_csv(url)\n# Displaying the first five rows\nprint(\"First five rows of the dataset:\")\nprint(df.head())\n# Displaying dataset information\nprint(\"\\nDataset Information:\")\nprint(df.info())\n# Displaying the shape of the dataset\nprint(\"\\nNumber of rows and columns:\")\nprint(df.shape)",
        outputType: "console",
        consoleOutput: "First five rows of the dataset:\n   sepal_length  sepal_width  petal_length  petal_width species\n0           5.1          3.5           1.4          0.2  setosa\n1           4.9          3.0           1.4          0.2  setosa\n2           4.7          3.2           1.3          0.2  setosa\n3           4.6          3.1           1.5          0.2  setosa\n4           5.0          3.6           1.4          0.2  setosa\n\nDataset Information:\n<class 'pandas.DataFrame'>\nRangeIndex: 150 entries, 0 to 149\nData columns (total 5 columns):\n #   Column        Non-Null Count  Dtype  \n---  ------        --------------  -----  \n 0   sepal_length  150 non-null    float64\n 1   sepal_width   150 non-null    float64\n 2   petal_length  150 non-null    float64\n 3   petal_width   150 non-null    float64\n 4   species       150 non-null    str    \ndtypes: float64(4), str(1)\nmemory usage: 7.2 KB\nNone\n\nNumber of rows and columns:\n(150, 5)\n\n[STATUS] Execution Completed (Exit Code: 0)",
        plots: []
      }
    ]
  },
{
    id: "exp-2",
    title: "Experiment 2: Writing Data to a CSV File",
    description: "Extract API data via REST requests, parse JSON structures into structured pandas DataFrames, and export cleaned records.",
    module: "1",
    experimentNumber: "2",
    subExperiments: [
{
        id: "sub-2a",
        codeNum: "2a",
        title: "a-2-Writing Data to a CSV File",
        githubUrl: "https://github.com/muddannagarisandyarani/DS/blob/main/program2a-1.py",
        code: "import requests\nimport pandas as pd\nurl = \"https://api.github.com/repos/pandas-dev/pandas/issues\"\nresponse = requests.get(url)\nissues = response.json()\ndf_issues = pd.DataFrame(issues)\nprint(df_issues[[\"id\", \"title\", \"state\", \"created_at\"]].head(30))",
        outputType: "console",
        consoleOutput: "id  ...            created_at\n0   5848012326  ...  2026-10-14T12:44:31Z\n1   5845542782  ...  2026-10-14T09:43:48Z\n2   5843411693  ...  2026-10-14T06:58:51Z\n3   5842452093  ...  2026-10-14T05:25:34Z\n4   5842347612  ...  2026-10-14T05:13:57Z\n5   5842057367  ...  2026-10-14T04:41:25Z\n6   5836858562  ...  2026-10-13T20:00:35Z\n7   5833878474  ...  2026-10-13T16:22:56Z\n8   5823196977  ...  2026-10-13T01:58:24Z\n9   5821263660  ...  2026-10-12T22:22:40Z\n10  5820631198  ...  2026-10-12T21:24:16Z\n11  5820102631  ...  2026-10-12T20:37:25Z\n12  5819988547  ...  2026-10-12T20:27:21Z\n13  5819825100  ...  2026-10-12T20:13:11Z\n14  5819823957  ...  2026-10-12T20:13:05Z\n15  5819707563  ...  2026-10-12T20:02:54Z\n16  5819680288  ...  2026-10-12T20:00:40Z\n17  5818401698  ...  2026-10-12T18:15:25Z\n18  5817003599  ...  2026-10-12T16:22:18Z\n19  5810886467  ...  2026-10-12T08:44:52Z\n20  5804431276  ...  2026-10-11T19:32:24Z\n21  5804184657  ...  2026-10-11T19:03:25Z\n22  5804111390  ...  2026-10-11T18:54:10Z\n23  5802072401  ...  2026-10-11T14:42:35Z\n24  5801833876  ...  2026-10-11T14:12:03Z\n25  5800129377  ...  2026-10-11T10:14:44Z\n26  5799820380  ...  2026-10-11T09:29:54Z\n27  5799547646  ...  2026-10-11T08:50:24Z\n28  5799383822  ...  2026-10-11T08:26:05Z\n29  5799380584  ...  2026-10-11T08:25:36Z\n\n[30 rows x 4 columns]\n\n[STATUS] Execution Completed (Exit Code: 0)",
        plots: []
      }
    ]
  },
{
    id: "exp-3",
    title: "Experiment 3: Data Cleaning, Preprocessing & Transformation",
    description: "Master essential data wrangling techniques: handling missing values with dropna/fillna, categorical mapping, outlier detection, and regex pattern matching.",
    module: "1",
    experimentNumber: "3",
    subExperiments: [
{
        id: "sub-3a",
        codeNum: "3a",
        title: "3a Cleaning and Preprocessing Data",
        githubUrl: "https://github.com/muddannagarisandyarani/DS/blob/main/program3A.py",
        code: "import numpy as np\nimport pandas as pd\ndata = {'A': [1, 2, np.nan],\n        'B': [4, np.nan, np.nan]}\ndf = pd.DataFrame(data)\nprint(df.isna())\ndf_clean = df.dropna()\ndf_filled = df.fillna(0)\nprint(df_clean)\nprint(df_filled)\ndf = df.drop_duplicates()",
        outputType: "console",
        consoleOutput: "A      B\n0  False  False\n1  False   True\n2   True   True\n     A    B\n0  1.0  4.0\n     A    B\n0  1.0  4.0\n1  2.0  0.0\n2  0.0  0.0\n\n[STATUS] Execution Completed (Exit Code: 0)",
        plots: []
      },
{
        id: "sub-3b",
        codeNum: "3b",
        title: "3b Transforming Data for Analysis",
        githubUrl: "https://github.com/muddannagarisandyarani/DS/blob/main/program3B.py",
        code: "import pandas as pd\ndf = pd.DataFrame({\n    'gender': ['male', 'female', 'male']\n})\ndf['gender_num'] = df['gender'].map({\n    'male': 0,\n    'female': 1\n})\ndf_renamed = df.rename(columns={'gender': 'Gender'})\nprint(df_renamed)",
        outputType: "console",
        consoleOutput: "Gender  gender_num\n0    male           0\n1  female           1\n2    male           0\n\n[STATUS] Execution Completed (Exit Code: 0)",
        plots: []
      },
{
        id: "sub-3c",
        codeNum: "3c",
        title: "3c Data Normalization",
        githubUrl: "https://github.com/muddannagarisandyarani/DS/blob/main/program3C.py",
        code: "import numpy as np\nimport pandas as pd\ndata = pd.DataFrame(np.random.randn(100, 3))\noutliers = (data > 3) | (data < -3)\nprint(outliers.sum())",
        outputType: "console",
        consoleOutput: "0    0\n1    1\n2    0\ndtype: int64\n\n[STATUS] Execution Completed (Exit Code: 0)",
        plots: []
      },
{
        id: "sub-3d",
        codeNum: "3d",
        title: "3d Pattern Matching with Regular Expressions",
        githubUrl: "https://github.com/muddannagarisandyarani/DS/blob/main/program3D.py",
        code: "import re\ntext = \"This is 1 test\"\nsplit_text = re.split(r'\\s+', text)\nprint(split_text)",
        outputType: "console",
        consoleOutput: "['This', 'is', '1', 'test']\n\n[STATUS] Execution Completed (Exit Code: 0)",
        plots: []
      }
    ]
  },
{
    id: "exp-4",
    title: "Experiment 4: Pandas Series, Stacking & Merging DataFrames",
    description: "Work with advanced pandas data structures: MultiIndex series, reshaping tabular data using unstack/stack, and joining DataFrames with combine_first and merge.",
    module: "2",
    experimentNumber: "4",
    subExperiments: [
{
        id: "sub-4a",
        codeNum: "4a",
        title: "4a Creating and Manipulating Pandas Series",
        githubUrl: "https://github.com/muddannagarisandyarani/DS/blob/main/program4A.py",
        code: "import pandas as pd\nindex = [\n    ['Computer', 'Computer', 'Mathematics', 'Mathematics'],\n    ['Java', 'Python', 'Algebra', 'Calculus']\n]\nmulti_index = pd.MultiIndex.from_arrays(index, names=['Department', 'Subject'])\nmarks = pd.Series(\n    [90, 85, 95, 89],\n    index=multi_index\n)\nprint(\"Original Series:\")\nprint(marks)\nprint(\"\\nData for Computer:\")\nprint(marks.loc['Computer'])\nprint(\"\\nData for Java:\")\nprint(marks.loc[('Computer', 'Java')])\nprint(\"\\nData for Mathematics:\")\nprint(marks.loc['Mathematics'])",
        outputType: "console",
        consoleOutput: "Original Series:\nDepartment   Subject \nComputer     Java        90\n             Python      85\nMathematics  Algebra     95\n             Calculus    89\ndtype: int64\n\nData for Computer:\nSubject\nJava      90\nPython    85\ndtype: int64\n\nData for Java:\n90\n\nData for Mathematics:\nSubject\nAlgebra     95\nCalculus    89\ndtype: int64\n\n[STATUS] Execution Completed (Exit Code: 0)",
        plots: []
      },
{
        id: "sub-4b",
        codeNum: "4b",
        title: "4b Stacking Data with Pandas",
        githubUrl: "https://github.com/muddannagarisandyarani/DS/blob/main/program4B.py",
        code: "import pandas as pd\nindex = pd.MultiIndex.from_tuples(\n    [\n        ('Computer', 'Java'),\n        ('Computer', 'Python'),\n        ('Mathematics', 'Algebra'),\n        ('Mathematics', 'Calculus')\n    ],\n    names=['Department', 'Subject']\n)\ndata = pd.DataFrame(\n    {\n        '2025': [75, 82, 90, 86],\n        '2026': [80, 88, 92, 89]\n    },\n    index=index\n)\nprint(\"Original Tabular Data:\")\nprint(data)\nunstacked_data = data.unstack()\nprint(\"\\nData after Unstack():\")\nprint(unstacked_data)\nstacked_data = unstacked_data.stack()\nprint(\"\\nData after Stack():\")\nprint(stacked_data)",
        outputType: "console",
        consoleOutput: "Original Tabular Data:\n                      2025  2026\nDepartment  Subject             \nComputer    Java        75    80\n            Python      82    88\nMathematics Algebra     90    92\n            Calculus    86    89\n\nData after Unstack():\n               2025                          2026                      \nSubject     Algebra Calculus  Java Python Algebra Calculus  Java Python\nDepartment                                                             \nComputer        NaN      NaN  75.0   82.0     NaN      NaN  80.0   88.0\nMathematics    90.0     86.0   NaN    NaN    92.0     89.0   NaN    NaN\n\nData after Stack():\n                      2025  2026\nDepartment  Subject             \nComputer    Algebra    NaN   NaN\n            Calculus   NaN   NaN\n            Java      75.0  80.0\n            Python    82.0  88.0\nMathematics Algebra   90.0  92.0\n            Calculus  86.0  89.0\n            Java       NaN   NaN\n            Python     NaN   NaN\n\n[STATUS] Execution Completed (Exit Code: 0)",
        plots: []
      },
{
        id: "sub-4c",
        codeNum: "4c",
        title: "4c Merging DataFrames with Pandas",
        githubUrl: "https://github.com/muddannagarisandyarani/DS/blob/main/program4C.py",
        code: "import pandas as pd\ndf1 = pd.DataFrame(\n    {\n        'Name': ['Anil', 'Priya', 'Rahul'],\n        'Marks': [76, None, 84],\n        'Grade': ['B', 'A', None]\n    },\n    index=[201, 202, 203]\n)\ndf2 = pd.DataFrame(\n    {\n        'Name': ['Anil', 'Priya', 'Rahul'],\n        'Marks': [89, 91, 79],\n        'Grade': ['None', 'A', 'B']\n    },\n    index=[201, 202, 204]\n)\nprint(\"First DataFrame:\")\nprint(df1)\nprint(\"\\nSecond DataFrame:\")\nprint(df2)\nmerger = pd.merge(\n    df1,\n    df2,\n    left_index=True,\n    right_index=True,\n    how='outer',\n    suffixes=('_Df1', '_Df2')\n)\nprint(\"\\nMerged DataFrame:\")\nprint(merger)\ncombined = df1.combine_first(df2)\nprint(\"\\nDataFrame after combine_first():\")\nprint(combined)",
        outputType: "console",
        consoleOutput: "First DataFrame:\n      Name  Marks Grade\n201   Anil   76.0     B\n202  Priya    NaN     A\n203  Rahul   84.0   NaN\n\nSecond DataFrame:\n      Name  Marks Grade\n201   Anil     89  None\n202  Priya     91     A\n204  Rahul     79     B\n\nMerged DataFrame:\n    Name_Df1  Marks_Df1 Grade_Df1 Name_Df2  Marks_Df2 Grade_Df2\n201     Anil       76.0         B     Anil       89.0      None\n202    Priya        NaN         A    Priya       91.0         A\n203    Rahul       84.0       NaN      NaN        NaN       NaN\n204      NaN        NaN       NaN    Rahul       79.0         B\n\nDataFrame after combine_first():\n      Name  Marks Grade\n201   Anil   76.0     B\n202  Priya   91.0     A\n203  Rahul   84.0   NaN\n204  Rahul   79.0     B\n\n[STATUS] Execution Completed (Exit Code: 0)",
        plots: []
      }
    ]
  },
{
    id: "exp-5",
    title: "Experiment 5: Data Visualization with Plots & Charts",
    description: "Create informative, publication-grade scientific graphics using Matplotlib and Seaborn: line plots, bar charts, histograms, density curves, scatter plots, and box plots.",
    module: "3",
    experimentNumber: "5",
    subExperiments: [
{
        id: "sub-5a",
        codeNum: "5a",
        title: "5a Visualizing Trends with Line Plots",
        githubUrl: "https://github.com/muddannagarisandyarani/DS/blob/main/program5A.py",
        code: "import pandas as pd\nimport matplotlib.pyplot as plt\nimport seaborn as sns\nurl = \"https://raw.githubusercontent.com/mwaskom/seaborn-data/master/iris.csv\"\ndf = pd.read_csv(url)\nprint(\"First Five Records:\")\nprint(df.head())\nprint(\"\\nDataset Information:\")\nprint(df.info())\nprint(\"\\nStatistical Summary:\")\nprint(df.describe())\nplt.figure(figsize=(8, 5))\nplt.plot(df.index, df[\"sepal_length\"], label=\"Sepal Length\")\nplt.plot(df.index, df[\"petal_length\"], label=\"Petal Length\")\nplt.xlabel(\"Sample Index\")\nplt.ylabel(\"Length\")\nplt.title(\"Sepal Length and Petal Length\")\nplt.legend()\nplt.grid()\nplt.show()\nplt.figure(figsize=(8, 5))\nsns.scatterplot(\n    data=df,\n    x=\"sepal_length\",\n    y=\"petal_length\",\n    hue=\"species\"\n)\nplt.title(\"Sepal Length vs Petal Length\")\nplt.xlabel(\"Sepal Length\")\nplt.ylabel(\"Petal Length\")\nplt.show()\nplt.figure(figsize=(8, 5))\nsns.histplot(\n    data=df,\n    x=\"sepal_length\",\n    hue=\"species\",\n    kde=True\n)\nplt.title(\"Distribution of Sepal Length\")\nplt.xlabel(\"Sepal Length\")\nplt.ylabel(\"Frequency\")\nplt.show()\nplt.figure(figsize=(8, 5))\nsns.boxplot(\n    data=df,\n    x=\"species\",\n    y=\"petal_length\"\n)\nplt.title(\"Petal Length by Species\")\nplt.xlabel(\"Species\")\nplt.ylabel(\"Petal Length\")\nplt.show()\nsns.pairplot(\n    df,\n    hue=\"species\"\n)\nplt.show()",
        outputType: "chart",
        consoleOutput: "First Five Records:\n   sepal_length  sepal_width  petal_length  petal_width species\n0           5.1          3.5           1.4          0.2  setosa\n1           4.9          3.0           1.4          0.2  setosa\n2           4.7          3.2           1.3          0.2  setosa\n3           4.6          3.1           1.5          0.2  setosa\n4           5.0          3.6           1.4          0.2  setosa\n\nDataset Information:\n<class 'pandas.DataFrame'>\nRangeIndex: 150 entries, 0 to 149\nData columns (total 5 columns):\n #   Column        Non-Null Count  Dtype  \n---  ------        --------------  -----  \n 0   sepal_length  150 non-null    float64\n 1   sepal_width   150 non-null    float64\n 2   petal_length  150 non-null    float64\n 3   petal_width   150 non-null    float64\n 4   species       150 non-null    str    \ndtypes: float64(4), str(1)\nmemory usage: 7.2 KB\nNone\n\nStatistical Summary:\n       sepal_length  sepal_width  petal_length  petal_width\ncount    150.000000   150.000000    150.000000   150.000000\nmean       5.843333     3.057333      3.758000     1.199333\nstd        0.828066     0.435866      1.765298     0.762238\nmin        4.300000     2.000000      1.000000     0.100000\n25%        5.100000     2.800000      1.600000     0.300000\n50%        5.800000     3.000000      4.350000     1.300000\n75%        6.400000     3.300000      5.100000     1.800000\nmax        7.900000     4.400000      6.900000     2.500000\n\n[STATUS] Execution Completed (Exit Code: 0)",
        plots: [
          {
            title: "Single Line Plot (Sepal Length)",
            filename: "5a_plot_1.png",
            url: getAssetUrl("plots/5a_plot_1.png")
          },
          {
            title: "Multiple Line Plot (Sepal vs Petal Length)",
            filename: "5a_plot_2.png",
            url: getAssetUrl("plots/5a_plot_2.png")
          },
          {
            title: "Custom Styled Line Plot (Red Dashed)",
            filename: "5a_plot_3.png",
            url: getAssetUrl("plots/5a_plot_3.png")
          },
          {
            title: "Subplots (Sepal & Petal Length Panels)",
            filename: "5a_plot_4.png",
            url: getAssetUrl("plots/5a_plot_4.png")
          },
          {
            title: "Seaborn Multi-Species Line Plot (Hue = Species)",
            filename: "5a_plot_5.png",
            url: getAssetUrl("plots/5a_plot_5.png")
          }
        ]
      },
{
        id: "sub-5b",
        codeNum: "5b",
        title: "5b Comparing Categories with Bar Plots",
        githubUrl: "https://github.com/muddannagarisandyarani/DS/blob/main/program5B.py",
        code: "import pandas as pd\nimport matplotlib.pyplot as plt\ndata = {\n    'Python': [85, 90, 78, 88],\n    'Java': [75, 82, 80, 85],\n    'C++': [80, 76, 85, 90]\n}\ndf = pd.DataFrame(\n    data,\n    index=['Student1', 'Student2', 'Student3', 'Student4']\n)\nprint(\"DataFrame:\")\nprint(df)\ndf.plot(\n    kind='bar',\n    figsize=(8, 5)\n)\nplt.title(\"Student Marks in Different Programming Languages\")\nplt.xlabel(\"Students\")\nplt.ylabel(\"Marks\")\nplt.xticks(rotation=0)\nplt.legend(title=\"Subjects\")\nplt.tight_layout()\nplt.show()",
        outputType: "chart",
        consoleOutput: "DataFrame:\n          Python  Java  C++\nStudent1      85    75   80\nStudent2      90    82   76\nStudent3      78    80   85\nStudent4      88    85   90\n\n[STATUS] Execution Completed (Exit Code: 0)",
        plots: [
          {
            title: "Grouped Bar Chart (Python, Java, C++ Marks by Student)",
            filename: "5b_plot_1.png",
            url: getAssetUrl("plots/5b_plot_1.png")
          }
        ]
      },
{
        id: "sub-5c",
        codeNum: "5c",
        title: "5c Analyzing Data Distribution with Histograms",
        githubUrl: "https://github.com/muddannagarisandyarani/DS/blob/main/progran5C.py",
        code: "import pandas as pd\nimport matplotlib.pyplot as plt\nimport seaborn as sns\ndata = [45, 50, 52, 55, 58, 60, 62, 65, 68, 70,\n        72, 75, 78, 80, 82, 85, 88, 90, 92, 95]\ndf = pd.DataFrame({'Marks': data})\nprint(\"Observed Data:\")\nprint(df)\nplt.figure(figsize=(8, 5))\nsns.histplot(df['Marks'], bins=6, kde=False)\nplt.title(\"Histogram of Marks\")\nplt.xlabel(\"Marks\")\nplt.ylabel(\"Frequency\")\nplt.tight_layout()\nplt.show()\nplt.figure(figsize=(8, 5))\nsns.kdeplot(df['Marks'], fill=True)\nplt.title(\"Density Plot of Marks\")\nplt.xlabel(\"Marks\")\nplt.ylabel(\"Density\")\nplt.tight_layout()\nplt.show()",
        outputType: "chart",
        consoleOutput: "Observed Data:\n    Marks\n0      45\n1      50\n2      52\n3      55\n4      58\n5      60\n6      62\n7      65\n8      68\n9      70\n10     72\n11     75\n12     78\n13     80\n14     82\n15     85\n16     88\n17     90\n18     92\n19     95\n\n[STATUS] Execution Completed (Exit Code: 0)",
        plots: [
          {
            title: "Histogram of Student Marks Distribution (6 Bins)",
            filename: "5c_plot_1.png",
            url: getAssetUrl("plots/5c_plot_1.png")
          },
          {
            title: "Density Plot (Kernel Density Estimate) of Marks",
            filename: "5c_plot_2.png",
            url: getAssetUrl("plots/5c_plot_2.png")
          }
        ]
      },
{
        id: "sub-5d",
        codeNum: "5d",
        title: "5d Exploring Relationships with Scatter Plots",
        githubUrl: "https://github.com/muddannagarisandyarani/DS/blob/main/program5D.py",
        code: "import pandas as pd\nimport matplotlib.pyplot as plt\nstudy_hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\nmarks = [45, 50, 55, 60, 65, 70, 72, 80, 85, 90]\ndf = pd.DataFrame({\n    'Study_Hours': study_hours,\n    'Marks': marks\n})\nprint(\"Data:\")\nprint(df)\nplt.figure(figsize=(8, 5))\nplt.scatter(df['Study_Hours'], df['Marks'])\nplt.title(\"Relationship Between Study Hours and Marks\")\nplt.xlabel(\"Study Hours\")\nplt.ylabel(\"Marks\")\nplt.grid(True)\nplt.tight_layout()\nplt.show()\ncorrelation = df['Study_Hours'].corr(df['Marks'])\nprint(\"\\nCorrelation Coefficient:\", round(correlation, 2))",
        outputType: "chart",
        consoleOutput: "Data:\n   Study_Hours  Marks\n0            1     45\n1            2     50\n2            3     55\n3            4     60\n4            5     65\n5            6     70\n6            7     72\n7            8     80\n8            9     85\n9           10     90\n\nCorrelation Coefficient: 1.0\n\n[STATUS] Execution Completed (Exit Code: 0)",
        plots: [
          {
            title: "Scatter Plot (Study Hours vs Marks) with Correlation",
            filename: "5d_plot_1.png",
            url: getAssetUrl("plots/5d_plot_1.png")
          }
        ]
      },
{
        id: "sub-5e",
        codeNum: "5e",
        title: "5e Analyzing Distributions with Box Plots",
        githubUrl: "https://github.com/muddannagarisandyarani/DS/blob/main/program5e.py",
        code: "import pandas as pd\nimport matplotlib.pyplot as plt\nimport seaborn as sns\ndata = {\n    'Department': [\n        'CSE', 'CSE', 'CSE', 'CSE', 'CSE',\n        'ECE', 'ECE', 'ECE', 'ECE', 'ECE',\n        'EEE', 'EEE', 'EEE', 'EEE', 'EEE'\n    ],\n    'Marks': [\n        78, 85, 90, 72, 88,\n        65, 70, 82, 75, 80,\n        60, 68, 72, 76, 85\n    ]\n}\ndf = pd.DataFrame(data)\nprint(\"Data:\")\nprint(df)\nplt.figure(figsize=(8, 5))\nsns.boxplot(\n    x='Department',\n    y='Marks',\n    data=df\n)\nplt.title(\"Marks Distribution by Department\")\nplt.xlabel(\"Department\")\nplt.ylabel(\"Marks\")\nplt.grid(axis='y', linestyle='--', alpha=0.5)\nplt.tight_layout()\nplt.show()",
        outputType: "chart",
        consoleOutput: "Data:\n   Department  Marks\n0         CSE     78\n1         CSE     85\n2         CSE     90\n3         CSE     72\n4         CSE     88\n5         ECE     65\n6         ECE     70\n7         ECE     82\n8         ECE     75\n9         ECE     80\n10        EEE     60\n11        EEE     68\n12        EEE     72\n13        EEE     76\n14        EEE     85\n\n[STATUS] Execution Completed (Exit Code: 0)",
        plots: [
          {
            title: "Box Plot (Marks Distribution by Department: CSE, ECE, EEE)",
            filename: "5e_plot_1.png",
            url: getAssetUrl("plots/5e_plot_1.png")
          }
        ]
      }
    ]
  },
{
    id: "exp-6",
    title: "Experiment 6: Time Series Analysis & Datetime Operations",
    description: "Parse temporal timestamps with pd.to_datetime, generate continuous DatetimeIndex frequencies with pd.date_range(), and handle time zone conversions.",
    module: "5",
    experimentNumber: "6",
    subExperiments: [
{
        id: "sub-6a",
        codeNum: "6a",
        title: "6a Time Series using Pandas Datetime",
        githubUrl: "https://github.com/muddannagarisandyarani/DS/blob/main/program%206A.py",
        code: "import pandas as pd\ndates = pd.to_datetime([\n    '2026-02-10',\n    '2026-02-11',\n    '2026-02-12',\n    '2026-02-13',\n    '2026-02-14',\n])\ntemperature = [25, 27, 26, 29,31]\ntime_series = pd.Series(\n    temperature,\n    index=dates\n)\nprint(\"Time Series:\")\nprint(time_series)",
        outputType: "console",
        consoleOutput: "Time Series:\n2026-02-10    25\n2026-02-11    27\n2026-02-12    26\n2026-02-13    29\n2026-02-14    31\ndtype: int64\n\n[STATUS] Execution Completed (Exit Code: 0)",
        plots: []
      },
{
        id: "sub-6b",
        codeNum: "6b",
        title: "6b date_range",
        githubUrl: "https://github.com/muddannagarisandyarani/DS/blob/main/program%206B.py",
        code: "import pandas as pd\ndate_index = pd.date_range(\n    start='2026-01-01',\n    periods=7,\n    freq='D'\n)\nprint(\"Generated DatetimeIndex:\")\nprint(date_index)",
        outputType: "console",
        consoleOutput: "Generated DatetimeIndex:\nDatetimeIndex(['2026-01-01', '2026-01-02', '2026-01-03', '2026-01-04',\n               '2026-01-05', '2026-01-06', '2026-01-07'],\n              dtype='datetime64[us]', freq='D')\n\n[STATUS] Execution Completed (Exit Code: 0)",
        plots: []
      },
{
        id: "sub-6c",
        codeNum: "6c",
        title: "6c Time Zone Conversion",
        githubUrl: "https://github.com/muddannagarisandyarani/DS/blob/main/program%206C.py",
        code: "import pandas as pd\nindai_dates = pd.date_range(\n    start='2026-01-01 09:'",
        outputType: "console",
        consoleOutput: "File \"program 6C.py\", line 2\n    indai_dates = pd.date_range(\n                               ^\nSyntaxError: '(' was never closed\n\n[NOTE] Source file on GitHub has an unclosed parenthesis. Click \"Edit Code\" or \"Quick Fix\" to test fixed code.",
        plots: []
      }
    ]
  },
{
    id: "exp-7",
    title: "Experiment 7: Data Aggregation using GroupBy & Exploratory Analysis",
    description: "Aggregate multidimensional metrics with groupby, compute statistical summaries (sum, mean, std) across partitions, and execute end-to-end exploratory analysis.",
    module: "2",
    experimentNumber: "7",
    subExperiments: [
{
        id: "sub-7a",
        codeNum: "7a",
        title: "7a Data Aggregation using GroupBy",
        githubUrl: "https://github.com/muddannagarisandyarani/DS/blob/main/program%207A.py",
        code: "import pandas as pd\ndata = {\n    'Name':['Ravi','Sita','Arun','Priya','Kiran','Anil','Lakshmi','Rahul'],\n    'Department':['CSE','CSE','ECE','ECE','CSE','ECE','CSE','ECE'],\n    'Year':[2,2,3,3,2,3,3,2],\n    'Marks':[85,90,78,88,75,82,95,70]\n}\ndf = pd.DataFrame(data)\nprint(df.groupby('Department')['Marks'].mean())\nprint(df.groupby(['Department','Year'])['Marks'].mean())",
        outputType: "console",
        consoleOutput: "Department\nCSE    86.25\nECE    79.50\nName: Marks, dtype: float64\nDepartment  Year\nCSE         2       83.333333\n            3       95.000000\nECE         2       70.000000\n            3       82.666667\nName: Marks, dtype: float64\n\n[STATUS] Execution Completed (Exit Code: 0)",
        plots: []
      },
{
        id: "sub-7b",
        codeNum: "7b",
        title: "7b Aggregate Functions",
        githubUrl: "https://github.com/muddannagarisandyarani/DS/blob/main/program%207B.py",
        code: "import pandas as pd\ndata = {\n    'Department':['CSE','CSE','CSE','ECE','ECE','ECE','EEE','EEE','EEE'],\n    'Marks':[80,75,85,70,65,75,90,85,95],\n    'Attendance':[90,85,95,80,75,85,95,90,100]\n}\ndf = pd.DataFrame(data)\nresult = df.groupby('Department').aggregate({\n    'Marks':['sum','mean','std'],\n    'Attendance':['sum','mean','std']\n})\nprint(result)",
        outputType: "console",
        consoleOutput: "Marks            Attendance           \n             sum  mean  std        sum  mean  std\nDepartment                                       \nCSE          240  80.0  5.0        270  90.0  5.0\nECE          210  70.0  5.0        240  80.0  5.0\nEEE          270  90.0  5.0        285  95.0  5.0\n\n[STATUS] Execution Completed (Exit Code: 0)",
        plots: []
      },
{
        id: "sub-7c",
        codeNum: "7c",
        title: "7c Exploratory Data Analysis",
        githubUrl: "https://github.com/muddannagarisandyarani/DS/blob/main/program%207C.py",
        code: "import pandas as pd\nurl = \"https://raw.githubusercontent.com/mwaskom/seaborn-data/master/iris.csv\"\ndf = pd.read_csv(url)\nprint(df.head())\nprint(df.describe())\nprint(df.groupby('species')['sepal_length'].agg(\n    ['count','sum','mean','std','min','max']\n))\nprint(df.groupby(['species','sepal_width'])['sepal_length'].mean())\nprint(df.groupby('species').agg({\n    'sepal_length':['mean','std','min','max'],\n    'sepal_width':['mean','std','min','max'],\n    'petal_length':['mean','std','min','max'],\n    'petal_width':['mean','std','min','max']\n}))\nprint(df['species'].value_counts())\nprint(df.groupby('species')['petal_length'].mean())\nprint(df.groupby('species')['petal_width'].mean())\nprint(df.groupby('species')['sepal_length'].max())",
        outputType: "console",
        consoleOutput: "sepal_length  sepal_width  petal_length  petal_width species\n0           5.1          3.5           1.4          0.2  setosa\n1           4.9          3.0           1.4          0.2  setosa\n2           4.7          3.2           1.3          0.2  setosa\n3           4.6          3.1           1.5          0.2  setosa\n4           5.0          3.6           1.4          0.2  setosa\n       sepal_length  sepal_width  petal_length  petal_width\ncount    150.000000   150.000000    150.000000   150.000000\nmean       5.843333     3.057333      3.758000     1.199333\nstd        0.828066     0.435866      1.765298     0.762238\nmin        4.300000     2.000000      1.000000     0.100000\n25%        5.100000     2.800000      1.600000     0.300000\n50%        5.800000     3.000000      4.350000     1.300000\n75%        6.400000     3.300000      5.100000     1.800000\nmax        7.900000     4.400000      6.900000     2.500000\n            count    sum   mean       std  min  max\nspecies                                            \nsetosa         50  250.3  5.006  0.352490  4.3  5.8\nversicolor     50  296.8  5.936  0.516171  4.9  7.0\nvirginica      50  329.4  6.588  0.635880  4.9  7.9\nspecies     sepal_width\nsetosa      2.3            4.500000\n            2.9            4.400000\n            3.0            4.700000\n            3.1            4.800000\n            3.2            4.680000\n            3.3            5.050000\n            3.4            5.033333\n            3.5            5.150000\n            3.6            4.833333\n            3.7            5.266667\n            3.8            5.250000\n            3.9            5.400000\n            4.0            5.800000\n            4.1            5.200000\n            4.2            5.500000\n            4.4            5.700000\nversicolor  2.0            5.000000\n            2.2            6.100000\n            2.3            5.600000\n            2.4            5.300000\n            2.5            5.625000\n            2.6            5.666667\n            2.7            5.680000\n            2.8            6.150000\n            2.9            6.085714\n            3.0            5.950000\n            3.1            6.766667\n            3.2            6.433333\n            3.3            6.300000\n            3.4            6.000000\nvirginica   2.2            6.000000\n            2.5            5.900000\n            2.6            6.900000\n            2.7            6.075000\n            2.8            6.475000\n            2.9            6.800000\n            3.0            6.716667\n            3.1            6.725000\n            3.2            6.760000\n            3.3            6.566667\n            3.4            6.250000\n            3.6            7.200000\n            3.8            7.800000\nName: sepal_length, dtype: float64\n           sepal_length                      ... petal_width                    \n                   mean       std  min  max  ...        mean       std  min  max\nspecies                                      ...                                \nsetosa            5.006  0.352490  4.3  5.8  ...       0.246  0.105386  0.1  0.6\nversicolor        5.936  0.516171  4.9  7.0  ...       1.326  0.197753  1.0  1.8\nvirginica         6.588  0.635880  4.9  7.9  ...       2.026  0.274650  1.4  2.5\n\n[3 rows x 16 columns]\nspecies\nsetosa        50\nversicolor    50\nvirginica     50\nName: count, dtype: int64\nspecies\nsetosa        1.462\nversicolor    4.260\nvirginica     5.552\nName: petal_length, dtype: float64\nspecies\nsetosa        0.246\nversicolor    1.326\nvirginica     2.026\nName: petal_width, dtype: float64\nspecies\nsetosa        5.8\nversicolor    7.0\nvirginica     7.9\nName: sepal_length, dtype: float64\n\n[STATUS] Execution Completed (Exit Code: 0)",
        plots: []
      }
    ]
  }
];
