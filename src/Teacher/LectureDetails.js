import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import QRCODEGenerator from "./QRCODEGenerator";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Expire from "../components/Expire";

const LectureDetails = () => {
  const { slug2 } = useParams();
  const [list, setList] = useState([]);
  const [show, setShow] = useState(false);
  const lecture = `
      
      query($id: ID!){
        findLectureByID(id: $id){
          attendance{
            name
            rollNo
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
          query: lecture,
          variables: {
            id: slug2,
          },
        },
      });

      setList(
        data.data.findLectureByID.attendance.sort((a, b) =>
          a.rollNo > b.rollNo ? 1 : b.rollNo > a.rollNo ? -1 : 0
        )
      );
      console.log(data.data.findLectureByID.attendance);
    };
    fetchData();
  }, []);

  return (
    <div>
      <div style={{width: "90%",margin: "3% auto 3% auto"}}>
        <span style={{ margin: "1%",fontSize: "2rem" }}>Attendance List</span>
        <button
          onClick={(e) => {
                setShow(true)
          }}
          style={{
            backgroundColor: "#189CDA",
            padding: "12px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
            float: "right",
          }}
        >
          Generate QR-CODE
        </button>
      </div>

      <div style={{ width: "90%", margin: "auto" }}>
        <TableContainer component={Paper}>
          <Table c aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  style={{ backgroundColor: "#189CDA", color: "#fff" }}
                >
                  S.NO
                </TableCell>
                <TableCell
                  style={{ backgroundColor: "#189CDA", color: "#fff" }}
                >
                  Name
                </TableCell>
                <TableCell
                  style={{ backgroundColor: "#189CDA", color: "#fff" }}
                >
                  Roll Number
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list &&
                list.map((l, idx) => (
                  <TableRow>
                    <TableCell>{idx}</TableCell>
                    <TableCell>{l.name}</TableCell>
                    <TableCell>{l.rollNo}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div style={{ margin: "1% auto 1% auto", width: "10%" }}></div>
      <div style={{ width: "40%", margin: "auto" }}>
        {show && <Expire delay={10000} ><QRCODEGenerator value={slug2} /></Expire>}
      </div>
    </div>
  );
};

export default LectureDetails;
