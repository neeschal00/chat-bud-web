import { Route,Routes, useParams, useLocation} from 'react-router-dom'
import { SignUp } from './Pages/register/SignUp';
import { SignIn } from './Pages/register/SignIn';
import { ChatInterface } from './Pages/Chat/ChatInterface';
import GenericNotFound from './Components/GenericNotFound';
import UserProfile from './Pages/profile/UserProfile';
import Test from './Pages/About/Test';

const Routesl = ( {isloggedin}) => {  
    const params = useParams();
    const location = useLocation();
    if(isloggedin){
        return(
        <Routes>
            <Route exact path="/chat/:id" element={<ChatInterface />} />
            <Route exact path="/profile/:id" element={<UserProfile />} />
            {/* <Route exact path="/" element={<ChatInterface />} /> */}
            <Route path="/test" element={<Test />} />
            <Route path="/" element={<ChatInterface />} />
            <Route path="*" element={<GenericNotFound />} />
        </Routes>
        )
    }
    return (
        <Routes>
            <Route exact path="/sign-in" element={<SignIn />} />
            <Route exact path="/sign-up" element={<SignUp />} />
            {/* <Route exact path="/about" element={} /> */}
            <Route
                path="*"
                element={<GenericNotFound />}
            />
        </Routes>
        
        )
}

export default Routesl;
