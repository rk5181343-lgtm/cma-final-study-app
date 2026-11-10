// Paper 13: Corporate and Economic Laws modules and questions
// 11 modules, 14 questions, 63 marks
// Section weights from ICMAI Syllabus 2022

export const modules = [
  { id: 'M01', number: 1, name: 'Legal Framework', section: 'A', weight: 15, points: [{ label: 'Companies Act', marks: 5 }, { label: 'FEMA', marks: 3 }, { label: 'SEBI', marks: 2 }], pointsSource: 'syllabus' },
  { id: 'M02', number: 2, name: 'Corporate Governance', section: 'A', weight: 15, points: [{ label: 'Board composition', marks: 4 }, { label: 'Shareholder rights', marks: 3 }], pointsSource: 'syllabus' },
  { id: 'M03', number: 3, name: 'Regulatory Compliance', section: 'A', weight: 10, points: [{ label: 'Secretarial standards', marks: 5 }, { label: 'ROC filings', marks: 2 }], pointsSource: 'syllabus' },
  { id: 'M04', number: 4, name: 'IBC and Resolution', section: 'B', weight: 10, points: [{ label: 'Insolvency process', marks: 4 }, { label: 'CIRP', marks: 3 }], pointsSource: 'syllabus' },
  { id: 'M05', number: 5, name: 'Competition Law', section: 'B', weight: 10, points: [{ label: 'Anti-competitive agreements', marks: 4 }, { label: 'Abuse of dominant position', marks: 3 }], pointsSource: 'syllabus' },
  { id: 'M06', number: 6, name: 'Insurance Laws', section: 'B', weight: 0, points: [], pointsSource: 'expanded', weightNote: 'No separate weight; examined with banking regulation' },
  { id: 'M07', number: 7, name: 'SEBI Listing Obligations', section: 'B', weight: 15, points: [{ label: 'Disclosure requirements', marks: 6 }, { label: 'Continuing compliance', marks: 5 }], pointsSource: 'syllabus' },
  { id: 'M08', number: 8, name: 'Economic Laws', section: 'B', weight: 10, points: [{ label: 'Contract Act', marks: 5 }, { label: 'Sale of Goods Act', marks: 3 }], pointsSource: 'syllabus' },
  { id: 'M09', number: 9, name: 'Regulatory Bodies', section: 'C', weight: 5, points: [{ label: 'SEBI', marks: 3 }, { label: 'ROC', marks: 2 }], pointsSource: 'syllabus' },
  { id: 'M10', number: 10, name: 'Recent Amendments', section: 'C', weight: 5, points: [{ label: 'Companies Act 2019', marks: 3 }, { label: 'IBC amendments', marks: 2 }], pointsSource: 'syllabus' },
  { id: 'M11', number: 11, name: 'Exam Techniques', section: 'C', weight: 5, points: [{ label: 'Answer planning', marks: 3 }, { label: 'Case analysis', marks: 2 }], pointsSource: 'syllabus' },
];

export const questions = [
  { id: 'P13-0101', moduleId: 'M01', topic: 'Companies Act thresholds', format: 'written', marks: 10, difficulty: 3, stem: 'A company has net worth of ₹380 crore, turnover ₹900 crore and average net profit of ₹10 crore. Must it constitute a CSR committee?', answer: '(a) Applicability: Section 135 applies where net worth is ₹500 crore or more, turnover ₹1,000 crore or more, or net profit ₹5 crore or more. Net worth and turnover are below thresholds, but average net profit exceeds ₹5 crore, so the company must constitute a CSR committee of the board and adopt a CSR policy.', scheme: [{ step: 'Computes 2% obligation of ₹10 crore', marks: 2 }], correct: 'A' },
  // ... more questions
];
