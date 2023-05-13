import { Redirect } from 'react-router-dom';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useAuth } from '../hooks';
import {Home, Login, Signup, Settings, UserProfile} from '../pages';
import {Loader} from './';
import Navbar from './Navbar';

function PrivateRoute({ children, ...rest }) {
  const auth = useAuth();

  return (
    <Route {...rest} render={() => {
      if (auth.user) {
        return children;
      }
      return <Redirect to='/login'></Redirect>
    }}>
    </Route>
  );
}

const Page404 = () => {
  return <h1> 404 </h1>
}

function App() {
  const auth = useAuth();

  if (auth.loading) {
    return <Loader></Loader>
  }

  return (
    <div className="App">
      <Router>
        <Navbar></Navbar>
        <Switch>
          <Route exact path='/'>
            <Home></Home>
          </Route>

          <Route exact path='/login'>
            <Login></Login>
          </Route>

          <Route exact path='/register'>
            <Signup></Signup>
          </Route>

          <PrivateRoute exact path='/settings'>
            <Settings></Settings>
          </PrivateRoute>

          <PrivateRoute exact path='/user/:userId'>
            <UserProfile></UserProfile>
          </PrivateRoute>

          <Route>
            <Page404></Page404>
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;