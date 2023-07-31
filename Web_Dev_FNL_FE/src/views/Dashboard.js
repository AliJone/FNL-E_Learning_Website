/*!

=========================================================
* Black Dashboard React v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// nodejs library that concatenates classes
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
import axios from "axios";
import { useEffect, useState } from "react";
import Enroll from "../assets/img/enroll.png";
import Left from "../assets/img/Lefter.png";
import Middle from "../assets/img/Middle.png";
import Right from "../assets/img/Right.png";

import { NavLink, Link, useLocation } from "react-router-dom";
// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Table,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";

import { getProfile, getAllCourses , getUserName } from "APIs/userAPIs";
import { getCourse} from "APIs/studentAPI";
import { get_teachers} from "APIs/adminAPI";

// core components
import {
  chartExample1,
  chartExample2,
  chartExample3,
  chartExample4
} from "variables/charts.js";

function StudentDashboard(props) {
  const [bigChartData, setbigChartData] = React.useState("data1");
  const [chartData1, setChartData1] = useState({
    labels: [],
    datasets: [
      {
        label: "Quiz Scores",
        data: [],
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2
      }
    ],
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
  const [chartData2, setChartData2] = useState({
    labels: [],
    datasets: [
      {
        label: "Quiz Scores",
        data: [],
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2
      }
    ],
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
  const [chartData3, setChartData3] = useState({
    labels: [],
    datasets: [
      {
        label: "Quiz Scores",
        data: [],
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2
      }
    ],
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
  const [courseInfo, setCourseInfo] = useState([]);
  const [courseCInfo, setCourseCInfo] = useState([]);

  const [chart1, setChart1] = React.useState("chart1")
  const [chart2, setChart2] = React.useState("chart2")
  const [chart3, setChart3] = React.useState("chart3")
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "SCORE PERCENTAGE",
        data: [],
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2
      }
    ],
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const rtoken = localStorage.getItem('refToken');
        const config = {
          headers: {
            'authorization': `Bearer ${token}`,
            'refresh-Token': rtoken
          }
        };
  
        const response = await getProfile();
  
        const courseNames = response.std.CourseEnrolled.map(course => course.name);
        const courseScore = [];
        const chartData1Labels = [];
        const chartData1Scores = [];
        const chartData2Labels = [];
        const chartData2Scores = [];
        const chartData3Labels = [];
        const chartData3Scores = [];
        const curseInfo = [];
        const curseCInfo = [];
  
        for (let i = 0; i < response.std.CourseEnrolled.length; i++) {
          const courseId = response.std.CourseEnrolled[i].id;
          const courseResponse = await getCourse({ _id: courseId });
          console.log(courseResponse)
          const Name=await getUserName({_id: courseResponse[0].Teacher })
          console.log('Name',Name)
  
          const progressLength = response.std.CourseEnrolled[i].progress.length;
          const videoIdLength = courseResponse[0].VideoID.length;
          const prog = (progressLength / videoIdLength) * 100;
  
          const newCourse = {
            language: courseResponse[0].Language,
            topic: courseResponse[0].Topic,
            teacher: Name,
            progress: prog
          };
  
          if (prog < 100) {
            const newCCourse = {
              name: courseResponse[0].Name,
              description: courseResponse[0].Description
            };
            curseCInfo.push(newCCourse);
          }
  
          console.log(newCourse)
          curseInfo.push(newCourse)
          

  
          let quizScore = 0;
          for (let j = 0; j < progressLength; j++) {
            quizScore += response.std.CourseEnrolled[i].progress[j].score;
          }
  
          const co = (quizScore / (progressLength * 10)) * 100;
          courseScore.push(co);
  
          if (i === 0) {
            setChart1(response.std.CourseEnrolled[i].name);
            for (let j = 0; j < progressLength; j++) {
              chartData1Labels.push(response.std.CourseEnrolled[i].progress[j].name);
              chartData1Scores.push(response.std.CourseEnrolled[i].progress[j].score);
            }
          } else if (i === 1) {
            setChart2(response.std.CourseEnrolled[i].name);
            for (let j = 0; j < progressLength; j++) {
              chartData2Labels.push(response.std.CourseEnrolled[i].progress[j].name);
              chartData2Scores.push(response.std.CourseEnrolled[i].progress[j].score);
            }
          } else if (i === 2) {
            setChart3(response.std.CourseEnrolled[i].name);
            for (let j = 0; j < progressLength; j++) {
              chartData3Labels.push(response.std.CourseEnrolled[i].progress[j].name);
              chartData3Scores.push(response.std.CourseEnrolled[i].progress[j].score);
            }
          }
        }
  
        const newLabels = courseNames;
        const newData = courseScore;
  
        setChartData(prevChartData => ({
          ...prevChartData,
          labels: newLabels,
          datasets: [
            {
              ...prevChartData.datasets[0],
              data: newData
            }
          ]
        }));
  
        setChartData1(prevChartData1 => ({
          ...prevChartData1,
          labels: chartData1Labels,
          datasets: [
            {
              ...prevChartData1.datasets[0],
              data: chartData1Scores
            }
          ]
        }));
  
        setChartData2(prevChartData2 => ({
          ...prevChartData2,
          labels: chartData2Labels,
          datasets: [
            {
              ...prevChartData2.datasets[0],
              data: chartData2Scores
            }
          ]
        }));

        setCourseInfo(curseInfo)
        setCourseCInfo(curseCInfo)

      
  
        setChartData3(prevChartData3 => ({
          ...prevChartData3,
          labels: chartData3Labels,
          datasets: [
            {
              ...prevChartData3.datasets[0],
              data: chartData3Scores
            }
          ]
        }));
      } catch (error) {
        console.error(error);
        // Handle any errors from the API calls
      }
    };
  
    fetchData();
  }, []);
  
  console.log(courseInfo)


  
  return (
    <>
      <div className="content">
        <Row>
          <Col xs="12">
           {chartData.labels.length>=3 ? (
            <Card className="card-chart">
            <CardHeader>
            <Row>
              <Col className="text-left" sm="6">
                <h5 className="card-category">Total Courses</h5>
                <CardTitle tag="h2">Performance</CardTitle>
              </Col>
              <Col sm="6">
                <ButtonGroup>
                </ButtonGroup>
              </Col>
            </Row>
            </CardHeader>
            <CardBody>
            <div className="chart-area">
              <Line data={chartData} options={chartExample1.options} />
            </div>
            </CardBody>
            </Card>
            ) : (
              <Col xs="12" style={{ paddingBottom: "20px" }}>
              <Link to="/student/enrollin">
              <img src={Enroll} alt="Image description" className="img-fluid w-100" />
  </Link>
</Col>
  )}
</Col>

        </Row>
        <Row>
          <Col lg="4">
            {chartData1.labels.length>=1 ? (
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">{chart1}</h5>
                <CardTitle tag="h3">
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={chartData1}
                    options={chartExample2.options}
                  />
                </div>
              </CardBody>
            </Card>
            ) : (
              <Col style={{ paddingBottom: "20px"}}>
              <Link to="/student/enrollin">
              <img src={Left} alt="Image description" className="img-fluid w-100" />
  </Link>
</Col>
  )}
          </Col>
          <Col lg="4">
           {chartData2.labels.length>=1 ? (
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">{chart2}</h5>
                <CardTitle tag="h3">
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Bar
                    data={chartData2}
                    options={chartExample3.options}
                  />
                </div>
              </CardBody>
            </Card>
            ) : (
              <Col style={{ paddingBottom: "20px"}}>
              <Link to="/student/enrollin">
              <img src={Middle} alt="Image description" className="img-fluid w-100" />
  </Link>
</Col>
  )}
          </Col>
          <Col lg="4">
          {chartData3.labels.length>=1 ? (
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">{chart3}</h5>
                <CardTitle tag="h3">
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={chartData3}
                    options={chartExample4.options}
                  />
                </div>
              </CardBody>
            </Card>
           ) : (
            <Col style={{ paddingBottom: "20px"}}>
            <Link to="/student/enrollin">
            <img src={Right} alt="Image description" className="img-fluid w-100" />
</Link>
</Col>
)}
          </Col>
        </Row>
        <Row>
          <Col lg="6" md="12">
            <Card className="card-tasks">
              <CardHeader>
                <h6 className="title d-inline">Courses In Continuity</h6>
                <p className="card-category d-inline"> today</p>
                <UncontrolledDropdown>
                  <DropdownToggle
                    caret
                    className="btn-icon"
                    color="link"
                    data-toggle="dropdown"
                    type="button"
                  >
                    <i className="tim-icons icon-settings-gear-63" />
                  </DropdownToggle>
                  <DropdownMenu aria-labelledby="dropdownMenuLink" right>
                    <DropdownItem
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Action
                    </DropdownItem>
                    <DropdownItem
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Another action
                    </DropdownItem>
                    <DropdownItem
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Something else
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </CardHeader>
              <CardBody>
                <div className="table-full-width table-responsive">
                <Table>
                  <tbody>
                     {courseCInfo.map((course) => (
                     <tr key={course.id}>
                         <td>
          <FormGroup check>
            <Label check>
            </Label>
          </FormGroup>
        </td>
        <td>
          <p className="title">{course.name}</p>
          <p className="text-muted">{course.description}</p>
        </td>
        <td className="td-actions text-right">
          <Button
            color="link"
            id={`tooltip${course.id}`}
            title=""
            type="button"
          >
            <i className="tim-icons icon-minimal-right" />
          </Button>
          <UncontrolledTooltip
            delay={0}
            target={`tooltip${course.id}`}
            placement="right"
          >
            <a href={course.link}>Go to Course</a>
          </UncontrolledTooltip>
        </td>
      </tr>
    ))}
  </tbody>
</Table>
                  
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="6" md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Courses Enrolled In</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Language</th>
                      <th>Topic</th>
                      <th>Teacher</th>
                      <th className="text-center">Progress</th>
                    </tr>
                  </thead>
                  <tbody>
                  {courseInfo.map((course, index) => (
                  <tr key={index}>
                  <td>{course.language}</td>
                  <td>{course.topic}</td>
                  <td>{course.teacher}</td>
                  <td className="text-center">{course.progress}</td>
                  </tr>
                  ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default StudentDashboard;


export function AdminDashboard(props) {
  const [bigChartData, setbigChartData] = React.useState("data1");
  const [chartData1, setChartData1] = useState({
    labels: [],
    datasets: [
      {
        label: "Number of Courses",
        data: [],
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2
      }
    ],
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
  const [chartData2, setChartData2] = useState({
    labels: [],
    datasets: [
      {
        label: "Number of Students",
        data: [],
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2
      }
    ],
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
  const [chartData3, setChartData3] = useState({
    labels: [],
    datasets: [
      {
        label: "Amount($)",
        data: [],
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2
      }
    ],
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
  const [courseInfo, setCourseInfo] = useState([]);
  const [courseCInfo, setCourseCInfo] = useState([]);

  const [chart1, setChart1] = React.useState("chart1")
  const [chart2, setChart2] = React.useState("chart2")
  const [chart3, setChart3] = React.useState("chart3")
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Student Enrollment",
        data: [],
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2
      }
    ],
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const rtoken = localStorage.getItem('refToken');
        const config = {
          headers: {
            'authorization': `Bearer ${token}`,
            'refresh-Token': rtoken
          }
        };
  
        const raw = await getAllCourses();
        

        const sortedCourses = raw.sort((a, b) => b.Students.length - a.Students.length);
  
        const topThreeNames = sortedCourses.slice(0, 3).map(course => course.Name);
        const topThreePrice = sortedCourses.slice(0, 3).map(course => (course.Students.length*10));
        const topThreeStudents = sortedCourses.slice(0, 3).map(course => course.Students.length);
        

        const teachers = await get_teachers()
        console.log(teachers)
        const sortedTeachers = teachers.sort((a, b) => b[1][0].CourseOffered.length - a[1][0].CourseOffered.length);
        const topThreeTeachers = sortedTeachers.slice(0, 3).map(course => course[0].Name);
        const topThreeEnrolled = sortedTeachers.slice(0, 3).map(course => course[1][0].CourseOffered.length);
        console.log('TopN',topThreeNames)
        console.log('TopS',topThreeStudents)

        var response = raw
        if (raw.length > 5){
          response = raw.slice(0,5)
        }
        console.log("yeha say aya yeh ab kia karey",response)
  
        const courseNames = []
        const courseStudents = [];
        const chartData1Labels = [];
        const chartData1Scores = [];
        const chartData2Labels = [];
        const chartData2Scores = [];
        const chartData3Labels = [];
        const chartData3Scores = [];
        const curseInfo = [];
        const curseCInfo = [];
  
        for (let i = 0; i <response.length; i++) {
          const courseId = response[i]._id;
          console.log( '$10',courseId)
          const courseResponse = await getCourse({ _id: courseId });
          console.log('askxdl',courseResponse)
          courseStudents.push(courseResponse[0].Students.length)
          courseNames.push(courseResponse[0].Name)
          const Name=await getUserName({_id: courseResponse[0].Teacher })
          console.log('Name',Name)
          

          const newCourse = {
            language: courseResponse[0].Language,
            topic: courseResponse[0].Topic,
            teacher: Name,
            price: '$10'
          };
  
          if (true) {
            const newCCourse = {
              name: courseResponse[0].Name,
              description: courseResponse[0].Description
            };
            curseCInfo.push(newCCourse);
          }
  
          console.log(newCourse)
          curseInfo.push(newCourse)
          
        }
  
        const newLabels = courseNames;
        const newData = courseStudents;
  
        setChartData(prevChartData => ({
          ...prevChartData,
          labels: newLabels,
          datasets: [
            {
              ...prevChartData.datasets[0],
              data: newData
            }
          ]
        }));
  
        setChartData1(prevChartData1 => ({
          ...prevChartData1,
          labels: topThreeTeachers,
          datasets: [
            {
              ...prevChartData1.datasets[0],
              data: topThreeEnrolled
            }
          ]
        }));
  
        setChartData2(prevChartData2 => ({
          ...prevChartData2,
          labels: topThreeNames,
          datasets: [
            {
              ...prevChartData2.datasets[0],
              data: topThreeStudents
            }
          ]
        }));

        setCourseInfo(curseInfo)
        setCourseCInfo(curseCInfo)

      
  
        setChartData3(prevChartData3 => ({
          ...prevChartData3,
          labels: topThreeNames,
          datasets: [
            {
              ...prevChartData3.datasets[0],
              data: topThreePrice
            }
          ]
        }));
      } catch (error) {
        console.error(error);
        // Handle any errors from the API calls
      }
    };
  
    fetchData();
  }, []);
  
  console.log(courseInfo)


  
  return (
    <>
      <div className="content">
        <Row>
          <Col xs="12">
           {chartData.labels.length>=1 ? (
            <Card className="card-chart">
            <CardHeader>
            <Row>
              <Col className="text-left" sm="6">
                <h5 className="card-category">Total Courses</h5>
                <CardTitle tag="h2">Enrollment</CardTitle>
              </Col>
              <Col sm="6">
                <ButtonGroup>
                </ButtonGroup>
              </Col>
            </Row>
            </CardHeader>
            <CardBody>
            <div className="chart-area">
              <Line data={chartData} options={chartExample1.options} />
            </div>
            </CardBody>
            </Card>
            ) : (
              <Col xs="12" style={{ paddingBottom: "20px" }}>
              <Link to="/student/enrollin">
              <img src={Enroll} alt="Image description" className="img-fluid w-100" />
  </Link>
</Col>
  )}
</Col>

        </Row>
        <Row>
          <Col lg="4">
            {chartData1.labels.length>=1 ? (
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Teachers Offering Most Courses</h5>
                <CardTitle tag="h3">
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={chartData1}
                    options={chartExample2.options}
                  />
                </div>
              </CardBody>
            </Card>
            ) : (
              <Col style={{ paddingBottom: "20px"}}>
              <Link to="/student/enrollin">
              <img src={Left} alt="Image description" className="img-fluid w-100" />
  </Link>
</Col>
  )}
          </Col>
          <Col lg="4">
           {chartData2.labels.length>=1 ? (
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Most Viewed Courses </h5>
                <CardTitle tag="h3">
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Bar
                    data={chartData2}
                    options={chartExample3.options}
                  />
                </div>
              </CardBody>
            </Card>
            ) : (
              <Col style={{ paddingBottom: "20px"}}>
              <Link to="/student/enrollin">
              <img src={Middle} alt="Image description" className="img-fluid w-100" />
  </Link>
</Col>
  )}
          </Col>
          <Col lg="4">
          {chartData3.labels.length>=1 ? (
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Revenue Generated From Courses</h5>
                <CardTitle tag="h3">
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={chartData3}
                    options={chartExample4.options}
                  />
                </div>
              </CardBody>
            </Card>
           ) : (
            <Col style={{ paddingBottom: "20px"}}>
            <Link to="/student/enrollin">
            <img src={Right} alt="Image description" className="img-fluid w-100" />
</Link>
</Col>
)}
          </Col>
        </Row>
        <Row>
          <Col lg="6" md="12">
            <Card className="card-tasks">
              <CardHeader>
                <h6 className="title d-inline">Courses</h6>
                <p className="card-category d-inline"> today</p>
                <UncontrolledDropdown>
                  <DropdownToggle
                    caret
                    className="btn-icon"
                    color="link"
                    data-toggle="dropdown"
                    type="button"
                  >
                    <i className="tim-icons icon-settings-gear-63" />
                  </DropdownToggle>
                  <DropdownMenu aria-labelledby="dropdownMenuLink" right>
                    <DropdownItem
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Action
                    </DropdownItem>
                    <DropdownItem
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Another action
                    </DropdownItem>
                    <DropdownItem
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Something else
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </CardHeader>
              <CardBody>
                <div className="table-full-width table-responsive">
                <Table>
                  <tbody>
                     {courseCInfo.map((course) => (
                     <tr key={course.id}>
                         <td>
          <FormGroup check>
            <Label check>
            </Label>
          </FormGroup>
        </td>
        <td>
          <p className="title">{course.name}</p>
          <p className="text-muted">{course.description}</p>
        </td>
        <td className="td-actions text-right">
          <Button
            color="link"
            id={`tooltip${course.id}`}
            title=""
            type="button"
          >
            <i className="tim-icons icon-minimal-right" />
          </Button>
          <UncontrolledTooltip
            delay={0}
            target={`tooltip${course.id}`}
            placement="right"
          >
            <a href={course.link}>Go to Course</a>
          </UncontrolledTooltip>
        </td>
      </tr>
    ))}
  </tbody>
</Table>
                  
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="6" md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Courses Description</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Language</th>
                      <th>Topic</th>
                      <th>Teacher</th>
                      <th className="text-center">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                  {courseInfo.map((course, index) => (
                  <tr key={index}>
                  <td>{course.language}</td>
                  <td>{course.topic}</td>
                  <td>{course.teacher}</td>
                  <td className="text-center">{course.price}</td>
                  </tr>
                  ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export function TeachersDashboard(props) {
  const [bigChartData, setbigChartData] = React.useState("data1");
  const [chartData1, setChartData1] = useState({
    labels: [],
    datasets: [
      {
        label: "Quiz Scores",
        data: [],
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2
      }
    ],
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
  const [chartData2, setChartData2] = useState({
    labels: [],
    datasets: [
      {
        label: "Quiz Scores",
        data: [],
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2
      }
    ],
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
  const [chartData3, setChartData3] = useState({
    labels: [],
    datasets: [
      {
        label: "Quiz Scores",
        data: [],
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2
      }
    ],
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
  const [courseInfo, setCourseInfo] = useState([]);
  const [courseCInfo, setCourseCInfo] = useState([]);

  const [chart1, setChart1] = React.useState("chart1")
  const [chart2, setChart2] = React.useState("chart2")
  const [chart3, setChart3] = React.useState("chart3")
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Student Enrollment",
        data: [],
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2
      }
    ],
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const rtoken = localStorage.getItem('refToken');
        const config = {
          headers: {
            'authorization': `Bearer ${token}`,
            'refresh-Token': rtoken
          }
        };
  
        const response = await getProfile();
        console.log("yeha say aya yeh ab kia karey",response.data)
  
        const courseNames = []
        const courseStudents = [];
        const chartData1Labels = [];
        const chartData1Scores = [];
        const chartData2Labels = [];
        const chartData2Scores = [];
        const chartData3Labels = [];
        const chartData3Scores = [];
        const curseInfo = [];
        const curseCInfo = [];
  
        for (let i = 0; i < response.data.teacher.CourseOffered.length; i++) {
          const courseId = response.data.teacher.CourseOffered[i]._id;
          const courseResponse = await getCourse({ _id: courseId });
          console.log('askxdl',courseResponse)
          courseStudents.push(courseResponse[0].Students.length)
          courseNames.push(courseResponse[0].Name)
          const Name=await getUserName({_id: courseResponse[0].Teacher })
          console.log('Name',Name)
  
  
          const newCourse = {
            language: courseResponse[0].Language,
            topic: courseResponse[0].Topic,
            teacher: Name,
            price: '$10'
          };
  
          if (true) {
            const newCCourse = {
              name: courseResponse[0].Name,
              description: courseResponse[0].Description
            };
            curseCInfo.push(newCCourse);
          }
  
          console.log(newCourse)
          curseInfo.push(newCourse)
          
        }
  
        const newLabels = courseNames;
        const newData = courseStudents;
  
        setChartData(prevChartData => ({
          ...prevChartData,
          labels: newLabels,
          datasets: [
            {
              ...prevChartData.datasets[0],
              data: newData
            }
          ]
        }));
  
        setChartData1(prevChartData1 => ({
          ...prevChartData1,
          labels: chartData1Labels,
          datasets: [
            {
              ...prevChartData1.datasets[0],
              data: chartData1Scores
            }
          ]
        }));
  
        setChartData2(prevChartData2 => ({
          ...prevChartData2,
          labels: chartData2Labels,
          datasets: [
            {
              ...prevChartData2.datasets[0],
              data: chartData2Scores
            }
          ]
        }));

        setCourseInfo(curseInfo)
        setCourseCInfo(curseCInfo)

      
  
        setChartData3(prevChartData3 => ({
          ...prevChartData3,
          labels: chartData3Labels,
          datasets: [
            {
              ...prevChartData3.datasets[0],
              data: chartData3Scores
            }
          ]
        }));
      } catch (error) {
        console.error(error);
        // Handle any errors from the API calls
      }
    };
  
    fetchData();
  }, []);
  
  console.log(courseInfo)


  
  return (
    <>
      <div className="content">
        <Row>
          <Col xs="12">
           {chartData.labels.length>=1 ? (
            <Card className="card-chart">
            <CardHeader>
            <Row>
              <Col className="text-left" sm="6">
                <h5 className="card-category">Total Courses</h5>
                <CardTitle tag="h2">Enrollment</CardTitle>
              </Col>
              <Col sm="6">
                <ButtonGroup>
                </ButtonGroup>
              </Col>
            </Row>
            </CardHeader>
            <CardBody>
            <div className="chart-area">
              <Line data={chartData} options={chartExample1.options} />
            </div>
            </CardBody>
            </Card>
            ) : (
              <Col xs="12" style={{ paddingBottom: "20px" }}>
              <Link to="/student/enrollin">
              <img src={Enroll} alt="Image description" className="img-fluid w-100" />
  </Link>
</Col>
  )}
</Col>

        </Row>
        <Row>
          <Col lg="4">
            {chartData1.labels.length>=1 ? (
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">{chart1}</h5>
                <CardTitle tag="h3">
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={chartData1}
                    options={chartExample2.options}
                  />
                </div>
              </CardBody>
            </Card>
            ) : (
              <Col style={{ paddingBottom: "20px"}}>
              <Link to="/student/enrollin">
              <img src={Left} alt="Image description" className="img-fluid w-100" />
  </Link>
</Col>
  )}
          </Col>
          <Col lg="4">
           {chartData2.labels.length>=1 ? (
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">{chart2}</h5>
                <CardTitle tag="h3">
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Bar
                    data={chartData2}
                    options={chartExample3.options}
                  />
                </div>
              </CardBody>
            </Card>
            ) : (
              <Col style={{ paddingBottom: "20px"}}>
              <Link to="/student/enrollin">
              <img src={Middle} alt="Image description" className="img-fluid w-100" />
  </Link>
</Col>
  )}
          </Col>
          <Col lg="4">
          {chartData3.labels.length>=1 ? (
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">{chart3}</h5>
                <CardTitle tag="h3">
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={chartData3}
                    options={chartExample4.options}
                  />
                </div>
              </CardBody>
            </Card>
           ) : (
            <Col style={{ paddingBottom: "20px"}}>
            <Link to="/student/enrollin">
            <img src={Right} alt="Image description" className="img-fluid w-100" />
</Link>
</Col>
)}
          </Col>
        </Row>
        <Row>
          <Col lg="6" md="12">
            <Card className="card-tasks">
              <CardHeader>
                <h6 className="title d-inline">Courses</h6>
                <p className="card-category d-inline"> today</p>
                <UncontrolledDropdown>
                  <DropdownToggle
                    caret
                    className="btn-icon"
                    color="link"
                    data-toggle="dropdown"
                    type="button"
                  >
                    <i className="tim-icons icon-settings-gear-63" />
                  </DropdownToggle>
                  <DropdownMenu aria-labelledby="dropdownMenuLink" right>
                    <DropdownItem
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Action
                    </DropdownItem>
                    <DropdownItem
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Another action
                    </DropdownItem>
                    <DropdownItem
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Something else
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </CardHeader>
              <CardBody>
                <div className="table-full-width table-responsive">
                <Table>
                  <tbody>
                     {courseCInfo.map((course) => (
                     <tr key={course.id}>
                         <td>
          <FormGroup check>
            <Label check>
            </Label>
          </FormGroup>
        </td>
        <td>
          <p className="title">{course.name}</p>
          <p className="text-muted">{course.description}</p>
        </td>
        <td className="td-actions text-right">
          <Button
            color="link"
            id={`tooltip${course.id}`}
            title=""
            type="button"
          >
            <i className="tim-icons icon-minimal-right" />
          </Button>
          <UncontrolledTooltip
            delay={0}
            target={`tooltip${course.id}`}
            placement="right"
          >
            <a href={course.link}>Go to Course</a>
          </UncontrolledTooltip>
        </td>
      </tr>
    ))}
  </tbody>
</Table>
                  
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="6" md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Courses Description</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Language</th>
                      <th>Topic</th>
                      <th>Teacher</th>
                      <th className="text-center">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                  {courseInfo.map((course, index) => (
                  <tr key={index}>
                  <td>{course.language}</td>
                  <td>{course.topic}</td>
                  <td>{course.teacher}</td>
                  <td className="text-center">{course.price}</td>
                  </tr>
                  ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}