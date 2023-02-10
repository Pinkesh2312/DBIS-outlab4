import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";

const Instructors = ({ setAuth }) => {
  const [instructors, setInstructors] = useState("");
  const [id, setId] = useState("");

  const getInfo = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/instructor", {
        method: "GET",
        // headers: { jwt_token: localStorage.token }
      });

      const parseData = await res.json();
      setInstructors(parseData.instructors);
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
//   console.log(instructors)
  return (
    <div>
      <li><Link to="/dashboard">Dashboard</Link></li>
      <h1>Instructors</h1>
      <ol>
        {instructors && instructors.map(data => <li><Link to={"/instructor/" + data.id}>
          {data.name}</Link> Department : {data.dept_name}
        </li>)}
      </ol> 
    </div>
    
  );
};

export default Instructors;