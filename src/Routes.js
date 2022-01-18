import { Route, Switch, useParams, useLocation, BrowserRouter as router } from 'react-router-dom'
import { Register } from './Pages/register/Register';

const Routes = () => {  
    const params = useParams();
    const location = useLocation();

    return (
        <router>
            <Switch>
                <Route exact path="/" component={Register} />
            </Switch>
        </router>
    )
}


