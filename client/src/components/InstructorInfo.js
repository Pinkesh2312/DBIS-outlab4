import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";

const InstructorInfo = ({ setAuth }) => {
  const [info, setInfo] = useState("");
  const [previous, setPrevious] = useState("");
  const [current, setCurrent] = useState("");
  const [id, setId] = useState("");

  const getInfo = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/instructor/:id", {
        method: "GET",
        // headers: { jwt_token: localStorage.token }
      });

      const parseData = await res.json();
      setInfo(parseData.information);
      setPrevious(parseData.previous_courses);
      setCurrent(parseData.current_courses);
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
      {/* <h1>{info}</h1> */}
      <h3>Current Courses</h3>
      <ol>
        {current && current.map(data => <li><Link to={"/courses/" + data.course_id}>
          {data.course_id}</Link> : {data.title} Grade: {data.grade}
        </li>)}
      </ol>
      <h3>Previous Courses</h3>
      <ol>
        {previous && previous.map(data => <li><Link to={"/courses/" + data.course_id}>
          {data.course_id}</Link> : {data.title} Grade: {data.grade}
        </li>)}
      </ol> 
    </div>
    
  );
};

export default InstructorInfo;