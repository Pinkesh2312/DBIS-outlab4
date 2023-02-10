import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";

const Courses = ({ setAuth }) => {
  const [info, setInfo] = useState("");

  const getInfo = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/courses", {
        method: "GET",
        headers: { jwt_token: localStorage.token }
      });

      const parseData = await res.json();
      setInfo(parseData);
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
    console.log(info)
  }, []);

//   console.log(Data.courses[0].id)
  return (
    <div>
      {/* <h1 className="mt-5">Courses</h1>
      <h3>Title {info.cinfo.title}</h3>
      <h3>Department {info.cinfo.dept_name}</h3>
      <h3>Credits {info.cinfo.credits}</h3> */}
      <li><Link to="/dashboard">Dashboard</Link></li>
      <h2>Courses</h2>
      <ol>
        {info.courses && info.courses.map(data => <li><Link to={"/courses/" + data.course_id}>
          {data.course_id} - {data.title}
          </Link>
          <ul>
            <li>Department: {data.dept_name}</li>
            <li>Credits: {data.credits}</li>
          </ul>
        </li>)}
      </ol>
      <ul>
      </ul>
    </div>
    
  );
};

export default Courses;
