import React from "react";
import { useEffect } from "react";
import {MDBCard} from  'mdb-react-ui-kit';
import VideoJS from "../components/Basic_Templates/Video.jsx";
import 'video.js/dist/video-js.css';

export function VideoPlayer() {

    

    const videoJsOptions = {
        autoplay: true,
        controls: true,
        responsive: true,
        fluid: true,
        sources: [{
          src: window.sessionStorage.getItem('VideoURL'),
          type: 'video/mp4'
        }]
      };

    
  return (
    <div className="content">
      <h1>Video Player</h1>
        <MDBCard>
            {/* <video width="100%" height="100%" controls>
                <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
            </video> */}
            <VideoJS options={videoJsOptions}  />
            
        </MDBCard>
    </div>
  );
}
export default VideoPlayer;