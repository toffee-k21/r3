import logo from "./logo.svg";
import "./App.css";
import {
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
  BrowserRouter,
  Outlet,
} from "react-router-dom";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Reuse from "./pages/Reuse";
import AddItem from "./pages/AddItem";
import NavBar from "./components/NavBar";
// import Offer from "./components/Offer";
// import ChatList from "./pages/ChatList";
import ObjectDetection from "./components/ObjectDetection";
import Chat from "./components/Chat";
import Upload from "./components/Upload";
import Message from "./components/Message";
import Manage from "./pages/Manage";

function App() {
  return (
    <BrowserRouter>
    <NavBar />
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/reuse" element={<Reuse />} />
          <Route path="/additem" element={<AddItem />} />
          <Route path="/reuse" element={<Reuse />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/reuse/:id" element={<Message />} />
          <Route path="/img-detect" element={<ObjectDetection />} />
          <Route path="/upload" element={<Upload />} />
          <Route path = "/manageItem" element = {<Manage />} />
        </Route>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
