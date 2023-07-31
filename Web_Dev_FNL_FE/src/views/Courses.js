import React from "react";
import {
  VideoCard,
  MaterialCard,
} from "../components/Basic_Templates/Course_Session_Components.jsx";
import { useState } from "react";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import { message } from "antd";

import { MDBCardText } from "mdb-react-ui-kit";
import {coursePurchase} from "../APIs/studentAPI.jsx"

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  Row,
  Col,
} from "reactstrap";
import {
  CourseDescription,
  TeacherDetails,
} from "components/Basic_Templates/Course_description_components";
import { Checkbox, List } from "antd";
import { getCourseData, isenrolledin } from "../APIs/userAPIs.jsx";
import {
  remove_video_from_course,
  delete_Video,
  remove_Material_from_Course,
  Delete_Material,
} from "../APIs/TeacherAPI.jsx";
import { Button } from "@mui/material";
import "./styleSheet.css";

import { Tabs } from "antd";
import { Check } from "@material-ui/icons";

export function Courses() {
  const [CourseData, setCourseData] = useState();
  const [isDelete, setIsDelete] = useState(true);
  const [checked, setChecked] = useState([]);
  const [toShowChecked, setToShowChecked] = useState([]);
  const [check, setCheck] = useState(false);
  // const [indeterminate, setIndeterminate] = useState(false);

  async function getData() {
    let data = [];
    data = await getCourseData();

    console.log("djhkjnbmnnata", data);

    if (data) {
      setCourseData(data);
      const checker = await isenrolledin(data._id);
      setCheck(checker);
      console.log("akin", checker);
    } else setCourseData();
  }
  useEffect(() => {

    getData();
  }, []);

  const HandleDeleteOnClick = () => {
    setChecked([]);
    setToShowChecked([]);
    setIsDelete((prev) => !prev);
  };

  const HandleCheckbox = (props1, props2) => {
    if (checked.includes(props1)) {
      setChecked(checked.filter((item) => item !== props1)); // props 1 is the id of the video/material
      setToShowChecked(toShowChecked.filter((item) => item !== props2)); // props 2 is the title of the video/material
    } else {
      setChecked([...checked, props1]);
      setToShowChecked([...toShowChecked, props2]);
    }
  };

  const HandleConfirmDelete = () => {
    async function Delete() {
      await remove_video_from_course(checked);
      await delete_Video(checked);
    }

    Delete();
    setIsDelete((prev) => !prev);
  };

  const HandleConfirmDeleteMaterial = () => {
    async function Delete() {
      await remove_Material_from_Course(checked);
      await Delete_Material(checked);
    }

    Delete();
    setIsDelete((prev) => !prev);
  };

  function Add_Vid() {
    let token = window.localStorage.getItem("authtoken");

    const decodedToken = jwtDecode(token);
    const role = decodedToken.role;
    if (role == "2") {
      window.location.href = "/teacher/video_upload";
    } else {
      window.location.href = "/admin/video_upload";
    }
  }

  function Add_Mat() {
    let token = window.localStorage.getItem("authtoken");

    const decodedToken = jwtDecode(token);
    const role = decodedToken.role;
    if (role == "2") {
      window.location.href = "/teacher/material_upload";
    } else {
      window.location.href = "/admin/material_upload";
    }
  }

  let Vid_arr = [];
  let Mat_arr = [];

  if (CourseData) {
    for (let i = 0; i < CourseData.VideoID.length; i++) {
      Vid_arr.push(
        <VideoCard
          title={CourseData.VideoID[i].Name}
          image={CourseData.VideoID[i].Thumbnail}
          url={CourseData.VideoID[i].URL}
          _id={CourseData.VideoID[i]._id}
          Quiz_ID={CourseData.VideoID[i].QuizID}
          Course_ID={check}
          bool={isDelete}
          isPurchased={CourseData?.isPurchased}
        />
      );
    }
    for (let i = 0; i < CourseData.MaterialID.length; i++) {
      Mat_arr.push(
        <MaterialCard
          title={CourseData.MaterialID[i].Name}
          _id={CourseData.MaterialID[i]._id}
          url={CourseData.MaterialID[i].URL}
          Course_ID={check}
          isPurchased={CourseData?.isPurchased}
        />
      );
    }
  }
  const handleClickPurchase = async (props) => {
    console.log("props", props);
    try {
      var result = await coursePurchase(props);
      getData();
      message.success("Course Purchased Successfully");
    } catch (error) {
      message.error("Error in Purchasing Course");
    }

  };
  const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: "1",
      label: <CardText>Description</CardText>,
      children: (
        <>
          {(() => {
            if (CourseData) {
              let token = window.localStorage.getItem("authtoken");
              const decodedToken = jwtDecode(token);
              const role = decodedToken.role;
              return (
                <>
                  
                  <CourseDescription
                    title={"Description"}
                    desc={CourseData.Description}
                  />
                  <TeacherDetails
                    title={"Teacher Details"}
                    name={CourseData.Teacher?.UserName}
                    email={CourseData.Teacher?.Email}
                    desc={CourseData.Teacher?.BIO}
                  />
                  {role == "3" && !CourseData?.isPurchased ?<button style={{
                  backgroundColor: '#008CBA', /* Blue */
                  border: 'none',
                  color: 'white',
                  padding: '15px 32px',
                  textAlign: 'center',
                  textDecoration: 'none',
                  display: 'inline-block',
                  fontSize: '16px',
                  margin: '4px 2px',
                  cursor: 'pointer',
                }}onClick={()=>{handleClickPurchase(CourseData?._id)}} >Purchase Course</button>:null}
                </>
              );
            } else {
              return <p>Loading!</p>;
            }
          })()}
        </>
      ),
    },
    {
      key: "2",
      label: <MDBCardText>Session </MDBCardText>,
      children: (
        <>
          {(() => {
            let token = window.localStorage.getItem("authtoken");

            const decodedToken = jwtDecode(token);
            const role = decodedToken.role;

            if (role == "3") {
              return Vid_arr;
            } else {
              if (isDelete)
                return (
                  <>
                    <Col>
                      <Row style={{ justifyContent: "flex-end" }}>
                        <Button
                          variant="text"
                          className="Button"
                          onClick={Add_Vid}
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
                    {Vid_arr}
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
                        <Button
                          variant="text"
                          className="Button"
                          onClick={HandleConfirmDelete}
                          style={{ justifySelf: "flex-end" }}
                        >
                          confirm
                        </Button>
                      </Row>
                    </Col>

                    <div style={{ marginTop: 20 }}>
                      <p>Selected: {toShowChecked.join(", ")} </p>
                    </div>

                    <List
                      dataSource={Vid_arr}
                      renderItem={(item) => (
                        <List.Item>
                          <List.Item.Meta
                            //  onChange={HandleCheckbox(item.props)}
                            avatar={
                              <Checkbox
                                onChange={() => {
                                  HandleCheckbox(
                                    item.props._id,
                                    item.props.title
                                  );
                                }}
                              />
                            }
                          />
                          {item}
                        </List.Item>
                      )}
                    />
                  </>
                );
            }
          })()}
        </>
      ),
    },
    {
      key: "3",
      label: <CardText>Course Material </CardText>,
      children: (
        <>
          {(() => {
            let token = window.localStorage.getItem("authtoken");

            const decodedToken = jwtDecode(token);
            const role = decodedToken.role;

            if (role == "3") {
              return Mat_arr;
            } else {
              if (isDelete)
                return (
                  <>
                    <Col>
                      <Row style={{ justifyContent: "flex-end" }}>
                        <Button
                          variant="text"
                          className="Button"
                          onClick={Add_Mat}
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
                    {Mat_arr}
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
                        <Button
                          variant="text"
                          className="Button"
                          onClick={HandleConfirmDeleteMaterial}
                          style={{ justifySelf: "flex-end" }}
                        >
                          confirm
                        </Button>
                      </Row>
                    </Col>

                    <div style={{ marginTop: 20 }}>
                      <p>Selected: {toShowChecked.join(", ")} </p>
                    </div>

                    <List
                      dataSource={Mat_arr}
                      renderItem={(item) => (
                        <List.Item>
                          <List.Item.Meta
                            //  onChange={HandleCheckbox(item.props)}
                            avatar={
                              <Checkbox
                                onChange={() => {
                                  HandleCheckbox(
                                    item.props._id,
                                    item.props.title
                                  );
                                }}
                              />
                            }
                          />
                          {item}
                        </List.Item>
                      )}
                    />
                  </>
                );
            }
          })()}
        </>
      ),
    },
  ];
  return (
    <div className="content">
      <Card>
        <CardHeader>
          {(() => {
            if (CourseData) {
              return <CardTitle tag="h3">{CourseData.Name}</CardTitle>;
            } else {
              return <p>Loading!</p>;
            }
          })()}
        </CardHeader>
        <CardBody>
          <Tabs
            centered
            defaultActiveKey="1"
            items={items}
            onChange={onChange}
          ></Tabs>
        </CardBody>
      </Card>
    </div>
  );
}

export default Courses;
