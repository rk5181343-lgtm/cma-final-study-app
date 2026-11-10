import { useAttempts, masteryOf, type Attempt } from '../lib/store';
import { PaperPack } from '../data/types';

function masteryOfPaper(paper: PaperPack, done: Record<string, Attempt>) {
  return masteryOf(paper.questions.map((q) => q.id), done);
}

export default function Home() {
  return null;
}
