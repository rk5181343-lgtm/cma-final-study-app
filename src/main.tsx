// Entry point
import { createRoot } from 'react-dom/client';
const appRoot = document.getElementById('root');
if (appRoot) {
  createRoot(appRoot).render(<App />);
}
