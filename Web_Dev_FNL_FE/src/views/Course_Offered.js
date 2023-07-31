import React from "react";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { CourseOfferedCardTemplate } from "components/Basic_Templates/Course_Offered_Card_Template";
import { Button } from "@mui/material";
import "../components/Basic_Templates/styleSheet.css";
import { getAllCourses, enrolin } from "../APIs/userAPIs.jsx";
import { Course_Offered_By_Teacher } from "../APIs/TeacherAPI.jsx";
import jwtDecode from "jwt-decode";

// import {Course} from "./Course.js";

function Courses_Offered() {
  const [isDelete, setIsDelete] = useState(true);
  const [checked, setChecked] = useState([]);
  const [toShowChecked, setToShowChecked] = useState([]);

  const HandleDeleteOnClick = () => {
    setIsDelete((prev) => !prev);
  };

  let token = window.localStorage.getItem("authtoken");

  const decodedToken = jwtDecode(token);
  const role = decodedToken.role;

  const [Courses, setCourses] = useState();

  function handleAdd() {
    if (role === "2") {
      window.location.href = "/teacher/course_upload";
    } else if (role === "1") {
      window.location.href = "/admin/course_upload";
    }
  }

  useEffect(() => {
    async function getCourses() {
      let data = [];
      if (role === "3") {
        data = await enrolin();
        console.log("tehhjv", data);
      } else {
        data = await Course_Offered_By_Teacher();
        // console.log("useEffect -> getAllCourses-> data");
        console.log(data["teacher"]["CourseOffered"]);
      }

      if (role === "2" || role === "1") {
        setCourses(data["teacher"]["CourseOffered"]);
      } else {
        setCourses(data);
        console.log("hugaya");
      }
    }
    getCourses();
  }, []);
  console.log("huga", Courses);

  return (
    <div className="content">
      <Card>
        <CardHeader>
          <Col>
            {role === "3" ? (
              <h3 className="title">Courses</h3>
            ) : (
              <h3 className="title">Courses Offered</h3>
            )}
          </Col>
        </CardHeader>
        <CardBody>
          {(() => {
            const array_to_render = [];

            function make_element(name, desc, _id) {
              return (
                <CourseOfferedCardTemplate
                  title={name}
                  desc={desc}
                  _id={_id}
                  isDelete={isDelete}
                  setisDelete={setIsDelete}
                />
              );
            }

            function make_row_element(i, x) {
              return (
                <Row>
                  {(() => {
                    let array = [];
                    for (let j = 0; j < 4; j++) {
                      if (x[i][j])
                        array.push(
                          make_element(
                            x[i][j].Name,
                            x[i][j].Description,
                            x[i][j]._id
                          )
                        );
                    }
                    console.log(array);
                    return array;
                  })()}
                </Row>
              );
            }

            if (Courses) {
              console.log("dndjjn", Courses);
              console.log(Courses.length);
              console.log(parseInt(Courses.length / 4));
              let x = [];
              for (let i = 0; i <= parseInt(Courses.length / 4); i++) {
                if (!x[i]) {
                  x[i] = [];
                }
                for (let j = 0; j < 4; j++) {
                  if (Courses[i * 4 + j]) {
                    console.log(i * 4 + j, " ", Courses[i * 4 + j]);
                    x[i][j] = Courses[i * 4 + j];
                    console.log(i * 4 + j, " ", x[i][j], " waha hugaya hai");
                  }
                }
              }
              for (let i = 0; i <= parseInt(Courses.length / 4); i++) {
                array_to_render.push(make_row_element(i, x));
              }
              // return array_to_render;

              return (
                <>
                  {(() => {
                    let token = window.localStorage.getItem("authtoken");

                    const decodedToken = jwtDecode(token);
                    const role = decodedToken.role;

                    if (role == "3") {
                      return array_to_render;
                    } else {
                      if (isDelete)
                        return (
                          <>
                            <Col>
                              <Row style={{ justifyContent: "flex-end" }}>
                                <Button
                                  variant="text"
                                  className="Button"
                                  onClick={handleAdd}
                                  style={{ justifySelf: "flex-end" }}
                                >
                                  ADD +
                                </Button>
                                <Button
                                  variant="text"
                                  className="Button"
                                  onClick={HandleDeleteOnClick}
                                  style={{ justifySelf: "flex-end" }}
                                >
                                  Delete -
                                </Button>
                              </Row>
                            </Col>
                            {array_to_render}
                          </>
                        );
                      else
                        return (
                          <>
                            <Col>
                              <Row style={{ justifyContent: "flex-end" }}>
                                <Button
                                  variant="text"
                                  className="Button"
                                  onClick={HandleDeleteOnClick}
                                  style={{ justifySelf: "flex-end" }}
                                >
                                  cancel
                                </Button>
                              </Row>
                            </Col>

                            {array_to_render}
                          </>
                        );
                    }
                  })()}
                </>
              );
            } else {
              return <p>LOADING!</p>;
            }
          })()}
        </CardBody>
      </Card>
    </div>
  );
}

export default Courses_Offered;
