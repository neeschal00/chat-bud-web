
import './App.css';
import {ThemeProvider, theme, ColorModeProvider,CSSReset} from '@chakra-ui/react'
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';
import { BrowserRouter as Router } from 'react-router-dom'
import Routesl from './Routes'
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App"> 
            <NavBar />
            <Routesl />
            <Footer />
        </div>
      </Router>
      
    </ThemeProvider>
  );
}

export default App;
