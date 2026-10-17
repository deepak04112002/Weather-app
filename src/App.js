import Home from './pages/Home';
import { ThemeContextProvider } from './context/ThemeContext';
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <ThemeContextProvider>
      <Home />
      <Analytics />
    </ThemeContextProvider>
  );
}

export default App;
