import React, { useEffect } from "react";
import {Video_uploader} from '../components/Basic_Templates/Video_uploader.jsx';
import {ImageUpload} from '../components/ImageUpload/ImageUpload.js';
import jwtDecode from "jwt-decode";
import {
    MDBCard,
    MDBCardBody,
    MDBRow,
    MDBCol
  }
  from 'mdb-react-ui-kit';

import "./styleSheet.css"

import { useState } from "react";
import { Button } from "@mui/material";
import { Input } from "reactstrap";
import { IoCloseCircleSharp } from "react-icons/io5";
import { Quiz_card_edit } from "components/Basic_Templates/Course_Session_Components.jsx";

import { add_quiz_card_to_Quiz, add_quiz_to_Video, create_Quiz_card, create_quiz,delete_quiz,get_quiz, get_quiz_by_id, get_quiz_card, remove_quiz_from_video } from "../APIs/TeacherAPI.jsx";
// import "./styleSheet.css"

function Videos(){
    // const [VideoData, setVideoData] = useState();
    const defaultPicUrl = JSON.parse(window.sessionStorage.getItem("Video"))["image"];
    const DefaultName = JSON.parse(window.sessionStorage.getItem("Video"))["title"];
    const QuizID = JSON.parse(window.sessionStorage.getItem("Video"))["Quiz_ID"] ;
    // const [VideoThumbnail, setVideoThumbnail] = useState();

    const [Name, SetName] = useState(DefaultName);
    const [isOpen, setIsOpen] = useState(false);
    const [QuizName, setQuizName] = useState("");


    const [array_of_questions,setArray_of_question] = useState([]);

    
    const[Questions,setQuestions] = useState([]);
    const[Answers,setAnswers] = useState([]);
    const[Options,setOptions] = useState([[]]);
    const[Options_text,setOptions_text] = useState([[]]);

    useEffect(() => {
        async function fetchData() {
            if(QuizID !== null){
            const response = await get_quiz_by_id(QuizID);
            if (response) {
                console.log("QuizData is ",response);
                // setQuizData(response);
                setQuizName(response[0]["Name"]);
            }
            else{
                // setQuizData();
            }
        }
            // console.log("QuizID is ",QuizID);
        }
        fetchData();
        window.sessionStorage.setItem("QuizID",QuizID);
    });

    function RemoveQuiz(){

        // /remove_quiz

        async function deleteQuiz(){
            try{
            await remove_quiz_from_video();
            await delete_quiz();
            console.log("hugaya");
            }catch(err){
                console.log(err);
            }

        }

        deleteQuiz();

        window.location.reload();

    }

    const handleRemoveQuestion = (event,key) => {
        // console.log(event.target);
        // console.log('key index: ', key);'
        // console.log(array_of_questions);
        Questions[array_of_questions.length-1] = "";
        Answers[array_of_questions.length -1 ] = 0;
        Options[array_of_questions.length -1] = [];
        Options_text[array_of_questions.length -1] = [];
        setQuestions(Questions);
        setAnswers(Answers);
        setOptions(Options);
        setOptions_text(Options_text);

        let temp = array_of_questions.slice(0 , key);
        let temp_2 = array_of_questions.slice(key+1 , array_of_questions.length);
        setArray_of_question(temp.concat(temp_2));
        
      };

    function HandleAddQuestion(){
        console.log()
        Questions[array_of_questions.length] = "";
        Answers[array_of_questions.length ] = 0;
        Options[array_of_questions.length] = [];
        Options_text[array_of_questions.length] = [];
        setQuestions(Questions);
        setAnswers(Answers);
        setOptions(Options);
        setOptions_text(Options_text);

        setArray_of_question(array_of_questions.concat(
        <Quiz_card_edit 
            Questions = {Questions} 
            setQuestions = {setQuestions} 
            Answers = {Answers}
            setAnswers = {setAnswers}
            Options = {Options}
            setOptions = {setOptions} 
            Options_text = {Options_text}
            setOptions_text = {setOptions_text}
            index = {array_of_questions.length}  />
        ));

        // console.log(Answers)

        // console.log(Questions);
    }


    async function handleSubmit(){
        console.log("Hello");
        console.log(array_of_questions);
        async function setData(){
            // console.log(data);
            let response = await create_quiz(QuizName);
            response = await get_quiz();

            sessionStorage.setItem("QuizID",response);

            
            for(let i = 0 ; i < array_of_questions.length ; i++){
                let response = await create_Quiz_card(Questions[i],Options_text[i],Answers[i]);
                response = await get_quiz_card();
                console.log(response)
                let response2 = await add_quiz_card_to_Quiz(response);
                console.log(response2);
            }
            // let response  = await create_Quiz_card(Questions[0],Options_text[0],Answers[0]);
        }

        setData();

        togglePopup();

    }

    function HandleUpdate(){
        async function SetData(){
            let response = await add_quiz_to_Video();
            console.log(response)
        }
        SetData();
        let token = window.localStorage.getItem("authtoken");

        const decodedToken = jwtDecode(token);
        const role = decodedToken.role;
        if(role == "1")
        window.location.href = "/admin/course";

        else if(role == "2")
        window.location.href = "/teacher/course";

    }

    
 
    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    const Popup = props => {
        
        return (
            <div className="content">
            <div className="popup-box">
                <div className="box">
                <IoCloseCircleSharp className="close-icon" onClick={props.handleClose} color= '#c44b99' size=  {25}/>
                {/* <span className="close-icon" onClick={props.handleClose}>x</span> */}
                {props.content}
                </div>
             </div>
            </div>
        );
      };

    return(
        <div className = "content">
            <MDBCard>
                <MDBCardBody>
                <Video_uploader default_url/>
                <ImageUpload defaultPicUrl={defaultPicUrl} text = {"Thumbnail"}/>

                <Input
                    value={Name}
                    onChange={(e)=> SetName(e.target.value)}
                    label="Name*"
                    id="Name"
                    placeholder={Name}
                    type="text"
                />
                <br/>

                <MDBRow>
                    <MDBCol >
                        <Input placeholder="Quiz Name" value = {QuizName} onChange={(e)=>{setQuizName(e.target.value)}}></Input>
                    </MDBCol>
                    <MDBCol size = "auto">
                            <Button onClick={togglePopup} style={{justifySelf : "center"  ,color : "#A31ACD"}}>ADD QUIZ</Button>
                    </MDBCol>
                </MDBRow>
                {QuizName?  
                <MDBRow>
                    <MDBCol>
                            <Button onClick= {RemoveQuiz} style={{justifySelf : "center"  ,color : "#A31ACD"}}>Remove QUIZ</Button>
                    </MDBCol>
                </MDBRow>:<></>
                }
                <MDBRow style={{justifyContent : "center" , paddingTop : "10px"}}>
                <Button onClick = {HandleUpdate}  style={{justifySelf : "center"  ,color : "#A31ACD"}}>Update</Button>
                </MDBRow>

                
                {/* <MDBCardImage src={downloadURL} alt='image' className='rounded-t-5 rounded-tr-lg-0' fluid /> */}
                </MDBCardBody>
               
                {isOpen ? <>
                
                <Popup
                    content={<>
                    
                    <h1 style={{paddingLeft:"35%" ,position : "relative"}}>Design your Quiz</h1>
                    <h3 style={{paddingLeft:"37%" ,position : "relative"}} >Quiz Name = {QuizName}</h3>
                    
                    <br/>
                    {array_of_questions.map((question,index) => {
                        return(
                            <>
                            <MDBRow style={{justifyContent : "flex-end"}}>
                            <IoCloseCircleSharp  onClick={event => handleRemoveQuestion(event ,index)} key={index}  color= '#c44b99' size=  {25} style={{justifySelf : "flex-end"}}/>
                            </MDBRow>
                                {question}
                            </>
                        )
                    })
                    }
                    <MDBRow>
                    <MDBCol>
                        <Button style={{color : "#A31ACD"}} onClick = {HandleAddQuestion}>ADD Question</Button>
                    </MDBCol>
                    <MDBCol >
                        <MDBRow style={{justifyContent : "flex-end" , paddingRight : "2%"}}>
                            <Button style={{color : "#A31ACD"}} onClick = {handleSubmit}>Submit</Button>
                        </MDBRow>
                    </MDBCol>
                    </MDBRow>
                    </>}
                    handleClose={togglePopup}
                /></>:<></>}
            </MDBCard>
        </div>
    )

}

export default Videos;