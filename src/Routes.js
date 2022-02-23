import { Route,Routes, useParams, useLocation} from 'react-router-dom'
import { SignUp } from './Pages/register/SignUp';
import { SignIn } from './Pages/register/SignIn';
import { ChatInterface } from './Pages/Chat/ChatInterface';
import GenericNotFound from './Components/GenericNotFound';
import UserProfile from './Pages/profile/UserProfile';
import Test from './Pages/About/Test';
import SearchPage from './Pages/Search/SearchPage';
import AboutPage from './Pages/About/AboutPage';
import SelectChat from './Components/SelectChat';
import BuddiesPage from './Pages/Buddies/BuddiesPage';

const Routesl = ( {isloggedin,userData}) => {  
    const params = useParams();
    const location = useLocation();
    if(isloggedin){
        return(
        <Routes>
            <Route exact path="/chat/:id" element={<ChatInterface />} />
            <Route exact path="/profile/:id" element={<UserProfile currentUser={userData} />} />
            {/* <Route exact path="/" element={<ChatInterface />} /> */}
            <Route exact path="/search" element={<SearchPage />} />
            <Route exact path="/buddies" element={<BuddiesPage userData={userData} />} />
            {/* <Route path="/test" element={<Test />} /> */}
            <Route exact path="/" element={<SelectChat />} />
            <Route path="*" element={<GenericNotFound />} />
        </Routes>
        )
    }
    return (
        <Routes>
            <Route exact path="/sign-in" element={<SignIn />} />
            <Route exact path="/sign-up" element={<SignUp />} />
            <Route exact path="/" element={<AboutPage />} />
            <Route
                path="*"
                element={<GenericNotFound />}
            />
        </Routes>
        
        )
}

export default Routesl;
