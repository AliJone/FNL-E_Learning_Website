// import {Video} from 'react-video-renderer';

import {
  MDBCard,
  MDBRow,
  MDBCol,
  MDBCardImage,
  MDBCardTitle,
  MDBCardBody,
} from "mdb-react-ui-kit";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Input, Label } from "reactstrap";
import {
  IoPlayCircle,
  IoPencil,
  IoAddCircleSharp,
  IoRemoveCircleSharp,
  IoDownload,
} from "react-icons/io5";
import React from "react";
import jwtDecode from "jwt-decode";
import Doc from "./Doc.jpg";
import { saveAs } from "file-saver";

import "./styleSheet.css";
// jwtDecode

export function VideoCard(props) {
  let token = window.localStorage.getItem("authtoken");
  const enrolled = props.Course_ID
  const decodedToken = jwtDecode(token);
  const role = decodedToken.role;

  function handlePlay() {
    console.log("play");
    window.sessionStorage.setItem("VideoID", props._id);
    window.sessionStorage.setItem("VideoURL", props.url);
    window.sessionStorage.setItem("QuizID", props.Quiz_ID);

    if (role == "2") {
      window.location.href = "/teacher/video";
    } else if (role == "1") {
      window.location.href = "/admin/video";
    } else {
      window.location.href = "/student/video";
    }
  }
  const [message, setMessage] = useState("");

  const handleClickPurchase = () => {
    if (message) {
      setMessage("");
    } else {
      setMessage("Purchase Course from Description");
    }
  };
  function handleEdit() {
    window.sessionStorage.setItem("Video", JSON.stringify(props));
    window.sessionStorage.setItem("VideoID", props._id);
    let token = window.localStorage.getItem("authtoken");

    const decodedToken = jwtDecode(token);
    const role = decodedToken.role;
    if (role == "2") {
      window.location.href = "/teacher/video_editor";
    } else if (role == "1") {
      window.location.href = "/admin/video_editor";
    }
  }

  console.log("props");
  console.log(props);

  return (
    <MDBCard style={{ border: "1px solid " }}>
      <MDBRow className="g-0 d-flex align-items-center">
        <MDBCol md="2">
          <MDBCardImage
            src={props.image}
            alt="image"
            className="rounded-t-5 rounded-tr-lg-0"
            fluid
          />
        </MDBCol>
        <MDBCol md="8">
          <MDBCardTitle tag="h5">{props.title}</MDBCardTitle>
        </MDBCol>
        <MDBCol>
          <MDBRow>
            {role == "3" ? (
              props?.isPurchased ? (
                <IoPlayCircle color="#c44b99" size={37} onClick={handlePlay} />
              ) : (
                <div>
                <button style={{
                  backgroundColor: '#008CBA', /* Blue */
                  border: 'none',
                  color: 'white',
                  padding: '15px 32px',
                  textAlign: 'center',
                  textDecoration: 'none',
                  display: 'inline-block',
                  fontSize: '16px',
                  margin: '4px 2px',
                  cursor: 'pointer',
                }} onClick={handleClickPurchase}>Purchase Course First</button>
                {message && <p>{message}</p>}
              </div>
              )
            ) : (
              <IoPlayCircle color="#c44b99" size={37} onClick={handlePlay} />
            )}
            {/* <Button variant="text" style = {{color : "#c44b99", justifyContent : "flex-end" }} onClick ={handleChange}>Play</Button> */}
          </MDBRow>
        </MDBCol>
        <MDBCol>
          {role == "1" || role == "2" ? (
            <IoPencil color="#c44b99" size={25} onClick={handleEdit} />
          ) : (
            <></>
          )}
        </MDBCol>
      </MDBRow>
    </MDBCard>
  );
}

export function MaterialCard(props) {
  let token = window.localStorage.getItem("authtoken");
  const enrolled = props.Course_ID
  const decodedToken = jwtDecode(token);
  const role = decodedToken.role;

  function handleDownload() {
    saveAs(props.url, `${props.title}.pdf`);
  }
  const [message, setMessage] = useState("");

  const handleClickPurchase = () => {
    if (message) {
      setMessage("");
    } else {
      setMessage("Purchase Course from Description");
    }
  };
  // <a href={'file url'} download={'name'}>download</a>
  return (
    <MDBCard style={{ border: "1px solid " }}>
      <MDBRow className="g-0 d-flex align-items-center" style={ 
        {width: "97%",
          margin: "auto"}
      }>
        <MDBCol md="2">
          <MDBCardImage
            src={Doc}
            alt="image"
            className="rounded-t-5 rounded-tr-lg-0"
            fluid
          />
        </MDBCol>
        <MDBCol md="8">
          <MDBCardTitle tag="h5">{props.title}</MDBCardTitle>
        </MDBCol>
        <MDBCol>
          <MDBRow>
          {role == "3" ? (
              props?.isPurchased ? (
                <IoDownload color="#c44b99" size={37} onClick={handleDownload} />
              ) : (
                <div>
                <button style={{
                  backgroundColor: '#008CBA', /* Blue */
                  border: 'none',
                  color: 'white',
                  padding: '15px 32px',
                  textAlign: 'center',
                  textDecoration: 'none',
                  display: 'inline-block',
                  fontSize: '16px',
                  cursor: 'pointer',
                }} onClick={handleClickPurchase}>Purchase Course First</button>
                {message && <p>{message}</p>}
              </div>
              )
            ) : (
              <IoDownload color="#c44b99" size={37} onClick={handleDownload} />
            )}
            {/* <Button variant="text" style = {{color : "#c44b99", justifyContent : "flex-end" }} onClick ={handleChange}>Play</Button> */}
          </MDBRow>
        </MDBCol>
      </MDBRow>
    </MDBCard>
  );
}

export function Quiz_card_edit(props) {
  const [arr_of_options, setArr_of_options] = useState([]);
  const [Question, setQuestion] = useState("");
  const [Answer, setAnswer] = useState(0);
  const [localtempOptions, setlocaltempOptions] = useState([]);

  useEffect(() => {
    HandleSetValue();
  }, []);

  useEffect(() => {
    addQuestion();
  }, [Question]);

  useEffect(() => {
    addAnswer();
  }, [Answer]);

  useEffect(() => {
    addOptions();
  }, [arr_of_options]);

  useEffect(() => {
    addOptions_text();
  }, [localtempOptions]);

  async function HandleDelOption(event, index) {
    let temp = arr_of_options.slice(0, index);
    let temp2 = arr_of_options.slice(index + 1, arr_of_options.length);
    let x = temp.concat(temp2);
    setArr_of_options(x);

    // addOptions();

    console.log("localtempOptions b4 = ", localtempOptions);

    let temp3 = localtempOptions.slice(0, index);
    let temp4 = localtempOptions.slice(index + 1, localtempOptions.length);

    let y = temp3.concat(temp4);

    console.log("y = ", y);

    setlocaltempOptions(y);

    console.log("localtempOptions after = ", localtempOptions);
  }

  function handleAddOption(local_Options, setlocal_Options, index) {
    console.log(localtempOptions);
    setArr_of_options(
      arr_of_options.concat(
        <Input
          label={`Option ${index}`}
          id={`Option ${index}`}
          defaultvalue={localtempOptions[index]}
          value={localtempOptions[index]}
          onChange={(e) => {
            {
              localtempOptions[index] = e.target.value;
              setlocaltempOptions(localtempOptions);
              local_Options[props.index] = localtempOptions;
            }
            setlocal_Options(local_Options);
          }}
          placeholder={localtempOptions[index]}
          type="text"
        />
      )
    );
  }

  function HandleSetValue() {
    setQuestion(props.Questions[props.index]);
    // addQuestion();
    setAnswer(props.Answers[props.index]);
    // addAnswer();
    // console.log(props.Options[props.index])
    // arr_of_options = props.Options[props.index];

    for (let i = 0; i < props.Options[props.index].length; i++) {
      arr_of_options.push(
        <Input
          label={`Option ${i}`}
          id={`Option ${i}`}
          defaultvalue={props.Options_text[props.index][i]}
          value={props.Options_text[props.index][i]}
          // onChange={(e) => {  {localtempOptions[index] = e.target.value ; setlocaltempOptions(localtempOptions); local_Options[props.index] = localtempOptions}; setlocal_Options(local_Options);    }}
          onChange={(e) => {
            {
              localtempOptions[i] = e.target.value;
              setlocaltempOptions(localtempOptions);
              props.Options_text[props.index][i] = localtempOptions;
            }
            props.setOptions_text(props.Options_text);
          }}
          // onChange={(e) => { props.Options_text[props.index][i] = e.target.value ; setArr_of_options(props.Options[props.index]);    }}
          placeholder={"Option "}
          type="text"
        />
      );
    }

    setArr_of_options(arr_of_options);
    setlocaltempOptions(props.Options_text[props.index]);

    // console.log(arr_of_options);
    // console.log(arr_of_options);
  }

  function addQuestion() {
    props.Questions[props.index] = Question;
    props.setQuestions(props.Questions);
    // console.log(localtempOptions)
    // console.log(props.Questions[props.index])
    // console.log(Question)
  }

  function addAnswer() {
    props.Answers[props.index] = Answer;
    props.setAnswers(props.Answers);
    // console.log(props.Answers[props.index])
  }

  function addOptions() {
    // arr_of_options[props.index].localtempOptions = localtempOptions;
    props.Options[props.index] = arr_of_options;
    props.setOptions(props.Options);
    // console.log(props.Options[index])
  }

  function addOptions_text() {
    props.Options_text[props.index] = localtempOptions;
    props.setOptions_text(props.Options_text);
    // console.log(props.Options_text[index])
  }

  return (
    <MDBCard style={{ border: "1px solid ", padding: "1%" }}>
      <MDBCardTitle tag="h5">Question</MDBCardTitle>
      <MDBRow>
        <MDBCol
          style={{ marginLeft: "2%", marginRight: "2%", marginBottom: "2%" }}
        >
          <Input
            label="Question"
            id="Question"
            defaultValue={props.Questions[props.index]}
            value={Question}
            onChange={(e) => {
              setQuestion(e.target.value);
            }}
            placeholder={Question}
            type="text"
          />
        </MDBCol>
      </MDBRow>
      <MDBRow>
        <MDBCol>
          <MDBCardTitle tag="h5">Options</MDBCardTitle>
        </MDBCol>
        <MDBCol>
          <MDBRow
            style={{
              justifyContent: "flex-end",
              position: "relative",
              marginRight: "2%",
            }}
          >
            <IoAddCircleSharp
              color="#c44b99"
              onClick={() => {
                handleAddOption(
                  props.Options_text,
                  props.setOptions_text,
                  arr_of_options ? arr_of_options.length : 0
                );
                addOptions();
              }}
              size={25}
            />
          </MDBRow>
        </MDBCol>
      </MDBRow>
      {arr_of_options ? (
        arr_of_options.map((option, index) => {
          return (
            <>
              <MDBRow
                style={{
                  marginLeft: "2%",
                  marginRight: "2%",
                  marginBottom: "2%",
                }}
              >
                <MDBCol size="auto">
                  <IoRemoveCircleSharp
                    onClick={(event) => HandleDelOption(event, index)}
                    color="#c44b99"
                    size={25}
                  />
                </MDBCol>
                <MDBCol>{option}</MDBCol>
              </MDBRow>
            </>
          );
        })
      ) : (
        <></>
      )}
      {/* {arr_of_options} */}
      <MDBCardTitle tag="h5">Answer</MDBCardTitle>
      <MDBRow>
        <MDBCol
          style={{ marginLeft: "2%", marginRight: "2%", marginBottom: "2%" }}
        >
          <Input
            label="ANSWER"
            id="Answer"
            defaultValue={props.Answers[props.index]}
            placeholder={"Answer"}
            value={Answer}
            onChange={(e) => {
              setAnswer(e.target.value);
            }}
            type="number"
          />
        </MDBCol>
      </MDBRow>
    </MDBCard>
  );
}

export function Quiz_card(props) {
  const [ischecked, setischecked] = useState();

  useEffect(() => {
    if (ischecked || ischecked == 0) {
      console.log(ischecked);
      props.Answers[props.index] = ischecked;
      props.setAnswers(props.Answers);
    }
  }, [ischecked]);

  return (
    <>
      <MDBCard style={{ margin: "3px" }}>
        <MDBCardBody>
          <MDBRow style={{ padding: "10px" }}>
            <MDBCardTitle tag="h3">Question : {props.Question} </MDBCardTitle>
          </MDBRow>
          <MDBCard>
            <MDBRow>
              <MDBCol>
                <MDBCardTitle tag="h5">Options</MDBCardTitle>
              </MDBCol>
            </MDBRow>
            {props.Options.map((option, i) => {
              return (
                <>
                  {/* {option} */}
                  <Button
                    variant={ischecked == [i] ? "contained" : "text"}
                    onClick={() => {
                      setischecked(i);
                    }}
                  >
                    {option}
                  </Button>
                </>
              );
            })}
            <MDBRow>
              <MDBCol>
                <Label
                  label="ANSWER*"
                  id="Name"
                  placeholder={"Option 1"}
                  type="text"
                />
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBCardBody>
      </MDBCard>
    </>
  );
}

// export function Video_renderer(){
// return(<Video src="https://mysite.com/video.mp4">
// {(video, state, actions) => (
//   <div>
//     {video}
//     <div>{state.currentTime} / {state.duration} / {state.buffered}</div>
//     <progress value={state.currentTime} max={state.duration} onChange={actions.navigate} />
//     <progress value={state.volume} max={1} onChange={actions.setVolume} />
//     <button onClick={actions.play}>Play</button>
//     <button onClick={actions.pause}>Pause</button>
//     <button onClick={actions.requestFullScreen}>Fullscreen</button>
//   </div>
// )}
// </Video>)
// }
