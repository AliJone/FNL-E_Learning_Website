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
import React, { useState, useEffect } from "react";
import axios from "axios";
import ImageUpload from "../components/ImageUpload/ImageUpload";
import { getProfile, updateProfile } from "APIs/userAPIs";


// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";
import { useHistory } from 'react-router-dom';
import { error } from "jquery";
import jwtDecode from "jwt-decode";



function UserProfile() {

  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [ProfilePic, setProfilePic] = useState("");
  const history = useHistory();

  let token_1 = window.localStorage.getItem("authtoken");

  const decodedToken = jwtDecode(token_1);
  const role = decodedToken.role;

  useEffect(() => {

    console.log(role)
    
    
    // Retrieve token from local storage
    const token = localStorage.getItem('authToken');
    const rtoken = localStorage.getItem('refToken');

    axios.interceptors.request.use(config => {
      config.headers['Authorization'] = `Bearer ${token}`;
      console.log('Rtoken',rtoken)
      config.headers['Refresh-Token'] = rtoken;
      return config;
    });
    
    console.log("data yeh tak")

    const fetchData = async () => {
      try {
        console.log('Authorization')

        const response = await getProfile();

        // console.log('Aaa',response["Headers"]);
        localStorage.setItem('authToken',response["Headers"])
        
        console.log(response)
        setUserData(response);
        setProfilePic(response.data.ProfilePic)
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  console.log("userData: ", userData);


  const handleSave = async () => {
    try {
      // Collect the updated data from the input fields
      console.log("hi")
      const updatedData = {
        UserName: document.getElementById("username").value,
        Name: document.getElementById("name").value,
        Email: document.getElementById("email").value,
        Gender: document.getElementById("gender").value,
        Password: document.getElementById("password").value,
        BIO: document.getElementById("bio").value,
        Age: document.getElementById("age").value,
        CreditCard: {
          cardNumber: document.getElementById("cardNumber")?.value,
          expirationDate: document.getElementById("expirationDate")?.value,
          securityCode: document.getElementById("securityCode")?.value,
        },
        Role: userData.data.Role,
        ProfilePic: ProfilePic
      };

      // Send the updated data to the API
      console.log(updatedData)
      updateProfile(updatedData)
      
    } catch (error) {
      console.log(error);
    }
  };

  const handleProfilePicChange = (url) => {
    setProfilePic(url);
  };

  
  return (
    <>
      <div className="content">
        {isLoading ? (
        <div>Loading...</div>
        ) : (
        <Row>
          <Col md="8">
            <Card>
              <CardHeader>
                <h5 className="title">Edit Profile</h5>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="px-md-1" md="3">
                      <FormGroup>
                        <label>Username</label>
                        <Input
                          id="username"
                          defaultValue={role == "2" ? userData.data.user.UserName : userData.data.UserName}
                          placeholder={role == "2" ? userData.data.user.UserName : userData.data.UserName}
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pr-md-1" md="5">
                      <FormGroup>
                        <label>Name</label>
                        <Input
                          id="name"
                          defaultValue={role == "2" ? userData.data.user.Name : userData.data.Name}
                          placeholder={role == "2" ? userData.data.user.Name : userData.data.Name}
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="4">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          Email address
                        </label>
                        <Input id="email" placeholder={role == "2" ? userData.data.user.Email : userData.data.Email} type="email" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="6">
                      <FormGroup>
                        <label>Gender</label>
                        <Input
                          id="gender"
                          defaultValue={role == "2" ? userData.data.user.Gender : userData.data.Gender}
                          placeholder={role == "2" ? userData.data.user.Gender : userData.data.Gender}
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="6">
                      <FormGroup>
                        <label>Password</label>
                        <Input
                          id="password"
                          defaultValue={role == "2" ? userData.data.user.Password : userData.data.Password}
                          placeholder={role == "2" ? userData.data.user.Password : userData.data.Password}
                          type="password"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>BIO</label>
                        <Input
                          id="bio"
                          defaultValue={role == "2" ? userData.data.user.BIO : userData.data.BIO}
                          placeholder={role == "2" ? userData.data.user.BIO : userData.data.BIO}
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="4">
                      <FormGroup>
                        <label>Age</label>
                        <Input
                          id="age"
                          defaultValue={role == "2" ? userData.data.user.Age : userData.data.Age}
                          placeholder={role == "2" ? userData.data.user.Age : userData.data.Age}
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="4">
                      <FormGroup>
                        <label>CardNumber</label>
                        <Input
                          id="cardNumber"
                          defaultValue={role == "2" ?  userData.data.user.CreditCard?.cardNumber: userData.data.CreditCard?.cardNumber}
                          placeholder={role == "2" ?  userData.data.user.CreditCard?.cardNumber: userData.data.CreditCard?.cardNumber}
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="4">
                      <FormGroup>
                        <label>Expiration Date</label>
                        <Input id="expirationDate" placeholder={role == "2" ?  userData.data.CreditCard?.expirationDate: userData.data.CreditCard?.expirationDate}type="text" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="6">
                      <FormGroup>
                        <label>Security Code</label>
                        <Input
                          id="securityCode"
                          defaultValue={role == "2" ? userData.data.user.CreditCard?.securityCode:userData.data.CreditCard?.securityCode}
                          placeholder={role == "2" ? userData.data.user.CreditCard?.securityCode:userData.data.CreditCard?.securityCode}
                          type="password"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="6">
                      <FormGroup>
                        <label>Role (Disabled)</label>
                        <Input
                          id="role"
                          disabled
                          defaultValue={role == "2" ? userData.data.user.Role:userData.data.Role}
                          placeholder={role == "2" ? userData.data.user.Role:userData.data.Role}
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
              <CardFooter>
                <Button  onClick={handleSave} className="btn-fill" color="primary" >
                  Save
                </Button>
              </CardFooter>
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-user">
              <CardBody>
                <CardText />
                <div className="author">
                  <div className="block block-one" />
                  <div className="block block-two" />
                  <div className="block block-three" />
                  <div className="block block-four" />
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <ImageUpload onProfilePicChange={handleProfilePicChange} defaultPicUrl={ProfilePic}/>
                    <h5 className="title">{userData.data.Name}</h5>
                  </a>
                </div>
                <div className="card-description">
                  {userData.data.BIO}
                </div>
              </CardBody>
              <CardFooter>
                <div className="button-container">
                  <Button className="btn-icon btn-round" color="facebook">
                    <i className="fab fa-facebook" />
                  </Button>
                  <Button className="btn-icon btn-round" color="twitter">
                    <i className="fab fa-twitter" />
                  </Button>
                  <Button className="btn-icon btn-round" color="google">
                    <i className="fab fa-google-plus" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
       )}
      </div>
    </>
  );
}

export default UserProfile;
