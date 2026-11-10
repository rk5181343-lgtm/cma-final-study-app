# CMA Final · Study Room

A study app for the **CMA Final Course, Syllabus 2022** — all eight papers, not one. Each paper
opens on its syllabus weight map, then a question bank with model answers and marking schemes,
self-marking, and a mock-paper builder that prints to PDF.

## Papers

| Paper | Subject | Modules | Questions |
| --- | --- | --- | --- |
| 13 | Corporate and Economic Laws | 11 | 14 |
| 14 | Strategic Financial Management | 17 | 13 |
| 15 | Direct Tax Laws and International Taxation | 14 | 10 |
| 16 | Strategic Cost Management | 15 | 32 |
| 17 | Cost and Management Audit | 18 | 10 |
| 18 | Corporate Financial Reporting | 8 | 10 |
| 19 | Indirect Tax Laws and Practice | 27 | 10 |
| 20 | Strategic Performance Management and Business Valuation | — | — |

Paper 20 is listed but not built: its syllabus document is not in the source set (`research/syllabus`
holds P13–P19 only), and the app does not invent module structures. Its card says so.

The banks are starter banks. Every module has its syllabus map; questions cover the heaviest and
examinable modules of each paper first, and a module with no questions yet says "bank in progress" rather than showing an empty list. The mock builder uses what the bank holds, so a thin bank prints a shorter paper instead of a padded one.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static build in dist/
npm run typecheck
```

## Routes
- `#/` — all papers
- `#/p16` — Paper 16 dashboard with the weight map
- `#/p16/module/M03` — syllabus coverage for a module and its questions
- `#/p16/practice` or `#/p16/practice/M03` — attempt, reveal, self-mark
- `#/p16/exam` — choose modules and marks, generate, print
- `#/p16/progress` — mastery by module, recently marked, reset for that paper

Any paper code works in place of `p16`.

## Content and provenance
- Module numbers, titles and section weights come from the official ICMAI Syllabus 2022
  PDFs (`research/syllabus/P13–P19.pdf`).
- Where the printed table gives a weight for a group of modules rather than each module, the module
  carries the group's note instead of a fabricated individual percentage. The apportioned number is
  used only for bars and exam weighting and is shown as approximate.
- Where a module has no printed weight because the syllabus folds it into another row (Paper 13's
  insurance module, Paper 17's cost auditing standards), the module says so and carries weight 0.
- **Every question is original**, written for this app. No ICMAI question paper, suggested answer or
  study material is reproduced.
- Quantitative answers were recomputed with `node scripts/verify-bank.mjs` (Paper 16) and the
  arithmetic in the other papers is set out step by step in each model answer.
- Bank integrity is checked with esbuild plus a script: unique ids, scheme rows summing exactly to the marks, MCQ answer keys present, every question pointing at a real module, and each available paper's module weights summing to 100.

```bash
node scripts/check-papers.mjs
```

## Adding a paper
1. Read the syllabus PDF into `research/text/`.
2. Create `src/data/pXX/index.ts` exporting `modules: Module[]` and `questions: Question[]`.
3. Add its metadata (name, group, sections) to `paperMeta` in `src/data/papers.ts` and set
   `available: true`.
4. Import it in `src/data/index.ts` and add it to `papers`.

A written question needs `id` (`PXX-MMNN`), `moduleId`, `topic`, `format`, `marks`, `difficulty`
(1–5), `stem`, `answer` (markdown: headings, tables, lists and bold are supported) and a `scheme`
whose rows sum to `marks`. An MCQ needs four `options`, a `correct` key and no scheme.

## Layout
- `src/data/` — paper metadata, one folder per paper, `index.ts` composes the packs
- `src/pages/` — index, paper dashboard, module page, practice, mock paper, progress
- `src/components/QuestionCard.tsx` — attempt, reveal, scheme and self-mark
- `src/lib/store.ts` — localStorage attempts store
- `scripts/verify-bank.mjs` — recomputes every number in the Paper 16 bank

```
