import React, { Fragment, useState, useEffect } from "react";

import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";

import { toast } from "react-toastify";

//components

import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import Courses from "./components/courses";
import Departments from "./components/departments";
import Instructors from "./components/instructors";
import CourseInfo from "./components/CourseInfo";
import InstructorInfo from "./components/InstructorInfo";
import DepartmentInfo from "./components/DepartmentInfo";

//toast.configure();

function App() {
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const checkAuthenticated = async () => {
    try {
      const res = await fetch("http://localhost:5000/authentication/verify", {
        method: "POST",
        headers: { jwt_token: localStorage.token }
      });

      const parseRes = await res.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };

  return (
    <Fragment>
      <Router>
        <div className="container">
          
          <Routes>
            <Route
              path="/"
              element= {<Navigate to="/login" />}
            />
            <Route
              path="/login"
              element= {!isAuthenticated ? (<Login setAuth={setAuth} />) : (<Navigate to="/dashboard" />)}
            />
            <Route
              path="/register"
              element={!isAuthenticated ? (<Register setAuth={setAuth} />) : (<Navigate to="/dashboard" />)}
            />
            <Route
              path="/home"
              element={isAuthenticated ? (<Home setAuth={setAuth} />) : (<Navigate to="/login" />)}
            />
            <Route
              path="/dashboard"
              element={isAuthenticated ? (<Dashboard setAuth={setAuth} />) : (<Navigate to="/login" />)}
            />
            <Route
              path="/courses"
              element={<Courses />}
            />
            <Route
              path="/departments"
              element={<Departments/>}
            />
            <Route
              path="/instructors"
              element={<Instructors />}
            />
            <Route
              path="/courses/:course_id"
              element={<CourseInfo />}
            />
            <Route
              path="/instructor/:id"
              element={<InstructorInfo />}
            />
            <Route
              path="/departments/:dept_name/courses"
              element={<DepartmentInfo />}
            />
            
            
          </Routes>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
