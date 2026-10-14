const Experiment = require('../models/Experiment');
const seedExperiments = require('../data/seedExperiments');

// Helper to seed initial data if DB is empty
const ensureSeeded = async () => {
  try {
    const count = await Experiment.countDocuments();
    if (count === 0) {
      console.log('[SEED] Database empty. Seeding initial course experiments into MongoDB...');
      await Experiment.insertMany(seedExperiments);
      console.log('[SEED] Default course experiments successfully inserted!');
    }
  } catch (err) {
    console.error('[SEED ERROR] Error seeding database:', err.message);
  }
};

// @desc    Get all experiments
// @route   GET /api/experiments
exports.getExperiments = async (req, res) => {
  try {
    await ensureSeeded();
    const experiments = await Experiment.find().sort({ createdAt: 1 });
    res.status(200).json({
      success: true,
      count: experiments.length,
      data: experiments
    });
  } catch (error) {
    console.error('[API ERROR] getExperiments:', error);
    res.status(500).json({ success: false, message: 'Server error retrieving experiments' });
  }
};

// @desc    Get single experiment by id
// @route   GET /api/experiments/:id
exports.getExperimentById = async (req, res) => {
  try {
    const { id } = req.params;
    let exp = await Experiment.findOne({ id });
    if (!exp && id.match(/^[0-9a-fA-F]{24}$/)) {
      exp = await Experiment.findById(id);
    }

    if (!exp) {
      return res.status(404).json({ success: false, message: `Experiment with id '${id}' not found` });
    }

    res.status(200).json({ success: true, data: exp });
  } catch (error) {
    console.error('[API ERROR] getExperimentById:', error);
    res.status(500).json({ success: false, message: 'Server error retrieving experiment' });
  }
};

// @desc    Create new experiment
// @route   POST /api/experiments
exports.createExperiment = async (req, res) => {
  try {
    const { title, description, module, experimentNumber, subExperiments } = req.body;
    
    if (!title) {
      return res.status(400).json({ success: false, message: 'Experiment title is required' });
    }

    const expId = req.body.id || `exp-${Date.now()}`;

    const newExperiment = new Experiment({
      id: expId,
      title,
      description: description || 'Custom Data Science Experiment',
      module: module || '',
      experimentNumber: experimentNumber || null,
      subExperiments: subExperiments || [
        {
          id: `sub-${Date.now()}-1`,
          codeNum: '1a',
          title: '1a. Initial Script & Ingestion',
          githubUrl: '',
          code: `# ${title}\nimport pandas as pd\nimport numpy as np\n\nprint("Executing custom experiment script...")`,
          outputType: 'console',
          consoleOutput: `Executing custom experiment script...\n[STATUS] Execution Completed (Exit Code: 0)`
        }
      ]
    });

    const saved = await newExperiment.save();
    console.log(`[API SUCCESS] Created Experiment: ${saved.title} (${saved.id})`);
    res.status(201).json({ success: true, data: saved });
  } catch (error) {
    console.error('[API ERROR] createExperiment:', error);
    res.status(500).json({ success: false, message: 'Failed to create experiment', error: error.message });
  }
};

// @desc    Update existing experiment
// @route   PUT /api/experiments/:id
exports.updateExperiment = async (req, res) => {
  try {
    const { id } = req.params;
    let exp = await Experiment.findOne({ id });
    if (!exp && id.match(/^[0-9a-fA-F]{24}$/)) {
      exp = await Experiment.findById(id);
    }

    if (!exp) {
      // If updating an experiment that doesn't exist yet, create it!
      const newExp = new Experiment({
        ...req.body,
        id
      });
      const savedNew = await newExp.save();
      return res.status(201).json({ success: true, data: savedNew });
    }

    // Merge updates
    if (req.body.title !== undefined) exp.title = req.body.title;
    if (req.body.description !== undefined) exp.description = req.body.description;
    if (req.body.subExperiments !== undefined) exp.subExperiments = req.body.subExperiments;
    if (req.body.githubUrl !== undefined) exp.githubUrl = req.body.githubUrl;
    if (req.body.code !== undefined) exp.code = req.body.code;
    if (req.body.output !== undefined) exp.output = req.body.output;

    const updated = await exp.save();
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    console.error('[API ERROR] updateExperiment:', error);
    res.status(500).json({ success: false, message: 'Failed to update experiment', error: error.message });
  }
};

// @desc    Delete experiment
// @route   DELETE /api/experiments/:id
exports.deleteExperiment = async (req, res) => {
  try {
    const { id } = req.params;
    let exp = await Experiment.findOneAndDelete({ id });
    if (!exp && id.match(/^[0-9a-fA-F]{24}$/)) {
      exp = await Experiment.findByIdAndDelete(id);
    }

    if (!exp) {
      return res.status(404).json({ success: false, message: `Experiment with id '${id}' not found` });
    }

    console.log(`[API SUCCESS] Deleted Experiment: ${exp.title} (${exp.id})`);
    res.status(200).json({ success: true, message: 'Experiment deleted', id });
  } catch (error) {
    console.error('[API ERROR] deleteExperiment:', error);
    res.status(500).json({ success: false, message: 'Failed to delete experiment' });
  }
};

// @desc    Delete sub-experiment from main experiment
// @route   DELETE /api/experiments/:id/sub/:subId
exports.deleteSubExperiment = async (req, res) => {
  try {
    const { id, subId } = req.params;
    let exp = await Experiment.findOne({ id });
    if (!exp && id.match(/^[0-9a-fA-F]{24}$/)) {
      exp = await Experiment.findById(id);
    }

    if (!exp) {
      return res.status(404).json({ success: false, message: 'Experiment not found' });
    }

    exp.subExperiments = (exp.subExperiments || []).filter(sub => sub.id !== subId);
    const updated = await exp.save();
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    console.error('[API ERROR] deleteSubExperiment:', error);
    res.status(500).json({ success: false, message: 'Failed to delete sub-experiment' });
  }
};

// @desc    Update sub-experiment in main experiment
// @route   PUT /api/experiments/:id/sub/:subId
exports.updateSubExperiment = async (req, res) => {
  try {
    const { id, subId } = req.params;
    let exp = await Experiment.findOne({ id });
    if (!exp && id.match(/^[0-9a-fA-F]{24}$/)) {
      exp = await Experiment.findById(id);
    }

    if (!exp) {
      return res.status(404).json({ success: false, message: 'Experiment not found' });
    }

    let found = false;
    exp.subExperiments = (exp.subExperiments || []).map(sub => {
      const currentSubId = sub.id || sub._id?.toString();
      if (currentSubId === subId) {
        found = true;
        const subObj = sub.toObject ? sub.toObject() : sub;
        return {
          ...subObj,
          ...req.body,
          id: subId
        };
      }
      return sub;
    });

    if (!found) {
      return res.status(404).json({ success: false, message: 'Sub-experiment not found' });
    }

    const updated = await exp.save();
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    console.error('[API ERROR] updateSubExperiment:', error);
    res.status(500).json({ success: false, message: 'Failed to update sub-experiment', error: error.message });
  }
};


// @desc    Batch migrate user custom experiments from localStorage to MongoDB
// @route   POST /api/experiments/batch-migrate
exports.batchMigrate = async (req, res) => {
  try {
    const { localExperiments } = req.body;
    if (!Array.isArray(localExperiments)) {
      return res.status(400).json({ success: false, message: 'Invalid localExperiments array' });
    }

    const inserted = [];
    for (const exp of localExperiments) {
      if (!exp.id || !exp.title) continue;
      const exists = await Experiment.findOne({ id: exp.id });
      if (!exists) {
        const newExp = new Experiment({
          id: exp.id,
          title: exp.title,
          description: exp.description || '',
          subExperiments: exp.subExperiments || []
        });
        const saved = await newExp.save();
        inserted.push(saved.id);
      }
    }

    res.status(200).json({
      success: true,
      message: `Migrated ${inserted.length} custom experiments to MongoDB`,
      migratedIds: inserted
    });
  } catch (error) {
    console.error('[API ERROR] batchMigrate:', error);
    res.status(500).json({ success: false, message: 'Batch migration failed' });
  }
};

// @desc    Execute Python code on server, capture stdout, stderr, and generated plots
// @route   POST /api/experiments/execute-python
exports.executePython = async (req, res) => {
  const { code, input = '' } = req.body;
  if (!code || typeof code !== 'string') {
    return res.status(400).json({ success: false, message: 'Python code string is required' });
  }

  const { spawn } = require('child_process');
  const fs = require('fs');
  const path = require('path');
  const os = require('os');

  const tmpDir = os.tmpdir();
  const scriptFile = path.join(tmpDir, `ds_run_${Date.now()}_${Math.random().toString(36).substring(7)}.py`);

  const wrapped = `import sys
import os
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import io
import base64

saved_plots = []
_orig_show = plt.show

def custom_show(*args, **kwargs):
    buf = io.BytesIO()
    plt.savefig(buf, format='png', bbox_inches='tight')
    buf.seek(0)
    saved_plots.append(base64.b64encode(buf.read()).decode('utf-8'))
    plt.close()

plt.show = custom_show

# Execute User Code
${code}

if plt.get_fignums():
    buf = io.BytesIO()
    plt.savefig(buf, format='png', bbox_inches='tight')
    buf.seek(0)
    saved_plots.append(base64.b64encode(buf.read()).decode('utf-8'))
    plt.close('all')

if saved_plots:
    for idx, p in enumerate(saved_plots):
        print(f"\\n__PLOT_B64_{idx}__:" + p)
`;

  try {
    fs.writeFileSync(scriptFile, wrapped, 'utf8');

    const pyProcess = spawn('python', [scriptFile], { timeout: 25000 });

    let stdoutData = '';
    let stderrData = '';

    if (input) {
      pyProcess.stdin.write(input + '\n');
      pyProcess.stdin.end();
    }

    pyProcess.stdout.on('data', (d) => { stdoutData += d.toString(); });
    pyProcess.stderr.on('data', (d) => { stderrData += d.toString(); });

    pyProcess.on('close', (exitCode) => {
      try { fs.unlinkSync(scriptFile); } catch (_e) {}

      const plots = [];
      const cleanStdoutLines = [];
      const lines = stdoutData.split(/\r?\n/);
      for (const line of lines) {
        if (line.startsWith('__PLOT_B64_')) {
          const parts = line.split(':');
          if (parts.length >= 2) {
            plots.push('data:image/png;base64,' + parts.slice(1).join(':'));
          }
        } else {
          cleanStdoutLines.push(line);
        }
      }

      res.status(200).json({
        success: exitCode === 0,
        output: cleanStdoutLines.join('\n').trim(),
        stderr: stderrData.trim(),
        exitCode,
        plots
      });
    });

    pyProcess.on('error', (err) => {
      try { fs.unlinkSync(scriptFile); } catch (_e) {}
      res.status(500).json({ success: false, message: 'Failed to launch python: ' + err.message });
    });
  } catch (err) {
    try { fs.unlinkSync(scriptFile); } catch (_e) {}
    res.status(500).json({ success: false, message: err.message });
  }
};
