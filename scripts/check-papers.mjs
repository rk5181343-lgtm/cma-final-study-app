/**\n * Structural and content checks across every paper in the app.\n * Bundles src/data/index.ts with esbuild, then validates each bank.\n */
import { execFileSync } from 'node:child_process';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const out = join(mkdtempSync(join(tmpdir(), 'cma-check-')), 'bank.mjs');
execFileSync('npx', ['esbuild', 'src/data/index.ts', '--bundle', '--format=esm', '--outfile=${out}', '--log-level=error'], { stdio: 'inherit' });

const { papers } = await import(pathToFileURL(out).href);
const problems = [];
const ids = new Set();

for (const paper of papers) {
  for (const q of paper.questions) {
    if (ids.has(q.id)) problems.push(`duplicate question id ${q.id}`);
    ids.add(q.id);
    if (!q.id.startsWith(paper.code)) problems.push(`${q.id} is filed under ${paper.code}`);
    if (!paper.modules.some((m) => m.id === q.moduleId)) {
      problems.push(`${q.id}: unknown module ${q.moduleId}`);
    }
    if (q.format === 'mcq') {
      if (q.options?.length !== 4) problems.push(`${q.id}: expected 4 options`);
      if (!q.options?.some((o) => o.key === q.correct)) {
        problems.push(`${q.id}: correct key ${q.correct} is not an option`);
      }
      if (q.scheme) problems.push(`${q.id}: MCQ should not carry a scheme`);
    } else {
      if (!q.scheme?.length) problems.push(`${q.id}: written question without a scheme`);
      const total = q.scheme?.reduce((sum, row) => sum + row.marks, 0) ?? 0;
      if (total !== q.marks) problems.push(`${q.id}: scheme ${total} != ${q.marks} marks`);
    }
    if (/(TODO|FIXME|placeholder)\b|\? No —|wait —/i.test(JSON.stringify(q))) {
      problems.push(`${q.id}: drafting residue in the text`);
    }
  }

  if (paper.available) {
    const weight = paper.modules.reduce((sum, m) => sum + m.weight, 0);
    if (weight !== 100) problems.push(`${paper.code}: module weights sum to ${weight}`);
    if (!paper.modules.length) problems.push(`${paper.code}: available but has no modules`);
    if (!paper.questions.length) problems.push(`${paper.code}: available but has no questions`);
  }

  for (const module of paper.modules) {
    if (!module.points.length) problems.push(`${paper.code} ${module.id}: no syllabus points`);
    if (!paper.sections.some((s) => s.key === module.section)) {
      problems.push(`${paper.code} ${module.id}: section ${module.section} is not declared`);
    }
  }

  const marks = paper.questions.reduce((sum, q) => sum + q.marks, 0);
  console.log(`${paper.code} ${String(paper.modules.length).padStart(2)} modules ${String(paper.questions.length).padStart(2)} questions ${String(marks).padStart(3)} marks ${paper.short}`);
}

console.log(problems.length ? \`\nPROBLEMS\n${problems.join('\n')}`` : '\nall paper checks passed');
if (problems.length) process.exitCode = 1;
