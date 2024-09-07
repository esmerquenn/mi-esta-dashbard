import React from "react";
import LayoutHome from "./LayoutHome";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Posts from "./Pages/Posts";
import Brands from "./Pages/Brands";
import About from "./Pages/About";
import Settings from "./Pages/Settings.jsx";
import Auth from "./Auth";
import { CookiesProvider } from "react-cookie";
import NotFound from "./Pages/NotFound";
import UpdatePost from "./components/Posts/UpdatePost";
import UpdateEmployee from "./components/EmployeeStaff/UpdateEmployee.jsx";
import AddEmployee from "./components/EmployeeStaff/AddEmployee.jsx";
import Employees from "./Pages/Employee";
import AddPost from "./components/Posts/AddPost.jsx";
import Login from "./Pages/Login.jsx";

function App() {
  return (
    <CookiesProvider defaultSetOptions={{ path: "/" }}>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route
            path="/"
            element={
              <Auth>
                <LayoutHome />
              </Auth>
            }
          >
            <Route index element={<Posts />} />
            <Route path="posts">
              <Route path="add" element={<AddPost />} />
              <Route path="update/:postId" element={<UpdatePost />} />
            </Route>
            <Route path="/brands" element={<Brands />} />
            <Route path="employee">
              <Route index element={<Employees />} />
              <Route path="add" element={<AddEmployee />} />
              <Route path="update/:employeeId" element={<UpdateEmployee />} />
            </Route>
            <Route path="/about" element={<About />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
  );
}

export default App;
