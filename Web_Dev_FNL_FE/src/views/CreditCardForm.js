import React, { useState, useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import jwtDecode from "jwt-decode";
import axios from "axios";
import "./styleSheet.css"
import {getProfile,updateProfile} from "APIs/userAPIs";
const CreditCardForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState([]);

  const fetchCreditCardInfo = async () => {
    // console.log("responseeeeeeeeee")// Replace with your API endpoint
    setLoading(true);
    let token = window.localStorage.getItem("authtoken");
    const decodedToken = jwtDecode(token);
    const role = decodedToken.role;
    try {
      const response = await getProfile(); 
      setProfileData(response);
      console.log("response")// Replace with your API endpoint
      console.log(response)// Replace with your API endpoint
      if(role == "2"){
        form.setFieldsValue(response.data.user.CreditCard);
      }
      form.setFieldsValue(response.data.CreditCard);
    } catch (error) {
      message.error("Error fetching credit card information");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCreditCardInfo();
  }, []);

  const handleSubmit = async (values) => {
    setLoading(true);
    let token = window.localStorage.getItem("authtoken");
    const decodedToken = jwtDecode(token);
    const role = decodedToken.role;
    console.log("values")
    console.log(values)
    let updatedProfileData = { ...profileData.data }; // Create a copy
    console.log(updatedProfileData)

    if(role == "2"){
      updatedProfileData.user.CreditCard.cardholderName = values.cardholderName 
      updatedProfileData.user.CreditCard.cardNumber = values.cardNumber
      updatedProfileData.user.CreditCard.expirationDate = values.expirationDate
      updatedProfileData.user.CreditCard.securityCode = values.securityCode
      updatedProfileData = updatedProfileData.user;
      delete updatedProfileData.user;

    }else{
      updatedProfileData.CreditCard.cardholderName = values.cardholderName 
      updatedProfileData.CreditCard.cardNumber = values.cardNumber
      updatedProfileData.CreditCard.expirationDate = values.expirationDate
      updatedProfileData.CreditCard.securityCode = values.securityCode
    }

    console.log("updatedProfileData"); // Update the state
    console.log(updatedProfileData); // Update the state

    try {
      await updateProfile(updatedProfileData)
      message.success("Credit card information updated successfully");
    } catch (error) {
      message.error("Error updating credit card information");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="content">
        <Form
        className="CreditCardForm"
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item
            label="Cardholder Name"
            name="cardholderName"
            rules={[
              { required: true, message: "Please enter the cardholder name" },
            ]}
          >
            <Input />
          </Form.Item> 

          <Form.Item
            label="Card Number"
            name="cardNumber"
            rules={[
              { required: true, message: "Please enter the card number" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Expiration Date"
            name="expirationDate"
            rules={[
              { required: true, message: "Please enter the expiration date" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="CVV"
            name="securityCode"
            rules={[{ required: true, message: "Please enter the CVV" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Update Credit Card Information
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default CreditCardForm;
