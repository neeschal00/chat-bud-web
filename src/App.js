
import './App.css';
import {ThemeProvider, theme, ColorModeProvider,CSSReset} from '@chakra-ui/react'
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';
import { BrowserRouter as Router } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import Routesl from './Routes'
import SideBar from './Components/SideBar';


const Header = () => {
  const location = useLocation();
  const path = location.pathname;
  console.log(location);
  console.log(location.pathname);
  if (path === "/") {
    return (
        <SideBar />
      );
    }
    else {
      return (
        <NavBar />
    );
  }
}

const Foot = () => {
  const location = useLocation();
  const path = location.pathname;
  console.log(location);
  console.log(location.pathname);
  if (path === "/") {
    return (
      <>  </>
    );
  }
  else {
    return (
      <Footer />
    );
  }
}

function App() {
  
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App"> 
            <Header />
            <Routesl />
            <Foot />
        </div>
      </Router>
      
    </ThemeProvider>
  );
}

export default App;
