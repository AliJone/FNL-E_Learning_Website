
import { useState } from "react";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../contexts/Firebase";
import {Button} from '@mui/material';
import { MDBInput,MDBCol,MDBRow } from "mdb-react-ui-kit";

// var dr = 'https://firebasestorage.googleapis.com/v0/b/forget-normal-life.appspot.com/o/default-avatar.png?alt=media&token=92a92dbe-097e-463e-a96b-ff6d814a0b28'

export  function FileUpload(defaulturl) {

    const [progress, setProgress] = useState(0);
    const [downloadURL, setDownloadURL] = useState(defaulturl);

    const formHandler = (e) => {
        e.preventDefault();
        const file = e.target[0].files[0];
        uploadFiles(file);
      };

      const uploadFiles = (file) => {
        if (!file) {
          console.log(file)
          return;
        }
        const storageRef = ref(storage, `files/materials/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progress);
                }
            ,
            (error) => {
                console.log(error);
            }
            ,
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log("File available at", downloadURL)
                    window.sessionStorage.setItem("MaterialURL" , downloadURL);
                    setDownloadURL(downloadURL);
                });
            }
        );
        };

        return (

            <div className="VideoUpload">
              <form onSubmit={formHandler}>
                {/* <ImageIcon props={downloadURL} /> */}
                <MDBRow className='g-0 d-flex align-items-center' >
                  <MDBCol md='8'>
                    <p wrapperClass='mb-4' id='formControlLg' size="lg"> Upload Material </p>
                  </MDBCol>
                  <MDBCol md='8'>
                    <MDBInput src = {defaulturl} type="file" className="input" style={{justifyContent : "flex-start"}} />
                  </MDBCol>
                  <MDBCol>
                    <Button type="submit"  style={{color : "#A31ACD"}} >Upload</Button>
                  </MDBCol>
                </MDBRow>
              </form>
              <p wrapperClass='mb-4' id='formControlLg' size="lg"> Uploading done {progress}% </p>
              <hr />
            </div>

          );


}

// export default Video_uploader;