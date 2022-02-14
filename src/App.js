
import './App.css';
import {ThemeProvider, theme, ColorModeProvider,CSSReset} from '@chakra-ui/react'
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';
import { BrowserRouter as Router } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import Routesl from './Routes'
import SideBar from './Components/SideBar';
import { UserDashBoard } from './Pages/Chat/UserDashboard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BaseUrl } from './api';


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
const LoggedIn = ({isloggedin,SetLoggedIn,userData}) =>{
  
  return(
    <SideBar  SetLoggedIn={SetLoggedIn} userData={userData} children={<Routesl isloggedin={isloggedin}/>} />
  );
}
const LoggedOut = ({isloggedin}) => {
  return(
    <>
      <NavBar />
      <Routesl isloggedin={isloggedin} />
      <Foot />
    </>
  );
}
const checkValidToken = () => {
  const token = localStorage.getItem('token');
  console.log("logged in token: ",token);
  return token;
}

function App() {
  const [loggedIn,SetLoggedIn] = useState(checkValidToken());
  const [user,SetUser] = useState(null);

    useEffect(() => {
      if(loggedIn){
        axios.get(BaseUrl +"users/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }
        }).then(res => {
          console.log("hellow: respnse",res.data);
          console.log(typeof res.data);
          SetUser({"userInfo":res.data});
        }).catch(err => {
          console.log(err);
          localStorage.removeItem('token');
          
        })
      }
      console.log("logged in: ",loggedIn);
      
    },[loggedIn]);
  
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App"> 
            {loggedIn ? <LoggedIn isloggedin={loggedIn} SetLoggedIn={SetLoggedIn} userData={user}/> : <LoggedOut/>}
        </div>
      </Router>
      
    </ThemeProvider>
  );
}

export default App;
