import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Formik, Field, Form } from "formik";
import './login.css'
const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);

  const getUser = `
{
      allUsers{
        data{
          _id
          isStudent
          name
          rollNo
          pass
        }
      }
    }`;

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios({
        url: "https://graphql.fauna.com/graphql",
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_FAUNA}`,
        },
        data: {
          query: getUser,
        },
      });
      setUser(data.data.allUsers.data);
      console.log(data.data.allUsers.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      onSubmit={(values) => {
        const check = user.filter(
          (u) =>
            u.rollNo === values.username &&
            u.pass === values.password
        );
        console.log(check)
        if (check.length !== 0 && check[0].isStudent === true) {
          navigate("/qr", { state: check });
        }else if(check.length !== 0 && check[0].isStudent === false){
          navigate("/courses");
        }else {
              alert("username or password is incorrect")
        }
      }}
    >
      {({ values }) => (
        <div className="login-box">
          <Form>
            <div>
              <div className="group log-input">
                <Field className="input" type="text" name="username" placeholder="Username" autocomplete="off"/>
              </div>
              <div className="group log-input">
                <Field className="input" type="password" name="password" placeholder="Password" autocomplete="off"/>
              </div>
            </div>
<div className="container-log-btn">
<button className="log-form-btn" type="submit">LOGIN</button>

</div>
          </Form>
        </div>
      )}
    </Formik>
    </div>

  );
};

export default Login;


 