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
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// core components
import StudentNavbar from "components/Navbars/StudentNavbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";

import {TeacherRoutes} from "routes.js";

import logo from "assets/img/react-logo.png";
import { BackgroundColorContext } from "contexts/BackgroundColorContext";
import TeacherRoute from "../../middleware/TeacherRoute";

var ps;

function Teacher(props) {
  console.log("Win_teacher")
  const location = useLocation();
  const mainPanelRef = React.useRef(null);
  const [sidebarOpened, setsidebarOpened] = React.useState(
    document.documentElement.className.indexOf("nav-open") !== -1
  );
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      
      ps = new PerfectScrollbar(mainPanelRef.current, {
        suppressScrollX: true
      });

      
      let tables = document.querySelectorAll(".table-responsive");
      console.log(tables);
      console.log("no_error")
      for (let i = 0; i < tables.length; i++) {
        
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.documentElement.classList.add("perfect-scrollbar-off");
        document.documentElement.classList.remove("perfect-scrollbar-on");
      }
    };
  });
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    if (mainPanelRef.current) {
      mainPanelRef.current.scrollTop = 0;
    }
  }, [location]);
  // this function opens and closes the sidebar on small devices
  const toggleSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    setsidebarOpened(!sidebarOpened);
  };
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/teacher") {
        return (
          <TeacherRoute
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  const filterRoutes = (routes) => {
    var filtered_routes = [] ;
    for (let i  = 0 ; i < routes.length ; i++) {
      if (routes[i].name !== "Course" && routes[i].name !== "Video" && routes[i].name !== "Video_upload" && routes[i].name !== "video_editor" && routes[i].name !== "Quiz" && routes[i].name !== "Material_upload" && routes[i].name !== "Course_upload" ){
        console.log(routes[i].name);
        filtered_routes.push(routes[i]);
      }
    }
    return filtered_routes;
  }
  const getBrandText = (path) => {
    for (let i = 0; i < TeacherRoutes.length; i++) {
      if (location.pathname.indexOf(TeacherRoutes[i].layout + TeacherRoutes[i].path) !== -1) {
        return TeacherRoutes[i].name;
      }
    }
    return "Brand";
  };
  return (
    <BackgroundColorContext.Consumer>
      {({ color, changeColor }) => (
        <React.Fragment>
          <div className="wrapper">
            <Sidebar
              routes={filterRoutes(TeacherRoutes)}
              logo={{
                outterLink: "https://www.creative-tim.com/",
                text: "FNL",
                imgSrc: logo
              }}
              toggleSidebar={toggleSidebar}
            />
            <div className="main-panel" ref={mainPanelRef} data={color}>
              <StudentNavbar
                brandText={getBrandText(location.pathname)}
                toggleSidebar={toggleSidebar}
                sidebarOpened={sidebarOpened}
              />
              <Switch>
              
                {getRoutes(TeacherRoutes)}
                <Redirect from="*" to="/teacher/dashboard" />
              </Switch>
              {
                // we don't want the Footer to be rendered on map page
                location.pathname === "/teacher/maps" ? null : <Footer fluid />
              }
            </div>
          </div>
          <FixedPlugin bgColor={color} handleBgClick={changeColor} />
        </React.Fragment>
      )}
    </BackgroundColorContext.Consumer>
  );
}

export default Teacher;
