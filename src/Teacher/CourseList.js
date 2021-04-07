import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Outlet } from "react-router-dom";

const CourseList = () => {
  const [list, setList] = useState([]);
  const getAllCourses = `
      {
            allCourses{
              data{
                name
                id
                _id
              }
            }
          }
      `;

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios({
        url: "https://graphql.fauna.com/graphql",
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_FAUNA}`,
        },
        data: {
          query: getAllCourses,
        },
      });
      setList(data.data.allCourses.data);
      console.log(data.data.allCourses);
    };
    fetchData();
  }, []);

  return (
    <div>
      <div style={{textAlign: "center",margin: "3% 0 1% 0"}}>
        <h1>DEPARTMENT OF COMPUTER SYSTEM ENGINEERING</h1>
      </div>
      <div class="container">
      <div class="row">
      {list &&
        list.map((l) => (
          <div class="col">
          <Link to={`/courses/${l.id}`}>
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">{l.id}</h5>
                <h3 >{l.name}</h3><span style={{color: "#0043c9",fontWeight: "500",float:"right",fontSize: "1.5rem"}}>5th</span>
              </div>
            </div>
          </Link>
          </div>
          
        ))}
      </div>
      
      </div>
      
      <Outlet />
    </div>
  );
};

export default CourseList;
