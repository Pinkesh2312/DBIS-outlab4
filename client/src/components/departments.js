import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";

const Departments = ({ setAuth }) => {
  const [departments, setDepartments] = useState("");
  const [id, setId] = useState("");

  const getInfo = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/departments", {
        method: "GET",
        headers: { jwt_token: localStorage.token }
      });

      const parseData = await res.json();
      setDepartments(parseData.departments);
    } catch (err) {
      console.error(err.message);
    }
  };
  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      //toast.success("Logout successfully");
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

//   console.log(Data.courses[0].id)
  return (
    <div>
      <li><Link to="/dashboard">Dashboard</Link></li>
      <h2>Departments</h2>
      <ol>
        {departments && departments.map(data => <li><Link to={"/departments/" + data.dept_name + "/courses/"}>
          {data.dept_name}</Link> 
        </li>)}
      </ol> 
    </div>
    
  );
};

export default Departments;