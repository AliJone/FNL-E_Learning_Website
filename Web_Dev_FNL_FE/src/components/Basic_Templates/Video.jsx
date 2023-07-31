import React from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import { Button } from "@mui/material";
import { get_quiz_by_id } from 'APIs/TeacherAPI';
import jwtDecode  from 'jwt-decode';

export const VideoJS = (props) => {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);
  const {options, onReady} = props;

  function Take_Quiz(){
    
    if((window.sessionStorage.getItem("QuizID") != "undefined")){
    let token = window.localStorage.getItem("authtoken");

    const decodedToken = jwtDecode(token);
    const role = decodedToken.role;



    if(role === "1")
      window.location.href = "/admin/quiz";
    else if(role === "2")
      window.location.href = "/teacher/quiz";
    else
      window.location.href = "/student/quiz";
    }
  }

  React.useEffect(() => {
    // console.log(playerRef.current.isDisposed())
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode. 
      const videoElement = document.createElement("video-js");

      videoElement.classList.add('vjs-big-play-centered');
      videoRef.current.appendChild(videoElement);

      const player = playerRef.current = videojs(videoElement, options, () => {
        videojs.log('player is ready');
        // console.log(player)
        
        onReady && onReady(player);
      });

    // You could update an existing player in the `else` block here
    // on prop change, for example:
    } else {
      const player = playerRef.current;
      
      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [options, videoRef]);

  // Dispose the Video.js player when the functional component unmounts
  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <>
    <div data-vjs-player> 
      <div ref={videoRef} />
    </div>
    <Button onClick={Take_Quiz} style={{marginTop : "30px",justifySelf : "center"  ,color : "#A31ACD"}}>Take Quiz</Button>
    </>
  );
}

export default VideoJS;