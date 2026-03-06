import Home from './pages/Home';
import { ThemeContextProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeContextProvider>
      <Home />
    </ThemeContextProvider>
  );
}

export default App;
