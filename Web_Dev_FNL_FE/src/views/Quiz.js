import { get_quiz_by_id } from 'APIs/TeacherAPI';
import { Quiz_card } from 'components/Basic_Templates/Course_Session_Components';
import { MDBCard } from 'mdb-react-ui-kit';
import { Button } from '@mui/material';
import React, { useEffect } from 'react';
import { useState } from 'react';
import jwtDecode from "jwt-decode";

export function Quiz (){

    const QuizID = window.sessionStorage.getItem("QuizID");

    const[QuizData, setQuizData] = useState();

    const[Answers, setAnswers] = useState([]);

    let Score = 0;

    useEffect(() => {

        async function fetchData() {
            const response = await get_quiz_by_id(QuizID);
            if (response) {
                console.log("QuizData is ",response);
                setQuizData(response);
            }
            else{
                setQuizData();
            }
        }
        fetchData();

    }, []);

    function HandleSubmit(){
        // console.log("Quiz Card",Quiz_cards)
        console.log("Answers are ",Answers)
        // if(QuizData[0]["Quiz_card"] !== undefined){
        for(let i=0;i<QuizData[0]["Quiz_card"].length;i++){
            if(QuizData[0]["Quiz_card"][i]["Answer"] === Answers[i].toString()){
                console.log("Correct Answer");
                Score = Score + 1;
            }
            else{
                console.log("Wrong Answer");
            }
        }
        alert("Your Score is "+Score);
        // }
        let token = window.localStorage.getItem("authtoken");

        const decodedToken = jwtDecode(token);
        const role = decodedToken.role;

        if(role == 2)
        window.location.href = "/teacher/course";

        else if(role == 1)
        window.location.href = "/admin/course";

        else
        window.location.href = "/student/course";
    }


    return (
        <div className='content'>
            {QuizData?
            <MDBCard>
            <h1 style={{paddingLeft:"35%", paddingTop:"5px" ,position : "relative"}}>QuizName : {QuizData[0]["Name"]}</h1>
            {
                (() =>{
                    console.log("QuizData ---->>> ",QuizData);
                    // if(QuizData[0]["Quiz_card"] !== undefined){
                    let QuizCards = [];
                    for(let i=0;i<QuizData[0]["Quiz_card"].length;i++){
                        console.log("QuizData is ",QuizData[0]["Quiz_card"][i]["Question"]);
                        QuizCards.push(<Quiz_card Question = {QuizData[0]["Quiz_card"][i]["Question"]} Options = {QuizData[0]["Quiz_card"][i]["Options"]} index = {i} Answers = {Answers} setAnswers = {setAnswers}/>);
                    }
                    return QuizCards;
                // }

                })()
            }
            
            <Button variant = "text" style= {{marginTop : "30px",justifySelf : "center"  ,color : "#A31ACD"}} onClick={HandleSubmit}>Submit</Button>

            </MDBCard>:<h1>Loading!!!!</h1>}
            {console.log("QuizData is ",QuizData)}
        </div>
    );
}

export default Quiz;