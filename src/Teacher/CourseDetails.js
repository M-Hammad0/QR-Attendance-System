import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Formik, Field, Form } from "formik";

const CourseDetails = () => {
  const { slug } = useParams();
  const [title, setTitle] = useState("");
  const [list, setList] = useState([]);
  const getCourseDetails = `
      
      {
        allLectures{
          data{
            _id
            id
            course{
              id
              name
            }
          }
        }
      }
      
      `;
  const createLecture = `
      mutation($id: String!, $connect: ID!){
            createLecture(data: {id: $id, course: {connect: $connect}}){
              course{
                name
              }
            }
          }
      `;

  const fetchData = async () => {
    const { data } = await axios({
      url: "https://graphql.fauna.com/graphql",
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_FAUNA}`,
      },
      data: {
        query: getCourseDetails,
      },
    });
    setList(data.data.allLectures.data);
    setTitle(
      data.data.allLectures.data.filter((d) => d.course.id === slug)[0].course
        .name
    );
    console.log(
      data.data.allLectures.data.filter((d) => d.course.id === slug)[0].course
        .name
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1 style={{ margin: "1% 0 1% 1%" }}>{title}</h1>
      <Formik
        initialValues={{
          lectureID: "",
          course: "",
        }}
        onSubmit={async (values) => {
        await axios({
            url: "https://graphql.fauna.com/graphql",
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_FAUNA}`,
            },
            data: {
              query: createLecture,
              variables: {
                id: values.lectureID,
                connect: values.course,
              },
            },
          });
            fetchData();

        }}
      >
        {({ values }) => (
          <div style={{ marginLeft: "1%" }}>
            <Form>
              <div>
                <label>
                  <input
                    type="radio"
                    name="course"
                    value="295111195866694145"
                  />
                </label>
                <label>Operating Systems</label>
                <br></br>
                <label>
                  <Field
                    type="radio"
                    name="course"
                    value="295111232886669825"
                  />
                  <label>Signals & Systems</label>
                </label>
                <br></br>
                <label>
                  <Field
                    type="radio"
                    name="course"
                    value="295058545481613825"
                  />
                  <label>Probability & Statistics</label>
                </label>
                <br></br>
                <label>
                  <Field
                    type="radio"
                    name="course"
                    value="295058612019003905"
                  />
                  <label>Web Engineering</label>
                </label>
                <br></br>
                <label>
                  <input
                    type="radio"
                    name="course"
                    value="295058633250570753"
                  />
                  <label>Microprocessor Based System Design</label>
                </label>
                <br></br>
                <label>
                  <label>Lecture No</label>
                  <Field type="text" id="lectureID" name="lectureID" />
                </label>
              </div>

              <div>
                <button
                type="submit"
                  style={{
                    backgroundColor: "#189CDA",
                    padding: "5px 20px",
                    borderRadius: "5px",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Submit
                </button>
              </div>
            </Form>
          </div>
        )}
      </Formik>

      <h1 style={{ textAlign: "center", margin: "2% 0 2% 0" }}>Lectures</h1>
      <div class="container">
        <div class="row">
          {list &&
            list
              .filter((a) => a.course.id === slug)
              .map((l) => (
                <div class="col">
                  <div style={{ textAlign: "center" }} class="card">
                    <Link to={`/courses/${slug}/${l._id}`}>
                      <h5>Lecture {l.id}</h5>
                    </Link>
                  </div>
                </div>
              ))}
        </div>
      </div>

      <div></div>
    </div>
  );
};

export default CourseDetails;
