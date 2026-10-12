/**
 * Dynamic Python Code Execution Engine & Simulator
 * Parses Python source code (stdout prints, variable assignments, DataFrames,
 * pandas methods like fillna/describe/head, sklearn models, matplotlib plots)
 * and generates clean, realistic console outputs, tables, and visualizations.
 */

export function executePythonEngine(codeStr, expTitle = "", fallbackOutput = "") {
  if (!codeStr || !codeStr.trim()) {
    return {
      outputLogs: fallbackOutput || "[INFO] Ready to execute code. Click 'Run Code' above.",
      tableData: null,
      chartData: null
    };
  }

  const logs = [];
  let tableData = null;
  let chartData = null;

  const codeLower = codeStr.toLowerCase();
  const lines = codeStr.split(/\r?\n/);

  const variables = {};
  const dataFrames = {}; // Store parsed dataframes by variable name
  const printOutputs = [];

  let customHeaders = [];
  let customRows = [];

  // Helper: Format cell value
  function formatVal(v) {
    if (v === null || v === undefined || (typeof v === 'number' && isNaN(v))) return 'NaN';
    if (typeof v === 'number') {
      return Number.isInteger(v) ? String(v) : v.toFixed(v % 1 === 0 ? 1 : (v < 0.01 && v > 0 ? 4 : 2));
    }
    return String(v);
  }

  // Helper: Format ASCII pandas table
  function formatPandasTable(headers, rows) {
    if (!headers || headers.length === 0) return '';
    const colWidths = headers.map((h, i) => {
      let maxLen = String(h).length;
      rows.forEach(r => {
        const cellStr = formatVal(r[i]);
        if (cellStr.length > maxLen) maxLen = cellStr.length;
      });
      return Math.max(maxLen, 6);
    });

    const pad = (str, len) => String(str).padStart(len, ' ');

    let headerLine = '   ' + headers.map((h, i) => pad(h, colWidths[i])).join('  ');
    let linesArr = [headerLine];

    rows.forEach((r, idx) => {
      let rowLine = pad(idx, 2) + ' ' + r.map((cell, i) => pad(formatVal(cell), colWidths[i])).join('  ');
      linesArr.push(rowLine);
    });

    return linesArr.join('\n');
  }

  // Helper: Generate describe() summary table
  function formatDescribeTable(headers, rows) {
    const numericCols = [];
    headers.forEach((h, colIdx) => {
      const isNum = rows.some(r => typeof r[colIdx] === 'number' && !isNaN(r[colIdx]));
      if (isNum) numericCols.push({ name: h, index: colIdx });
    });

    if (numericCols.length === 0) return '[DataFrame Statistics: No numerical columns]';

    const stats = ['count', 'mean', 'std', 'min', '25%', '50%', '75%', 'max'];
    const statData = {};

    numericCols.forEach(col => {
      const vals = rows.map(r => r[col.index]).filter(v => typeof v === 'number' && !isNaN(v)).sort((a, b) => a - b);
      const count = vals.length;
      if (count === 0) return;

      const sum = vals.reduce((a, b) => a + b, 0);
      const mean = sum / count;
      const sqDiffs = vals.map(v => Math.pow(v - mean, 2));
      const std = Math.sqrt(sqDiffs.reduce((a, b) => a + b, 0) / (count > 1 ? count - 1 : 1));
      const min = vals[0];
      const max = vals[count - 1];
      const p25 = vals[Math.floor(count * 0.25)] || min;
      const p50 = vals[Math.floor(count * 0.50)] || mean;
      const p75 = vals[Math.floor(count * 0.75)] || max;

      statData[col.name] = { count, mean, std, min, '25%': p25, '50%': p50, '75%': p75, max };
    });

    const colNames = Object.keys(statData);
    const colWidths = colNames.map(name => {
      let maxLen = name.length;
      stats.forEach(st => {
        const str = formatVal(statData[name][st]);
        if (str.length > maxLen) maxLen = str.length;
      });
      return Math.max(maxLen, 10);
    });

    const pad = (str, len) => String(str).padStart(len, ' ');

    let headerLine = '       ' + colNames.map((n, i) => pad(n, colWidths[i])).join('  ');
    let resultArr = [headerLine];

    stats.forEach(st => {
      let line = pad(st, 6) + ' ' + colNames.map((n, i) => pad(formatVal(statData[n][st]), colWidths[i])).join('  ');
      resultArr.push(line);
    });

    return resultArr.join('\n');
  }

  // 1. Pre-pass: Parse dictionary definitions for DataFrames
  try {
    const dictMatches = [...codeStr.matchAll(/(\w+)\s*=\s*\{([\s\S]*?)\}\s*(?:\n|$|df)/g)];
    dictMatches.forEach(m => {
      const varName = m[1];
      const dictBody = m[2];
      const keyValMatches = [...dictBody.matchAll(/['"](\w+)['"]\s*:\s*\[([\s\S]*?)\]/g)];
      if (keyValMatches.length > 0) {
        const headers = keyValMatches.map(kv => kv[1]);
        const colsData = keyValMatches.map(kv => {
          return kv[2].split(',').map(rawVal => {
            const trimmedVal = rawVal.trim();
            if (trimmedVal === 'np.nan' || trimmedVal === 'NaN' || trimmedVal === 'None') return NaN;
            if (/^-?\d+(\.\d+)?$/.test(trimmedVal)) return Number(trimmedVal);
            return trimmedVal.replace(/^['"]|['"]$/g, '');
          });
        });
        const rowCount = Math.max(...colsData.map(c => c.length));
        const rows = [];
        for (let i = 0; i < rowCount; i++) {
          rows.push(colsData.map(c => c[i] !== undefined ? c[i] : NaN));
        }

        dataFrames[varName] = { headers, rows };
        dataFrames['df'] = { headers, rows };
        customHeaders = headers;
        customRows = rows;
      }
    });
  } catch (_e) {
    // Ignore dict parse errors
  }

  // If Iris dataset reference exists, preset Iris DataFrame
  if (codeLower.includes('iris') && !dataFrames['df']) {
    const irisHeaders = ["sepal_length", "sepal_width", "petal_length", "petal_width", "species"];
    const irisRows = [
      [5.1, 3.5, 1.4, 0.2, "setosa"],
      [4.9, 3.0, 1.4, 0.2, "setosa"],
      [4.7, 3.2, 1.3, 0.2, "setosa"],
      [4.6, 3.1, 1.5, 0.2, "setosa"],
      [5.0, 3.6, 1.4, 0.2, "setosa"]
    ];
    dataFrames['df'] = { headers: irisHeaders, rows: irisRows };
    customHeaders = irisHeaders;
    customRows = irisRows;
  }

  // Helper: Evaluate single print term
  function evalTerm(term) {
    term = term.trim();
    if (!term) return '';

    // Handle Escaped \n in string quotes
    if (/^f?["'][\s\S]*["']$/.test(term)) {
      let str = term.replace(/^f?["']|["']$/g, '');
      str = str.replace(/\\n/g, '\n');
      // Format string interpolation f"{var}"
      Object.keys(variables).forEach(v => {
        str = str.replace(new RegExp(`\\{${v}\\}`, 'g'), variables[v]);
      });
      return str;
    }

    // Check variables
    if (variables[term] !== undefined) return String(variables[term]);

    // Check DataFrames
    const targetDf = dataFrames[term] || dataFrames['df'];

    if (term.includes('.head(') || term.includes('.head()')) {
      if (targetDf) return formatPandasTable(targetDf.headers, targetDf.rows.slice(0, 5));
    }
    if (term.includes('.tail(') || term.includes('.tail()')) {
      if (targetDf) return formatPandasTable(targetDf.headers, targetDf.rows.slice(-5));
    }
    if (term.includes('.describe()')) {
      if (targetDf) return formatDescribeTable(targetDf.headers, targetDf.rows);
    }
    if (term === 'df' || term === 'df_imputed' || term === 'scaled_df' || term === 'scaled_data' || dataFrames[term]) {
      const dfObj = dataFrames[term] || targetDf;
      if (dfObj) {
        if (term === 'df_imputed') {
          const imputedRows = dfObj.rows.map(row => {
            return row.map((cell, colIdx) => {
              if (cell === null || cell === undefined || (typeof cell === 'number' && isNaN(cell))) {
                const nums = dfObj.rows.map(r => r[colIdx]).filter(v => typeof v === 'number' && !isNaN(v));
                return nums.length > 0 ? (nums.reduce((a, b) => a + b, 0) / nums.length) : 0;
              }
              return cell;
            });
          });
          return formatPandasTable(dfObj.headers, imputedRows);
        }

        if (term === 'scaled_df' || term === 'scaled_data') {
          const scaledRows = dfObj.rows.map(row => {
            return row.map((cell, colIdx) => {
              if (typeof cell === 'number' && !isNaN(cell)) {
                const nums = dfObj.rows.map(r => r[colIdx]).filter(v => typeof v === 'number' && !isNaN(v));
                const min = Math.min(...nums);
                const max = Math.max(...nums);
                return max > min ? (cell - min) / (max - min) : 0;
              }
              return cell;
            });
          });
          return formatPandasTable(dfObj.headers, scaledRows);
        }

        return formatPandasTable(dfObj.headers, dfObj.rows);
      }
    }

    return term;
  }

  // 2. Line-by-line Execution Parsing
  lines.forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;

    // Capture variable assignments (e.g., age = 25, score = 85.5)
    const assignMatch = trimmed.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*(.*)$/);
    if (assignMatch) {
      const varName = assignMatch[1].trim();
      let valExpr = assignMatch[2].trim();

      if (/^-?\d+(\.\d+)?$/.test(valExpr)) {
        variables[varName] = Number(valExpr);
      } else if (/^["'].*["']$/.test(valExpr)) {
        variables[varName] = valExpr.slice(1, -1);
      }
    }

    // Capture print(...) statements accurately
    const printMatch = trimmed.match(/^print\s*\((.*)\)$/);
    if (printMatch) {
      const rawExpr = printMatch[1].trim();

      // Split arguments by comma while respecting quotes
      const terms = [];
      let currentTerm = '';
      let inQuotes = false;
      let quoteChar = '';

      for (let i = 0; i < rawExpr.length; i++) {
        const char = rawExpr[i];
        if ((char === '"' || char === "'") && (i === 0 || rawExpr[i - 1] !== '\\')) {
          if (!inQuotes) {
            inQuotes = true;
            quoteChar = char;
          } else if (char === quoteChar) {
            inQuotes = false;
          }
        }

        if (char === ',' && !inQuotes) {
          terms.push(currentTerm);
          currentTerm = '';
        } else {
          currentTerm += char;
        }
      }
      if (currentTerm) terms.push(currentTerm);

      const evaluatedParts = terms.map(t => evalTerm(t));
      printOutputs.push(evaluatedParts.join(' '));
    }

    // File writing simulation
    if (trimmed.includes('.to_csv(') || (trimmed.includes('open(') && trimmed.includes('write'))) {
      const fileMatch = trimmed.match(/['"]([\w./\\]+\.(?:csv|txt|json|dat))['"]/);
      const filename = fileMatch ? fileMatch[1] : 'dataset_export.csv';
      printOutputs.push(`[FILE I/O] Output successfully saved to ${filename}`);
    }
  });

  // 3. Assemble Output Logs
  if (printOutputs.length > 0) {
    printOutputs.forEach(p => logs.push(p));
  } else if (fallbackOutput && fallbackOutput.trim()) {
    logs.push(fallbackOutput.trim());
  } else {
    logs.push(`Script executed successfully.`);
    logs.push(`[STATUS] Execution Completed (Exit Code: 0)`);
  }

  // 4. Tabular Dataset Preview (For table view tab)
  if (customHeaders.length > 0 && customRows.length > 0) {
    tableData = {
      headers: customHeaders,
      rows: customRows.slice(0, 10).map(r => r.map(formatVal))
    };
  }

  // 5. Visual Chart Preview (If plot library is detected)
  if (codeLower.includes('matplotlib') || codeLower.includes('plt.') || codeLower.includes('seaborn') || codeLower.includes('sns.')) {
    let chartType = 'line';
    if (codeLower.includes('bar') || codeLower.includes('hist')) chartType = 'bar';
    if (codeLower.includes('scatter')) chartType = 'scatter';
    if (codeLower.includes('heatmap')) chartType = 'radar';

    chartData = {
      type: chartType,
      labels: ['Sample 1', 'Sample 2', 'Sample 3', 'Sample 4', 'Sample 5'],
      datasets: [
        {
          label: expTitle || 'Data Science Visualization',
          data: [12, 19, 14, 25, 30],
          borderColor: 'rgb(6, 182, 212)',
          backgroundColor: 'rgba(6, 182, 212, 0.2)',
          tension: 0.3
        }
      ]
    };
  }

  return {
    outputLogs: logs.join('\n'),
    tableData,
    chartData
  };
}
