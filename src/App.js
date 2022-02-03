
import './App.css';
import {ThemeProvider, theme, ColorModeProvider,CSSReset} from '@chakra-ui/react'
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';
import { BrowserRouter as Router } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import Routesl from './Routes'
import SideBar from './Components/SideBar';
import { UserDashBoard } from './Pages/Chat/UserDashboard';
import { useState } from 'react';


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
  if (path !== "/") {
    return (
      <Footer />
    );
  }
  else {
    return (
      <></>
    );
  }
}
const LoggedIn = (props) =>{
  return(
    <SideBar children={<Routesl/>} />
  );
}
const LoggedOut = (props) => {
  return(
    <>
      <NavBar />
      <Routesl />
      <Foot />
    </>
  );
}

function App() {
  const [loggedIn,SetLoggedIn] = useState(true);
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App"> 
            {loggedIn ? <LoggedIn /> : <LoggedOut/>}
        </div>
      </Router>
      
    </ThemeProvider>
  );
}

export default App;
