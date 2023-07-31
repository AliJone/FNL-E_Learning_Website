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
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Switch, useLocation } from "react-router-dom";

import StudentLayout from "layouts/Student/Student.js";
import TeacherLayout from "layouts/Teacher/Teacher.js";
import AdminLayout from "layouts/Admin/Admin.js";
import SignInLayout from "layouts/SignIn/SignIn.jsx";
import SignUpLayout from "layouts/SignUp/SignUp.jsx";
import LandingPage from "layouts/LandingPage/LandingPage.jsx";
import About from "layouts/About/About.jsx";
import Music from "../src/assets/music/storm-clouds-purpple-cat.wav";

// import SignInLayout from 'layouts/SignIn_Haider/SignIn.jsx';
// import SignUpLayout from 'layouts/SignUp_Haider/SignUp.jsx';

import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import ThemeContextWrapper from "./components/ThemeWrapper/ThemeWrapper";
import BackgroundColorWrapper from "./components/BackgroundColorWrapper/BackgroundColorWrapper";

// other imports...

function App() {
  const location = useLocation();
  const [audio, setAudio] = useState(new Audio(Music));

  useEffect(() => {
    if (["/signin", "/signup", "/about"].includes(location.pathname)) {
    } else {
      audio.pause();
      audio.currentTime = 0; // rewind the audio to the start
    }
  }, [location]);
  function play() {
    audio.play();
  }
  return (
    <ThemeContextWrapper>
      <BackgroundColorWrapper>
        <Switch>
          <Route path="/teacher" render={(props) => <TeacherLayout />} />
          <Route
            path="/student"
            render={(props) => <StudentLayout {...props} />}
          />
          <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
          <Route
            path="/signin"
            render={(props) => <SignInLayout {...props} />}
          />
          <Route
            path="/signup"
            render={(props) => <SignUpLayout {...props} />}
          />
          <Route path="/about" render={(props) => <About {...props} />} />
          <Route path="/" render={(props) => <LandingPage play={play} />} />
        </Switch>
      </BackgroundColorWrapper>
    </ThemeContextWrapper>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
