import logo from './logo.svg';
import './App.css';
import {
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
  BrowserRouter,
  Outlet,
} from "react-router-dom";
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Reuse from './pages/Reuse';

function App() {
  return (
      <BrowserRouter>
<Routes>
  <Route element={<PrivateRoute />}>
    <Route path='/' element={<Home />} />
    <Route path='/reuse' element={<Reuse />} />
  </Route>
  <Route path="/signin" element={<SignIn />}/>
  <Route path="/signup" element={<SignUp />}/>
</Routes>
      </BrowserRouter>
  );
}

export default App;
