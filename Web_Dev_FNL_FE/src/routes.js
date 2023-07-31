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
import StudentDashboard from "views/Dashboard.js";
import Icons from "views/Icons.js";
import Notifications from "views/Notifications.js";
import TableList from "views/TableList.js";
import UserProfile from "views/UserProfile.js";
import Courses_Offered from "views/Course_Offered.js";
import All_Courses from "views/All_Courses.js";
import { TeachersDashboard } from "views/Dashboard";
import { AdminDashboard } from "views/Dashboard";
import Course from "views/Courses.js";
import Video from "views/Video_player.js";
import Video_uploader from "views/Video_uploader.js";
import Material_Upload from "views/Material_Upload";
import Enrolled from "views/Enrolled_In";
import AddNDelete from "views/AddNDelete.js";
import CreditCardForm from "views/CreditCardForm.js";

import Video_Editor from "views/Video_Editor.js";

import Quiz from "views/Quiz.js";
import CourseUpload from "views/Course_Upload";



export var StudentRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "tim-icons icon-chart-pie-36",
    component: StudentDashboard,
    layout: "/student"
  },
  
  {
    path: "/enrollin",
    name: "ENROLL IN",
    icon: "tim-icons icon-atom",
    component: Courses_Offered,
    layout: "/student"
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "tim-icons icon-bell-55",
    component: Notifications,
    layout: "/student"
  },
  // {
  //   path: "/Course_Offered",
  //   name: "Course Offered",
  //   rtlName: "إخطارات",
  //   icon: "tim-icons icon-book-55",
  //   component: Courses_Offered,
  //   layout: "/student"
  // },
  {
    path: "/Course",
    name: "Course",
    rtlName: "إخطارات",
    icon: "tim-icons icon-book-55",
    component: Course,
    layout: "/student"
  },
  {
    path: "/video",
    name: "Video",
    rtlName: "إخطارات",
    icon: "tim-icons icon-book-55",
    component: Video,
    layout: "/student"
  },
  {
    path: "/video_upload",
    name: "Video_upload",
    rtlName: "إخطارات",
    icon: "tim-icons icon-book-55",
    component: Video_uploader,
    layout: "/student"
  },
  {
    path : "/quiz",
    name : "Quiz",
    rtlName: "إخطارات",
    icon: "tim-icons icon-book-55",
    component: Quiz,
    layout: "/student"
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "tim-icons icon-single-02",
    component: UserProfile,
    layout: "/student"
  },
  {
    path: "/enrolledcourse",
    name: "ENROLLED COURSES",
    icon: "tim-icons icon-puzzle-10",
    component: Enrolled,
    layout: "/student"
  },

  {
    path: "/billinginfo",
    name: "BILLING INFO",
    icon: "tim-icons icon-money-coins",
    component: CreditCardForm,
    layout: "/student"
  }

];

export var AdminRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "tim-icons icon-chart-pie-36",
    component: AdminDashboard,
    layout: "/admin"
  },
  {
    path: "/Course_Offered",
    name: "Courses Offered",
    icon: "tim-icons icon-atom",
    component: Courses_Offered,
    layout: "/admin"
  },
  {
    path: "/enrollin",
    name: "ENROLL IN",
    icon: "tim-icons icon-atom",
    component: All_Courses,
    layout: "/admin"
  },
  

  {
    path: "/Course",
    name: "Course",
    rtlName: "إخطارات",
    icon: "tim-icons icon-book-55",
    component: Course,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "tim-icons icon-bell-55",
    component: Notifications,
    layout: "/admin"
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "tim-icons icon-single-02",
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/video",
    name: "Video",
    rtlName: "إخطارات",
    icon: "tim-icons icon-book-55",
    component: Video,
    layout: "/admin"
  },
  {
    path: "/video_upload",
    name: "Video_upload",
    rtlName: "إخطارات",
    icon: "tim-icons icon-book-55",
    component: Video_uploader,
    layout: "/admin"
  },
  {
    path : "/quiz",
    name : "Quiz",
    rtlName: "إخطارات",
    icon: "tim-icons icon-book-55",
    component: Quiz,
    layout: "/admin"
  },
  {
    path: "/billinginfo",
    name: "BILLING INFO",
    icon: "tim-icons icon-money-coins",
    component: CreditCardForm,
    layout: "/admin"
  },
  {
    path: "/course_upload",
    name: "Course_upload",
    // rtlName: "إخطارات",
    // icon: "tim-icons icon-book-55",
    component: CourseUpload,
    layout: "/admin"
  },
  {
    path: "/material_upload",
    name: "Material_upload",
    // rtlName: "إخطارات",
    // icon: "tim-icons icon-book-55",
    component: Material_Upload,
    layout: "/admin"
  },
  // 
  {
    path: "/video_editor",
    name: "video_editor",
    rtlName: "إخطارات",
    icon: "tim-icons icon-book-55",
    component: Video_Editor,
    layout: "/admin"
  },
  {
    path: "/addNdeleteusers",
    name: "Remove Users",
    icon: "tim-icons icon-single-02",
    component: AddNDelete,
    layout: "/admin"
  },
];

export var TeacherRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "tim-icons icon-chart-pie-36",
    component: TeachersDashboard ,
    layout: "/teacher"
  },
  {
    path: "/Course_Offered",
    name: "Courses Offered",
    icon: "tim-icons icon-atom",
    component: Courses_Offered,
    layout: "/teacher"
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "tim-icons icon-bell-55",
    component: Notifications,
    layout: "/teacher"
  },
  
  // {
  //   path: "/Course_Offered",
  //   name: "Course Offered",
  //   rtlName: "إخطارات",
  //   icon: "tim-icons icon-book-55",
  //   component: Courses_Offered,
  //   layout: "/teacher"
  // },
  {
    path: "/Course",
    name: "Course",
    rtlName: "إخطارات",
    icon: "tim-icons icon-book-55",
    component: Course,
    layout: "/teacher"
  },
  {
    path: "/course_upload",
    name: "Course_upload",
    // rtlName: "إخطارات",
    // icon: "tim-icons icon-book-55",
    component: CourseUpload,
    layout: "/teacher"
  },
  {
    path: "/video",
    name: "Video",
    rtlName: "إخطارات",
    icon: "tim-icons icon-book-55",
    component: Video,
    layout: "/teacher"
  },
  {
    path: "/video_upload",
    name: "Video_upload",
    rtlName: "إخطارات",
    icon: "tim-icons icon-book-55",
    component: Video_uploader,
    layout: "/teacher"
  },
  {
    path: "/material_upload",
    name: "Material_upload",
    // rtlName: "إخطارات",
    // icon: "tim-icons icon-book-55",
    component: Material_Upload,
    layout: "/teacher"
  },
  // 
  {
    path: "/video_editor",
    name: "video_editor",
    rtlName: "إخطارات",
    icon: "tim-icons icon-book-55",
    component: Video_Editor,
    layout: "/teacher"
  },
  {
    path : "/quiz",
    name : "Quiz",
    rtlName: "إخطارات",
    icon: "tim-icons icon-book-55",
    component: Quiz,
    layout: "/teacher"
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "tim-icons icon-single-02",
    component: UserProfile,
    layout: "/teacher"
  },
  {
    path: "/billinginfo",
    name: "BILLING INFO",
    icon: "tim-icons icon-money-coins",
    component: CreditCardForm,
    layout: "/teacher"
  },
];
