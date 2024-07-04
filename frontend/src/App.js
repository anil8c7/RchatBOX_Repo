import React from "react";
import SignUp from "./components/signup/SignUp";
import Login from "./components/login/Login";
import PrivateRoutes from "./pages/admin/PrivateRoutes";
import Chatbox from "./pages/user/Chatbox";
import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from "react-router-dom";
function App() {
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path="/" element={<Login />} />
    <Route path="/admin" element={<Login />} />
    <Route path="/signup" element={<SignUp />} />
    <Route  element={<PrivateRoutes />}>
      <Route path="chat" element={<Chatbox />} />
    </Route>
    </>
  )
);
return (
  <>
    <RouterProvider router={router} />
  </>
);
}

export default App;
