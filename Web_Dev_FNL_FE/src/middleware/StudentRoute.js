import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import jwtDecode from "jwt-decode";

const StudentRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('authtoken');
  var isAllowed = false;
  if(token!=null){
    const decodedToken = jwtDecode(token);
    const role = decodedToken.role;
    const isStudent = role == "3"
    isAllowed = isStudent && (token!=null)
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        isAllowed ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />
        )
      }
    />
  );
};

export default StudentRoute;