import { Route,Routes, useParams, useLocation} from 'react-router-dom'
import { SignUp } from './Pages/register/SignUp';
import { SignIn } from './Pages/register/SignIn';
import { ChatInterface } from './Pages/Chat/ChatInterface';


const Routesl = ( {isloggedin}) => {  
    const params = useParams();
    const location = useLocation();
    if(isloggedin){
        return(
        <Routes>
            <Route exact path="/chat/:id" element={<ChatInterface />} />
            {/* <Route exact path="/" element={<ChatInterface />} /> */}
            <Route path="/" element={<ChatInterface />} />
        </Routes>
        )
    }
    return (
        <Routes>
            <Route exact path="/sign-in" element={<SignIn />} />
            <Route exact path="/sign-up" element={<SignUp />} />
            {/* <Route exact path="/about" element={} /> */}
        </Routes>
        
        )
}

export default Routesl;
