import React, { useState, useEffect } from "react";
import NotificationAlert from "react-notification-alert";
import { getNotifications } from "APIs/userAPIs";
import axios from "axios";
import {
  UncontrolledAlert,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col
} from "reactstrap";
import { useHistory } from 'react-router-dom';
import { delete_notification } from "APIs/userAPIs";

function Notifications() {
  const history = useHistory();
  const notificationAlertRef = React.useRef(null);
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dismissedNotifications, setDismissedNotifications] = useState([]);
  

  useEffect(() => {
    
    
    // const token = localStorage.getItem('authToken');
    // const rtoken = localStorage.getItem('refToken');

    // axios.interceptors.request.use(config => {
    //   config.headers['Authorization'] = `Bearer ${token}`;
    //   config.headers['Refresh-Token'] = rtoken;
    //   return config;
    // });
    
    // const fetchData = async () => {
    //   try {
    //     console.log('Authorization')
    //     const response = await axios.get("http://127.0.0.1:3000/student/notification/get").catch(error=> {
    //       if(error.response.data.auth == false){
    //         history.push('/signin')
    //       }
    //       else{
    //         console.log(error)
    //       };
    //   })
    //     console.log('Aaa',response.headers['access']);
    //     localStorage.setItem('authToken',response.headers['access'])
    //     console.log(response)
    //     setNotifications(response.data.data);
    //     setIsLoading(false);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    
    const fetchData = async () => {
      try {
        console.log('Authorization')

        const response = await getNotifications();

        // console.log('Aaa',response["Headers"]);
        localStorage.setItem('authToken',response["Headers"])
        // console.log(response)
        setNotifications(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const dismissNotification = async (notification) => {
    // Make API call to dismiss notification
    try {
      console.log("hello")
      // const response = await axios.delete("http://127.0.0.1:3000/student/notification/delete", {data: {ID: notification._id}});
      const response = await delete_notification(notification._id);
      console.log(response)
      const updatedNotifications = notifications.filter(n => n._id !== notification._id);
      setNotifications(updatedNotifications);
      
      // Hide the dismissed notification on the UI
      notification.toggle();
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
      <div className="content">
        <div className="react-notification-alert-container">
          <NotificationAlert ref={notificationAlertRef} />
        </div>
        {isLoading ? (
        <div>Loading...</div>
        ) : (
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4" className="ml-auto mr-auto text-center">
                  Your Notifications
                </CardTitle>
              </CardHeader>
              <CardBody>
                {Array.isArray(notifications) && notifications.length > 0 ? (
                  notifications.map(notification => (
                    <UncontrolledAlert
                      key={notification._id}
                      className="alert-with-icon"
                      color={notification.type}
                      
                    >
                      <span className="tim-icons icon-bell-55" data-notify="icon" />
                      <span data-notify="message">
                        {notification.message}
                      </span>
                      <button className="close" onClick={() => dismissNotification(notification)}>
                        <span>&times;</span>
                      </button>
                    </UncontrolledAlert>
                  ))
                ) : (
                  <p>No notifications to display.</p>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
        )}
      </div>
    </>
  );
}

export default Notifications;
