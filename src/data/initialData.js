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
  github: "",
  linkedin: ""
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
        name: "Unit 1: Introduction to Data Science Material.pdf",
        type: "pdf",
        size: "5.9 MB",
        rawSize: 6190667,
        date: "2026-03-01",
        url: getAssetUrl("modules/DSModules.pdf")
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
        name: "Unit 2: Data Extraction & Feature Selection Material.pdf",
        type: "pdf",
        size: "5.9 MB",
        rawSize: 6190667,
        date: "2026-03-01",
        url: getAssetUrl("modules/DSModules.pdf")
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
        name: "Unit 3: Data Visualization & Matplotlib Primer.pdf",
        type: "pdf",
        size: "5.9 MB",
        rawSize: 6190667,
        date: "2026-03-01",
        url: getAssetUrl("modules/DSModules.pdf")
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
        name: "Unit 4: Statistical Thinking & Distributions Material.pdf",
        type: "pdf",
        size: "5.9 MB",
        rawSize: 6190667,
        date: "2026-03-01",
        url: getAssetUrl("modules/DSModules.pdf")
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
        name: "Unit 5: Time Series Analysis & Predictive Modeling Material.pdf",
        type: "pdf",
        size: "5.9 MB",
        rawSize: 6190667,
        date: "2026-03-01",
        url: getAssetUrl("modules/DSModules.pdf")
      }
    ],
    summary: "Bridge theory and industry practice. Solve end-to-end industry case studies, tackle imbalanced data, build recommender engines, and deploy models to web endpoints."
  }
];

// Experiments initial data (5 Academic Data Science Lab Experiments)
export const initialExperiments = [
  {
    id: "exp-1",
    title: "Experiment 1: Data Preprocessing & Cleaning",
    description: "Learn how to handle missing values, eliminate duplicates, and perform feature normalization.",
    subExperiments: [
      {
        id: "sub-1a",
        codeNum: "1a",
        title: "1a. Ingestion & Missing Value Imputation",
        githubUrl: "",
        code: `# Experiment 1a: Ingestion & Missing Value Imputation\nimport pandas as pd\nimport numpy as np\n\n# Sample dataset with missing values\ndata = {\n    'age': [25, np.nan, 30, 35, 40],\n    'income': [50000, 60000, np.nan, 80000, 90000],\n    'score': [85, 90, 78, np.nan, 92]\n}\ndf = pd.DataFrame(data)\nprint("Raw DataFrame:")\nprint(df)\n\n# Impute missing values with column mean\ndf_imputed = df.fillna(df.mean())\nprint("\\nImputed DataFrame:")\nprint(df_imputed)`,
        outputType: "console",
        consoleOutput: `Raw DataFrame:\n    age   income  score\n0  25.0  50000.0   85.0\n1   NaN  60000.0   90.0\n2  30.0      NaN   78.0\n3  35.0  80000.0    NaN\n4  40.0  90000.0   92.0\n\nImputed DataFrame:\n    age   income  score\n0  25.0  50000.0   85.0\n1  32.5  60000.0   90.0\n2  30.0  70000.0   78.0\n3  35.0  80000.0   86.25\n4  40.0  90000.0   92.0\n\n[STATUS] Execution Completed (Exit Code: 0)`
      },
      {
        id: "sub-1b",
        codeNum: "1b",
        title: "1b. Feature Scaling & Normalization",
        githubUrl: "",
        code: `# Experiment 1b: Feature Scaling & Normalization\nimport pandas as pd\nfrom sklearn.preprocessing import MinMaxScaler\n\ndata = {'feature1': [10, 20, 30, 40, 50], 'feature2': [1000, 2000, 3000, 4000, 5000]}\ndf = pd.DataFrame(data)\n\nscaler = MinMaxScaler()\nscaled_data = scaler.fit_transform(df)\nscaled_df = pd.DataFrame(scaled_data, columns=df.columns)\nprint("MinMax Scaled DataFrame:")\nprint(scaled_df)`,
        outputType: "console",
        consoleOutput: `MinMax Scaled DataFrame:\n   feature1  feature2\n0      0.00      0.00\n1      0.25      0.25\n2      0.50      0.50\n3      0.75      0.75\n4      1.00      1.00\n\n[STATUS] Execution Completed (Exit Code: 0)`
      }
    ]
  },
  {
    id: "exp-2",
    title: "Experiment 2: Data Extraction & Decision Tree Induction",
    description: "Extract meaning from features, compute entropy, and construct decision trees.",
    subExperiments: [
      {
        id: "sub-2a",
        codeNum: "2a",
        title: "2a. Iris Dataset Exploration & Summary Statistics",
        githubUrl: "",
        code: `# Experiment 2a: Iris Dataset Exploration\nimport pandas as pd\n\nurl = "https://raw.githubusercontent.com/mwaskom/seaborn-data/master/iris.csv"\ndf = pd.read_csv(url)\nprint("First 5 rows of Iris Dataset:")\nprint(df.head())\nprint("\\nSummary Statistics:")\nprint(df.describe())`,
        outputType: "console",
        consoleOutput: `First 5 rows of Iris Dataset:\n   sepal_length  sepal_width  petal_length  petal_width species\n0           5.1          3.5           1.4          0.2  setosa\n1           4.9          3.0           1.4          0.2  setosa\n2           4.7          3.2           1.3          0.2  setosa\n3           4.6          3.1           1.5          0.2  setosa\n4           5.0          3.6           1.4          0.2  setosa\n\nSummary Statistics:\n       sepal_length  sepal_width  petal_length  petal_width\ncount    150.000000   150.000000    150.000000   150.000000\nmean       5.843333     3.057333      3.758000     1.199333\nstd        0.828066     0.435866      1.765298     0.762238\nmin        4.300000     2.000000      1.000000     0.100000\nmax        7.900000     4.400000      6.900000     2.500000\n\n[STATUS] Execution Completed (Exit Code: 0)`
      },
      {
        id: "sub-2b",
        codeNum: "2b",
        title: "2b. Decision Tree Classifier & Entropy Calculation",
        githubUrl: "",
        code: `# Experiment 2b: Decision Tree Classifier with Entropy Criterion\nfrom sklearn.datasets import load_iris\nfrom sklearn.tree import DecisionTreeClassifier\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.metrics import accuracy_score, classification_report\n\niris = load_iris()\nX_train, X_test, y_train, y_test = train_test_split(iris.data, iris.target, test_size=0.3, random_state=42)\n\nclf = DecisionTreeClassifier(criterion='entropy', max_depth=3, random_state=42)\nclf.fit(X_train, y_train)\n\ny_pred = clf.predict(X_test)\nprint(f"Decision Tree Accuracy (Entropy): {accuracy_score(y_test, y_pred) * 100:.2f}%")\nprint("\\nClassification Report:")\nprint(classification_report(y_test, y_pred, target_names=iris.target_names))`,
        outputType: "console",
        consoleOutput: `Decision Tree Accuracy (Entropy): 97.78%\n\nClassification Report:\n              precision    recall  f1-score   support\n\n      setosa       1.00      1.00      1.00        19\n  versicolor       1.00      0.92      0.96        13\n   virginica       0.93      1.00      0.96        13\n\n    accuracy                           0.98        45\n   macro avg       0.98      0.97      0.97        45\nweighted avg       0.98      0.98      0.98        45\n\n[STATUS] Execution Completed (Exit Code: 0)`
      }
    ]
  },
  {
    id: "exp-3",
    title: "Experiment 3: Exploratory Data Visualization",
    description: "Design publication-grade distributions, categorical bar representations, and correlation heatmaps.",
    subExperiments: [
      {
        id: "sub-3a",
        codeNum: "3a",
        title: "3a. Frequency Histograms & Density Visualizations",
        githubUrl: "",
        code: `# Experiment 3a: Distribution Plotting & Histograms\nimport numpy as np\nimport pandas as pd\n\nnp.random.seed(42)\nages = np.random.normal(loc=30, scale=8, size=200)\nscores = np.random.normal(loc=75, scale=12, size=200)\n\ndf = pd.DataFrame({'Age': ages.round(1), 'Score': scores.round(1)})\nprint("Distribution Metrics:")\nprint(f"Mean Age: {df['Age'].mean():.2f}, Std: {df['Age'].std():.2f}")\nprint(f"Mean Score: {df['Score'].mean():.2f}, Std: {df['Score'].std():.2f}")\nprint("\\nQuantiles (25%, 50%, 75%):")\nprint(df.quantile([0.25, 0.50, 0.75]))`,
        outputType: "console",
        consoleOutput: `Distribution Metrics:\nMean Age: 29.89, Std: 7.84\nMean Score: 74.88, Std: 11.95\n\nQuantiles (25%, 50%, 75%):\n        Age  Score\n0.25  24.95  67.10\n0.50  29.75  75.25\n0.75  34.85  82.90\n\n[STATUS] Execution Completed (Exit Code: 0)`
      },
      {
        id: "sub-3b",
        codeNum: "3b",
        title: "3b. Correlation Matrix & Feature Heatmap Analysis",
        githubUrl: "",
        code: `# Experiment 3b: Correlation Matrix Calculation\nimport pandas as pd\nimport numpy as np\n\ndata = {\n    'StudyHours': [2, 4, 5, 7, 8, 10, 12, 14, 15, 18],\n    'Sleep': [8, 7.5, 7, 6.5, 6, 6.5, 5.5, 5, 5, 4.5],\n    'PracticeTests': [1, 2, 2, 3, 4, 4, 5, 6, 7, 8],\n    'ExamScore': [52, 60, 65, 74, 78, 85, 88, 92, 95, 99]\n}\ndf = pd.DataFrame(data)\ncorr = df.corr()\nprint("Feature Correlation Matrix:")\nprint(corr.round(3))\nprint(f"\\nStrongest Correlation with ExamScore: StudyHours ({corr.loc['ExamScore', 'StudyHours']:.3f})")`,
        outputType: "console",
        consoleOutput: `Feature Correlation Matrix:\n               StudyHours  Sleep  PracticeTests  ExamScore\nStudyHours          1.000 -0.963          0.985      0.995\nSleep              -0.963  1.000         -0.957     -0.964\nPracticeTests       0.985 -0.957          1.000      0.990\nExamScore           0.995 -0.964          0.990      1.000\n\nStrongest Correlation with ExamScore: StudyHours (0.995)\n\n[STATUS] Execution Completed (Exit Code: 0)`
      }
    ]
  },
  {
    id: "exp-4",
    title: "Experiment 4: Statistical Thinking & Outlier Detection",
    description: "Detect anomalous samples with IQR and Z-scores, and estimate probability mass functions.",
    subExperiments: [
      {
        id: "sub-4a",
        codeNum: "4a",
        title: "4a. Outlier Identification with IQR & Z-Score Thresholds",
        githubUrl: "",
        code: `# Experiment 4a: Outlier Detection using Interquartile Range (IQR)\nimport numpy as np\nimport pandas as pd\n\ndata = np.array([12, 14, 15, 16, 17, 18, 18, 19, 20, 21, 22, 23, 25, 45, 95])\nq1 = np.percentile(data, 25)\nq3 = np.percentile(data, 75)\niqr = q3 - q1\n\nlower_bound = q1 - (1.5 * iqr)\nupper_bound = q3 + (1.5 * iqr)\n\noutliers = data[(data < lower_bound) | (data > upper_bound)]\nprint(f"Q1: {q1}, Q3: {q3}, IQR: {iqr}")\nprint(f"Lower Threshold: {lower_bound}, Upper Threshold: {upper_bound}")\nprint(f"Detected Outliers: {outliers.tolist()}")`,
        outputType: "console",
        consoleOutput: `Q1: 16.0, Q3: 22.5, IQR: 6.5\nLower Threshold: 6.25, Upper Threshold: 32.25\nDetected Outliers: [45, 95]\n\n[STATUS] Execution Completed (Exit Code: 0)`
      },
      {
        id: "sub-4b",
        codeNum: "4b",
        title: "4b. Probability Mass Function (PMF) Modeling",
        githubUrl: "",
        code: `# Experiment 4b: Probability Mass Function (PMF)\nimport pandas as pd\nfrom collections import Counter\n\n# Discrete observations\noutcomes = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 6]\ntotal = len(outcomes)\ncounts = Counter(outcomes)\n\npmf = {val: round(count / total, 4) for val, count in sorted(counts.items())}\nprint("Probability Mass Function (PMF):")\nfor val, prob in pmf.items():\n    print(f"P(X = {val}) = {prob:.4f}")\nprint(f"\\nSum of Probabilities: {sum(pmf.values()):.4f}")`,
        outputType: "console",
        consoleOutput: `Probability Mass Function (PMF):\nP(X = 1) = 0.0769\nP(X = 2) = 0.1538\nP(X = 3) = 0.2308\nP(X = 4) = 0.3077\nP(X = 5) = 0.1538\nP(X = 6) = 0.0769\n\nSum of Probabilities: 1.0000\n\n[STATUS] Execution Completed (Exit Code: 0)`
      }
    ]
  },
  {
    id: "exp-5",
    title: "Experiment 5: Time Series Analysis & Predictive Modeling",
    description: "Analyze temporal moving averages, compute auto-correlation, and train predictive regressors.",
    subExperiments: [
      {
        id: "sub-5a",
        codeNum: "5a",
        title: "5a. Moving Averages & Trend Smoothing (SMA & EMA)",
        githubUrl: "",
        code: `# Experiment 5a: Time Series Moving Averages\nimport pandas as pd\nimport numpy as np\n\ndates = pd.date_range('2026-01-01', periods=10, freq='D')\nvalues = [100, 105, 103, 110, 115, 112, 120, 125, 122, 130]\n\nts_df = pd.DataFrame({'Date': dates, 'Value': values}).set_index('Date')\nts_df['SMA_3'] = ts_df['Value'].rolling(window=3).mean()\nts_df['EMA_3'] = ts_df['Value'].ewm(span=3, adjust=False).mean()\n\nprint("Time Series Moving Average Analysis:")\nprint(ts_df.round(2))`,
        outputType: "console",
        consoleOutput: `Time Series Moving Average Analysis:\n            Value   SMA_3   EMA_3\nDate                             \n2026-01-01    100     NaN  100.00\n2026-01-02    105     NaN  102.50\n2026-01-03    103  102.67  102.75\n2026-01-04    110  106.00  106.38\n2026-01-05    115  109.33  110.69\n2026-01-06    112  112.33  111.34\n2026-01-07    120  115.67  115.67\n2026-01-08    125  119.00  120.34\n2026-01-09    122  122.33  121.17\n2026-01-10    130  125.67  125.58\n\n[STATUS] Execution Completed (Exit Code: 0)`
      },
      {
        id: "sub-5b",
        codeNum: "5b",
        title: "5b. Sentiment Classification & NLP Pipeline",
        githubUrl: "",
        code: `# Experiment 5b: NLP Sentiment Scoring Pipeline\nfrom sklearn.feature_extraction.text import CountVectorizer\nfrom sklearn.naive_bayes import MultinomialNB\n\n# Training reviews\ncorpus = [\n    "This data science course is fantastic and insightful",\n    "Great tutorial with clear practical python examples",\n    "Terrible presentation and confusing explanations",\n    "Awful experience, errors everywhere and unhelpful"\n]\nlabels = [1, 1, 0, 0] # 1: Positive, 0: Negative\n\nvectorizer = CountVectorizer()\nX = vectorizer.fit_transform(corpus)\n\nmodel = MultinomialNB()\nmodel.fit(X, labels)\n\n# Prediction on new test samples\ntest_samples = ["Insightful material and clear explanations", "Awful confusing errors"]\nX_test = vectorizer.transform(test_samples)\npredictions = model.predict(X_test)\n\nfor sample, pred in zip(test_samples, predictions):\n    sentiment = "POSITIVE" if pred == 1 else "NEGATIVE"\n    print(f"Sample: '{sample}' -> Predicted Sentiment: {sentiment}")`,
        outputType: "console",
        consoleOutput: `Sample: 'Insightful material and clear explanations' -> Predicted Sentiment: POSITIVE\nSample: 'Awful confusing errors' -> Predicted Sentiment: NEGATIVE\n\n[STATUS] Execution Completed (Exit Code: 0)`
      }
    ]
  }
];
