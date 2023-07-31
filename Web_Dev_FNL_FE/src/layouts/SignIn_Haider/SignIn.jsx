import React from 'react';
import { useState } from 'react';
import logo from '../../assets/logo.png';
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
}
from 'mdb-react-ui-kit';
import { Container } from 'reactstrap';
import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom';



// import "./SignIn.css"

function App() {

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  

  function handleButtonClick(event) {
    event.preventDefault();
    setError('');
    
    if(!userName || !password){
      setError('Please fill in all fields.');
      return;
    }
    console.log(userName);
    console.log(password);

    fetch("http://localhost:3000/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        
        },
        body: JSON.stringify({
          UserName: userName,
          Password: password,
        }),
      })
      .then( async (res) => 
      await res.json())
      .then((res) => {
        console.log(res.data.user.Role);
        if(res.error){
          setError(res.error);
        }
        else{
          window.localStorage.setItem("token", res.data.token);
          window.localStorage.setItem("user", JSON.stringify(res.data.user));
          if(res.data.user.Role === "1")
          history.push("/admin/dashboard");
          else if(res.data.user.Role === "3")
          history.push("/student/dashboard");
          else if(res.data.user.Role === "2")
          history.push("/teacher/dashboard");
        }
      })
      .catch((err) => {
        console.log(err);
      }
    );
  }

  return (
    // <MDBContainer >
    <Container style={{backgroundColor:"transparent" , justifyContent : "center" ,alignItems : "center" , display: 'flex' ,height:"100vh"}}>
      <MDBCard  >

        <MDBRow className='g-0 d-flex align-items-center'>

          <MDBCol md='4'>
            <MDBCardImage src={logo} alt='phone' className='rounded-t-5 rounded-tr-lg-0' fluid />
          </MDBCol>

          <MDBCol md='8'>

            <MDBCardBody>

              <MDBInput wrapperClass='mb-4' label='User Name' id='form1' value={userName} onChange={(e)=> setUserName(e.target.value) }/>
              <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' value={password} onChange={(e)=> setPassword(e.target.value)}/>

              <div className="d-flex justify-content-between mx-4 mb-4">
                <a href="/signup"> Register Here </a>
                <a href="!#">Forgot password?</a>
              </div>

              

              <p>
                {(() =>{
                  if(error){
                    return <p style = {{color : "red"}}>{error}</p>
                  }
                })()}
              </p>

              <Button variant='text' style = {{color : "#A31ACD"  , outlineColor : "purple" } } className = "mb-4 w-100"  onClick={handleButtonClick} >Sign in</Button>

            </MDBCardBody>

          </MDBCol>

        </MDBRow>

      </MDBCard>

      </Container>
    // </MDBContainer>
  );
}

export default App;