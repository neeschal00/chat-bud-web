import { Route,Routes, useParams, useLocation} from 'react-router-dom'
import { SignUp } from './Pages/register/SignUp';
import { SignIn } from './Pages/register/SignIn';

const Routesl = () => {  
    const params = useParams();
    const location = useLocation();

    return (
        <Routes>
            <Route path="/sign-in" element={<SignIn />} />
            <Route exact path="/sign-up" element={<SignUp />} />
        </Routes>
        )
}

export default Routesl;
