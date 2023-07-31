import getBaseURL from './BaseURLs.jsx';
import jwtDecode from "jwt-decode";

export async function get_teachers(){
    console.log("from getAllCouresesData ",window.localStorage.getItem("refToken"))
      
      console.log(window.localStorage.getItem("authtoken"));
      let x = getBaseURL();
  
      let url ;
      let token = window.localStorage.getItem("authtoken");
  
      const decodedToken = jwtDecode(token);
      const role = decodedToken.role;
  
  
      // let role = JSON.parse(window.localStorage.getItem("user"))["Role"];
  
      console.log("role is " , role);
  
      url = x.toString() + "/admin/get_teachers"

  
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'authorization':"Bearer "+ window.localStorage.getItem("authtoken"),
          'refresh-token': window.localStorage.getItem("refToken")
          },
          
        })
        .then( async (res) =>{
          //console.log( await res.json() )
        return await res.json()})
        .then((res) => {
          // console.log((res));
          if(res.error){
            return res.error;
          }
          else{
            return res.data;
          }
        })
        .catch((err) => {
          console.log(err);
          return err;
        }
      );
  
      // console.log(response);
      return response;
  }