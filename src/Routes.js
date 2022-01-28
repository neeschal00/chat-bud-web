import { Route,Routes, useParams, useLocation} from 'react-router-dom'
import { SignUp } from './Pages/register/SignUp';
import { SignIn } from './Pages/register/SignIn';
import { ChatInterface } from './Pages/Chat/ChatInterface';

const Routesl = () => {  
    const params = useParams();
    const location = useLocation();

    return (
        <Routes>
            <Route exact path="/sign-in" element={<SignIn />} />
            <Route exact path="/sign-up" element={<SignUp />} />
            <Route exact path="/" element={<ChatInterface />} />
        </Routes>
        )
}

export default Routesl;
