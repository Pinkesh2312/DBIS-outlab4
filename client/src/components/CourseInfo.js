import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";

const CourseInfo = ({ setAuth }) => {
  const [info, setInfo] = useState("");

  const getInfo = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/courses/:course_id", {
        method: "GET",
        headers: { jwt_token: localStorage.token }
      });

      const parseData = await res.json();
      setInfo(parseData);
      console.log(info.cinfo);
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
      
      {/* <h3>Title {info.cinfo.title}</h3>
      <h3>Department {info.cinfo.dept_name}</h3>
      <h3>Credits {info.cinfo.credits}</h3> */}
      <h2>Prerequisites</h2>
      <ol>
        {info.prereqs && info.prereqs.map(data => <li><Link to={"/courses/" + data.course_id}>
          {data.course_id}</Link>
        </li>)}
      </ol>
      <ul>
      <li><Link to="/dashboard">Dashboard</Link></li>
      </ul>
    </div>
    
  );
};

export default CourseInfo;
