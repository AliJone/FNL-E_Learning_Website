import getBaseURL from "./BaseURLs.jsx";
import jwtDecode from "jwt-decode";
export async function getCourse(courseData) {
  let x = getBaseURL();

  let token = window.localStorage.getItem("authtoken");

  const decodedToken = jwtDecode(token);
  const role = decodedToken.role;
  let url;
  if (role == "2") {
    url = x.toString() + "/student/courser/get";
  } else if (role == "1") {
    url = x.toString() + "/student/courser/get";
  } else {
    url = x.toString() + "/student/courser/get";
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + window.localStorage.getItem("authtoken"),
      "refresh-token": window.localStorage.getItem("refToken"),
    },

    body: JSON.stringify({
      courseData,
    }),
  })
    .then(async (res) => {
      return await res.json();
    })
    .then((res) => {
      if (res.error) {
        return res.error;
      } else {
        return res.data;
      }
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
  return response;
}

export async function coursePurchase(props) {
  let x = getBaseURL();

  let urlStudent = x.toString() + "/student/course/purchase";

  let response = null;

  response = await fetch(urlStudent, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + window.localStorage.getItem("authtoken"),
      "refresh-token": window.localStorage.getItem("refToken"),
    },
    body: JSON.stringify({
      ID: props,
    }),
  })
    .then(async (res) => await res.json())
    .catch((err) => {
      console.log(err);
      return err;
    });

  return { response: response };
}
