import React from "react";
import { Card , CardBody,CardHeader, CardTitle,CardText, Col} from "reactstrap";
import {Button} from "@mui/material"
import "./styleSheet.css"
import {Link} from "react-router-dom" ;
import jwtDecode from "jwt-decode";

let token = window.localStorage.getItem("authtoken");

const decodedToken = jwtDecode(token);
const role = decodedToken.role;


export const CourseDescription = (props) => {
    return (
    <>
    <Card>
        <CardTitle tag = "h3">
         Description
        </CardTitle>
        <div className="Description">
        {props.desc}
        </div>
        {role != "3"?
        <Button variant="text" className="Button"  >Edit_Details</Button>  :<></>}
        </Card>
    </>
    );
}

export const TeacherDetails = (props) => {
    return (
    <>
    <Card>
        <CardTitle tag = "h3">
            Teacher Details
        </CardTitle>
        
        <div className="Description">
            Name : {props.name}
        </div>
        <div className="Description">
        {props.desc}
        </div>
        <CardText tag = "h4">
            Contact Details
        </CardText>
        <div className="Description">
            Email : {props.email}
        </div>
        <CardText tag = "h4">
            Price
        </CardText>
        <div className="Description">
            Price : {Math.floor(Math.random() * 1000)}$
        </div>

    </Card>
    </>
    );
}




// Path: src\components\Basic_Templates\Course_Offered_Card_Template.jsx
// export default CourseDescription;