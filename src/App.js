
import './App.css';
import {ThemeProvider, theme, ColorModeProvider,CSSReset} from '@chakra-ui/react'
import NavBar from './Components/NavBar';

function App() {
  return (
    <ThemeProvider theme={theme}>
        <NavBar />
      
    </ThemeProvider>
  );
}

export default App;
