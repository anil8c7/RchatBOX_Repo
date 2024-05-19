import React from "react";
import SignUp from "./components/signup/SignUp";
import Login from "./components/login/Login";
import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from "react-router-dom";
function App() {
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path="/" element={<Login />} />
    <Route path="/signup" element={<SignUp />} />
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
