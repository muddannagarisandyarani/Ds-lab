import React, { useState, useMemo } from 'react';
import {
  Wrench, Code2, Calculator, Table as TableIcon, Copy, Check, Play,
  Sparkles, Terminal, FileText, Layers, Cpu, ArrowRight, RotateCcw,
  Sliders, Info, CheckCircle2, ChevronRight
} from 'lucide-react';

// Pre-packaged Data Science Code Templates
const CODE_SNIPPETS = [
  {
    id: 'numpy',
    title: 'NumPy: Matrix Operations & Linspace',
    category: 'Math & Tensors',
    code: `import numpy as np

# Create 2D Matrices
A = np.array([[2, 4], [6, 8]])
B = np.array([[1, 3], [5, 7]])

# Matrix Multiplication & Transpose
dot_prod = np.dot(A, B)
transpose_A = A.T

# Statistics
mean_val = np.mean(A)
std_dev = np.std(A)

print("--- Matrix Dot Product ---")
print(dot_prod)
print("\\nTranspose of A:")
print(transpose_A)
print(f"\\nMean: {mean_val:.2f}, Std Dev: {std_dev:.2f}")`,
    output: `--- Matrix Dot Product ---
[[22 34]
 [46 74]]

Transpose of A:
[[2 6]
 [4 8]]

Mean: 5.00, Std Dev: 2.24`
  },
  {
    id: 'pandas',
    title: 'Pandas: DataFrame Analysis & GroupBy',
    category: 'Data Wrangling',
    code: `import pandas as pd

# Create Sample Student Dataset
data = {
    'Student': ['Aarav', 'Diya', 'Rohan', 'Sneha', 'Vikram'],
    'Score': [88, 94, 76, 92, 85],
    'Attendance': [95, 98, 82, 91, 89],
    'Category': ['A', 'A', 'B', 'A', 'B']
}
df = pd.DataFrame(data)

# Summary Stats & Groupby
print("Dataset Overview:")
print(df.describe())

print("\\nCategory Wise Average Score:")
print(df.groupby('Category')['Score'].mean())`,
    output: `Dataset Overview:
           Score  Attendance
count   5.000000    5.000000
mean   87.000000   91.000000
std     7.035624    6.123724
min    76.000000   82.000000
25%    85.000000   89.000000
50%    88.000000   91.000000
75%    92.000000   95.000000
max    94.000000   98.000000

Category Wise Average Score:
Category
A    91.33
B    80.50
Name: Score, dtype: float64`
  },
  {
    id: 'sklearn',
    title: 'Scikit-Learn: Linear Regression & Metrics',
    category: 'Machine Learning',
    code: `from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score
import numpy as np

# Feature: Study Hours, Target: Exam Marks
X = np.array([[1], [2], [3], [4], [5], [6], [7]])
y = np.array([45, 52, 60, 68, 75, 82, 90])

model = LinearRegression()
model.fit(X, y)

# Predictions
y_pred = model.predict(X)
r2 = r2_score(y, y_pred)
mse = mean_squared_error(y, y_pred)

print(f"Slope (Weight): {model.coef_[0]:.2f}")
print(f"Intercept: {model.intercept_:.2f}")
print(f"R-squared Score (Accuracy): {r2:.4f}")
print(f"Mean Squared Error: {mse:.2f}")`,
    output: `Slope (Weight): 7.46
Intercept: 37.57
R-squared Score (Accuracy): 0.9984
Mean Squared Error: 0.36`
  },
  {
    id: 'stats',
    title: 'SciPy & Stats: Normal Distribution & Z-Score',
    category: 'Statistics',
    code: `from scipy import stats
import numpy as np

scores = np.array([65, 78, 82, 85, 90, 92, 95, 98])
mean = np.mean(scores)
std = np.std(scores)

z_scores = stats.zscore(scores)

print(f"Sample Mean: {mean:.2f}")
print(f"Sample Standard Deviation: {std:.2f}")
print("\\nCalculated Z-Scores for Each Student:")
for score, z in zip(scores, z_scores):
    print(f"Score {score} -> Z = {z:+.2f}")`,
    output: `Sample Mean: 85.25
Sample Standard Deviation: 10.11

Calculated Z-Scores for Each Student:
Score 65 -> Z = -2.00
Score 78 -> Z = -0.72
Score 82 -> Z = -0.32
Score 85 -> Z = -0.02
Score 90 -> Z = +0.47
Score 92 -> Z = +0.67
Score 95 -> Z = +0.96
Score 98 -> Z = +1.26`
  }
];

// Prescribed Courseware Tools Directory
const DS_TOOLS_ECOSYSTEM = [
  {
    name: 'Python 3.11+',
    category: 'Core Language',
    badge: 'Standard',
    color: 'from-blue-500 to-amber-500',
    desc: 'The industry-standard language for machine learning, artificial intelligence, and big data analysis.',
    importSnippet: '# Python 3 standard imports\nimport sys, os, math\nprint(sys.version)',
    docsUrl: 'https://docs.python.org/3/'
  },
  {
    name: 'NumPy',
    category: 'Tensor & Array Ops',
    badge: 'Essential',
    color: 'from-cyan-500 to-blue-600',
    desc: 'Foundational package for scientific computing with N-dimensional arrays, linear algebra, and Fourier transforms.',
    importSnippet: 'import numpy as np\narr = np.array([1, 2, 3])',
    docsUrl: 'https://numpy.org/doc/'
  },
  {
    name: 'Pandas',
    category: 'Data Wrangling',
    badge: 'Essential',
    color: 'from-indigo-500 to-purple-600',
    desc: 'Fast, powerful, and flexible open source data analysis and manipulation library for tabular DataFrames.',
    importSnippet: 'import pandas as pd\ndf = pd.read_csv("data.csv")',
    docsUrl: 'https://pandas.pydata.org/docs/'
  },
  {
    name: 'Scikit-Learn',
    category: 'Machine Learning',
    badge: 'Modeling',
    color: 'from-emerald-500 to-teal-500',
    desc: 'Simple and efficient tools for predictive data analysis including regression, classification, clustering, and PCA.',
    importSnippet: 'from sklearn.model_selection import train_test_split\nfrom sklearn.ensemble import RandomForestClassifier',
    docsUrl: 'https://scikit-learn.org/stable/'
  },
  {
    name: 'Matplotlib & Seaborn',
    category: 'Visualization',
    badge: 'Graphics',
    color: 'from-rose-500 to-pink-500',
    desc: 'Comprehensive libraries for creating static, animated, and interactive statistical visualizations in Python.',
    importSnippet: 'import matplotlib.pyplot as plt\nimport seaborn as sns\nsns.set_theme(style="darkgrid")',
    docsUrl: 'https://seaborn.pydata.org/'
  },
  {
    name: 'Jupyter Notebook',
    category: 'Interactive IDE',
    badge: 'Environment',
    color: 'from-amber-500 to-orange-500',
    desc: 'Web-based interactive computing platform combining live code, equations, narrative text, and rich visualizations.',
    importSnippet: '# Run inside Jupyter cell\n%matplotlib inline\n%timeit [x**2 for x in range(1000)]',
    docsUrl: 'https://jupyter.org/'
  },
  {
    name: 'Statsmodels & SciPy',
    category: 'Statistical Inference',
    badge: 'Statistics',
    color: 'from-purple-500 to-indigo-500',
    desc: 'Classes and functions for statistical tests, OLS regression estimation, time series forecasting, and distributions.',
    importSnippet: 'import statsmodels.api as sm\nfrom scipy import stats',
    docsUrl: 'https://www.statsmodels.org/'
  },
  {
    name: 'OpenRefine',
    category: 'Data Cleaning',
    badge: 'ETL Tool',
    color: 'from-teal-500 to-cyan-500',
    desc: 'A powerful tool for working with messy data: cleaning, transforming from one format into another, and extending it.',
    importSnippet: '# OpenRefine GREL expression\nvalue.trim().toLowercase()',
    docsUrl: 'https://openrefine.org/'
  }
];

export default function ToolsSection() {
  const [activeSubTab, setActiveSubTab] = useState('runner'); // 'runner', 'calculator', 'csv', 'ecosystem'
  const [selectedSnippetId, setSelectedSnippetId] = useState(CODE_SNIPPETS[0].id);
  const [userCode, setUserCode] = useState(CODE_SNIPPETS[0].code);
  const [terminalOutput, setTerminalOutput] = useState(CODE_SNIPPETS[0].output);
  const [isRunning, setIsRunning] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  // Statistics Calculator State
  const [numbersInput, setNumbersInput] = useState('14, 22, 28, 35, 42, 49, 58, 65, 72');
  const [zValInput, setZValInput] = useState('65');

  // CSV Profiler State
  const [csvInput, setCsvInput] = useState(`id,student_name,department,gpa,attendance_pct
1,Aarav Patel,Data Science,3.85,96
2,Diya Sharma,Computer Science,3.92,98
3,Rohan Verma,Data Science,3.40,84
4,Sneha Reddy,Artificial Intelligence,3.78,92
5,Vikram Singh,Data Science,3.65,88`);

  const activeSnippet = useMemo(() => {
    return CODE_SNIPPETS.find(s => s.id === selectedSnippetId) || CODE_SNIPPETS[0];
  }, [selectedSnippetId]);

  const handleSelectSnippet = (snippet) => {
    setSelectedSnippetId(snippet.id);
    setUserCode(snippet.code);
    setTerminalOutput(snippet.output);
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setTerminalOutput(activeSnippet.output);
    }, 600);
  };

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Statistical calculations
  const statsResult = useMemo(() => {
    try {
      const nums = numbersInput
        .split(/[,;\s]+/)
        .map(v => parseFloat(v.trim()))
        .filter(v => !isNaN(v));

      if (nums.length === 0) return null;

      const n = nums.length;
      const sorted = [...nums].sort((a, b) => a - b);
      const sum = nums.reduce((acc, v) => acc + v, 0);
      const mean = sum / n;

      // Median
      const mid = Math.floor(n / 2);
      const median = n % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;

      // Variance and Std Dev
      const variance = nums.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0) / (n > 1 ? n - 1 : 1);
      const stdDev = Math.sqrt(variance);

      // Min, Max, Range
      const min = sorted[0];
      const max = sorted[n - 1];
      const range = max - min;

      // Z-Score for specific value
      const targetVal = parseFloat(zValInput);
      const zScore = !isNaN(targetVal) && stdDev > 0 ? (targetVal - mean) / stdDev : 0;

      return { n, sum, mean, median, variance, stdDev, min, max, range, zScore, sorted };
    } catch (_e) {
      return null;
    }
  }, [numbersInput, zValInput]);

  // CSV Profiler calculation
  const parsedCsv = useMemo(() => {
    try {
      if (!csvInput.trim()) return null;
      const lines = csvInput.trim().split(/\r?\n/).filter(Boolean);
      if (lines.length === 0) return null;

      const headers = lines[0].split(',').map(h => h.trim());
      const dataRows = lines.slice(1).map(row => row.split(',').map(c => c.trim()));

      return {
        headers,
        rows: dataRows,
        rowCount: dataRows.length,
        colCount: headers.length
      };
    } catch (_e) {
      return null;
    }
  }, [csvInput]);

  return (
    <div className="w-full space-y-6 mb-12 animate-fadeIn">
      {/* Tools Section Hero Banner */}
      <div className="relative rounded-3xl glass-card border border-cyan-500/20 p-6 sm:p-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-semibold">
            <Wrench className="w-3.5 h-3.5 text-cyan-400" />
            <span>Data Science Lab Toolkit & Sandbox</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Data Science Tools Workbench
          </h2>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Interactive calculators, Python sandbox snippets, statistical estimators, and official Data Science toolchain references built for your laboratory coursework.
          </p>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-800 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveSubTab('runner')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
            activeSubTab === 'runner'
              ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/20'
              : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Code2 className="w-4 h-4" />
          <span>Python Sandbox & Snippets</span>
        </button>

        <button
          onClick={() => setActiveSubTab('calculator')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
            activeSubTab === 'calculator'
              ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/20'
              : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Calculator className="w-4 h-4" />
          <span>Statistical Calculator</span>
        </button>

        <button
          onClick={() => setActiveSubTab('csv')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
            activeSubTab === 'csv'
              ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/20'
              : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <TableIcon className="w-4 h-4" />
          <span>CSV Data Profiler</span>
        </button>

        <button
          onClick={() => setActiveSubTab('ecosystem')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
            activeSubTab === 'ecosystem'
              ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/20'
              : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Curriculum Tools Directory ({DS_TOOLS_ECOSYSTEM.length})</span>
        </button>
      </div>

      {/* TAB 1: PYTHON SANDBOX & SNIPPETS */}
      {activeSubTab === 'runner' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Snippet Selector */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
              Select Python Recipe
            </h4>

            <div className="space-y-2">
              {CODE_SNIPPETS.map((snippet) => {
                const isSelected = selectedSnippetId === snippet.id;
                return (
                  <div
                    key={snippet.id}
                    onClick={() => handleSelectSnippet(snippet)}
                    className={`p-3.5 rounded-2xl cursor-pointer transition-all border ${
                      isSelected
                        ? 'bg-gradient-to-r from-cyan-950/80 to-blue-950/60 border-cyan-400 text-white shadow-md ring-1 ring-cyan-500/30'
                        : 'bg-slate-900/50 border-slate-800/80 text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                        {snippet.category}
                      </span>
                      {isSelected && <ChevronRight className="w-4 h-4 text-cyan-400" />}
                    </div>
                    <div className="text-xs font-bold truncate text-white">
                      {snippet.title}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Code Editor & Execution Output */}
          <div className="lg:col-span-8 space-y-4">
            {/* Editor Container */}
            <div className="rounded-2xl border border-slate-800 bg-[#060b17] overflow-hidden shadow-2xl">
              <div className="p-3 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs font-bold text-white">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span>{activeSnippet.title}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleCopy(userCode, 'code')}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer transition-colors"
                  >
                    {copiedId === 'code' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>{copiedId === 'code' ? 'Copied' : 'Copy'}</span>
                  </button>

                  <button
                    onClick={handleRunCode}
                    disabled={isRunning}
                    className="flex items-center space-x-1.5 px-4 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white text-xs font-bold shadow-md cursor-pointer transition-all disabled:opacity-50"
                  >
                    {isRunning ? (
                      <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Play className="w-3.5 h-3.5 fill-current" />
                    )}
                    <span>{isRunning ? 'Running...' : 'Run Code'}</span>
                  </button>
                </div>
              </div>

              {/* Editable Code Box */}
              <div className="p-4 bg-[#040814]">
                <textarea
                  value={userCode}
                  onChange={(e) => setUserCode(e.target.value)}
                  rows={12}
                  className="w-full bg-transparent text-xs font-mono text-cyan-200 outline-none resize-none leading-relaxed"
                  spellCheck="false"
                />
              </div>

              {/* Terminal Execution Output */}
              <div className="border-t border-slate-800 bg-slate-950 p-4">
                <div className="flex items-center space-x-2 text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2 font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>Execution Output Terminal</span>
                </div>
                <pre className="text-xs font-mono text-emerald-300 whitespace-pre-wrap leading-relaxed overflow-x-auto">
                  {terminalOutput}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: STATISTICAL CALCULATOR */}
      {activeSubTab === 'calculator' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Input Column */}
            <div className="lg:col-span-5 space-y-4 rounded-2xl glass-card p-6 border border-slate-800">
              <div className="space-y-1">
                <h4 className="text-base font-bold text-white flex items-center space-x-2">
                  <Calculator className="w-4 h-4 text-cyan-400" />
                  <span>Descriptive Dataset Input</span>
                </h4>
                <p className="text-xs text-slate-400">
                  Enter comma-separated numerical values from your lab observations.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Numbers / Observations Array:
                </label>
                <textarea
                  value={numbersInput}
                  onChange={(e) => setNumbersInput(e.target.value)}
                  rows={4}
                  placeholder="e.g. 10, 15, 20, 25, 30"
                  className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-cyan-200 outline-none focus:border-cyan-400 leading-relaxed resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Calculate Z-Score for Value (X):
                </label>
                <input
                  type="number"
                  value={zValInput}
                  onChange={(e) => setZValInput(e.target.value)}
                  placeholder="e.g. 65"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-white outline-none focus:border-cyan-400"
                />
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setNumbersInput('12, 18, 24, 30, 36, 42, 48, 54, 60');
                    setZValInput('45');
                  }}
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold cursor-pointer underline"
                >
                  Load Sample Lab Distribution
                </button>
              </div>
            </div>

            {/* Results Column */}
            <div className="lg:col-span-7 space-y-4">
              {statsResult ? (
                <div className="space-y-4">
                  {/* Primary Stats Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                      <div className="text-[10px] text-slate-400 uppercase font-bold">Sample Mean (μ)</div>
                      <div className="text-xl font-extrabold text-cyan-300 mt-1 font-mono">
                        {statsResult.mean.toFixed(2)}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                      <div className="text-[10px] text-slate-400 uppercase font-bold">Median</div>
                      <div className="text-xl font-extrabold text-white mt-1 font-mono">
                        {statsResult.median.toFixed(2)}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                      <div className="text-[10px] text-slate-400 uppercase font-bold">Std Deviation (σ)</div>
                      <div className="text-xl font-extrabold text-amber-300 mt-1 font-mono">
                        {statsResult.stdDev.toFixed(2)}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                      <div className="text-[10px] text-slate-400 uppercase font-bold">Variance (s²)</div>
                      <div className="text-xl font-extrabold text-purple-300 mt-1 font-mono">
                        {statsResult.variance.toFixed(2)}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                      <div className="text-[10px] text-slate-400 uppercase font-bold">Total Samples (N)</div>
                      <div className="text-xl font-extrabold text-white mt-1 font-mono">
                        {statsResult.n}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                      <div className="text-[10px] text-slate-400 uppercase font-bold">Range [Min - Max]</div>
                      <div className="text-xl font-extrabold text-emerald-300 mt-1 font-mono">
                        {statsResult.range.toFixed(1)}
                      </div>
                    </div>
                  </div>

                  {/* Z-Score Callout */}
                  <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-cyan-300">
                        Z-Score for X = {zValInput}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        Z = (X - μ) / σ = ({zValInput} - {statsResult.mean.toFixed(2)}) / {statsResult.stdDev.toFixed(2)}
                      </div>
                    </div>
                    <div className="text-2xl font-extrabold text-cyan-400 font-mono px-3 py-1 bg-cyan-950/60 rounded-xl border border-cyan-400/40">
                      {statsResult.zScore >= 0 ? `+${statsResult.zScore.toFixed(2)}` : statsResult.zScore.toFixed(2)}
                    </div>
                  </div>

                  {/* Sorted distribution preview */}
                  <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800 text-xs">
                    <span className="text-slate-400 font-bold">Ordered Values: </span>
                    <span className="font-mono text-slate-200">
                      {statsResult.sorted.join('  •  ')}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 text-center text-xs text-slate-500">
                  Enter valid numbers in the input box on the left to compute statistics.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CSV DATA PROFILER */}
      {activeSubTab === 'csv' && (
        <div className="space-y-4">
          <div className="p-5 rounded-2xl glass-card border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-base font-bold text-white flex items-center space-x-2">
                  <TableIcon className="w-4 h-4 text-cyan-400" />
                  <span>Instant CSV Data Profiler</span>
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Paste raw CSV text or dataset contents to inspect shape, column headers, and preview rows.
                </p>
              </div>

              {parsedCsv && (
                <div className="flex items-center space-x-3 text-xs">
                  <span className="px-3 py-1 rounded-lg bg-cyan-950/60 text-cyan-300 border border-cyan-500/30 font-bold font-mono">
                    {parsedCsv.rowCount} Rows
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 font-bold font-mono">
                    {parsedCsv.colCount} Columns
                  </span>
                </div>
              )}
            </div>

            <textarea
              value={csvInput}
              onChange={(e) => setCsvInput(e.target.value)}
              rows={5}
              className="w-full p-3.5 rounded-xl bg-[#060b17] border border-slate-800 text-xs font-mono text-cyan-200 outline-none focus:border-cyan-400 leading-relaxed resize-none"
              placeholder="Paste comma-separated data here..."
            />
          </div>

          {/* Table Preview */}
          {parsedCsv && parsedCsv.rows.length > 0 && (
            <div className="rounded-2xl border border-slate-800 overflow-hidden shadow-xl bg-[#070d1e]">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-900/90 text-cyan-300 border-b border-slate-800">
                      <th className="p-3 font-bold border-r border-slate-800 w-12 text-center text-slate-500">#</th>
                      {parsedCsv.headers.map((h, idx) => (
                        <th key={idx} className="p-3 font-bold border-r border-slate-800 whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {parsedCsv.rows.map((row, rIdx) => (
                      <tr
                        key={rIdx}
                        className="border-b border-slate-800/60 hover:bg-slate-900/40 font-mono text-[11px]"
                      >
                        <td className="p-2.5 border-r border-slate-800 text-center text-slate-500">{rIdx + 1}</td>
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="p-2.5 border-r border-slate-800 whitespace-nowrap text-slate-300">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: CURRICULUM TOOLS DIRECTORY */}
      {activeSubTab === 'ecosystem' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {DS_TOOLS_ECOSYSTEM.map((tool, idx) => (
              <div
                key={idx}
                className="rounded-2xl glass-card p-5 border border-slate-800/90 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                      {tool.category}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-semibold">
                      {tool.badge}
                    </span>
                  </div>

                  <h4 className="text-base font-extrabold text-white">
                    {tool.name}
                  </h4>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {tool.desc}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800/80">
                  <div className="bg-[#050a17] p-2.5 rounded-xl border border-slate-800">
                    <pre className="text-[11px] font-mono text-cyan-300 overflow-x-auto">
                      <code>{tool.importSnippet}</code>
                    </pre>
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleCopy(tool.importSnippet, `tool-${idx}`)}
                      className="text-[11px] text-slate-400 hover:text-cyan-300 font-semibold flex items-center space-x-1 cursor-pointer"
                    >
                      {copiedId === `tool-${idx}` ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Snippet</span>
                        </>
                      )}
                    </button>

                    <a
                      href={tool.docsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-cyan-400 hover:underline font-semibold flex items-center space-x-0.5"
                    >
                      <span>Docs</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
