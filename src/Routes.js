import { Route,Routes, useParams, useLocation} from 'react-router-dom'
import { SignUp } from './Pages/register/SignUp';
import { SignIn } from './Pages/register/SignIn';
import { ChatInterface } from './Pages/Chat/ChatInterface';

const Routesl = () => {  
    const params = useParams();
    const location = useLocation();

    return (
        <Routes>
            <Route path="/" element={<ChatInterface />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route exact path="/sign-up" element={<SignUp />} />
        </Routes>
        )
}

export default Routesl;
