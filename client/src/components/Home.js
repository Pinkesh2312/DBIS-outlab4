import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";

const Home = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [cred, setCred] = useState("");
  const [current, setCurrent] = useState("");
  const [previous, setPrevious] = useState("");

  const getInfo = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/home", {
        method: "POST",
        headers: { jwt_token: localStorage.token }
      });

      const parseData = await res.json();
      setName(parseData.information.name);
      setCred(parseData.information.tot_cred);
      setCurrent(parseData.current_courses);
      setPrevious(parseData.previous_courses);
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
      <h1 className="mt-5">Home</h1>
      <h2>Welcome {name}</h2>
      <h3>Your Total Credits are {cred}</h3>
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
      <ul>
      <li><Link to="/dashboard">Dashboard</Link></li>
      <li><Link to="/home/registration">Registration</Link></li>
      </ul>
    </div>
    
  );
};

export default Home;
