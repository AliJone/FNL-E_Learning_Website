import { useState } from "react";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../contexts/Firebase";
import {Button} from '@mui/material';
import { MDBInput,MDBCardImage, MDBCol,MDBRow } from "mdb-react-ui-kit";
import { Col, Row } from "reactstrap";


export function ImageUpload({ onProfilePicChange, defaultPicUrl , text }) {
  const [progress, setProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState(defaultPicUrl);

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
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log("File available at", url);
          window.sessionStorage.setItem("ThumbnailURL",url);
          setDownloadURL(url);
          onProfilePicChange(url); // pass the image URL to the parent component
        });
      }
    );
  };

  return (
    <div className="ImageUpload">
      <form onSubmit={formHandler}>
      <p wrapperClass='mb-4' id='formControlLg' size="lg"> {text} </p>
      <MDBRow className='g-0 d-flex align-items-center' >
        <MDBCol md='2'>
          <MDBCardImage src={downloadURL} alt='image' className='rounded-t-5 rounded-tr-lg-0' fluid />
        </MDBCol>
        <MDBCol md='8'>
            <MDBInput type="file" className="input" />
        </MDBCol>
        <MDBCol>
          <Button type="submit" style={{color : "#A31ACD"}}>Upload</Button>
        </MDBCol>
      </MDBRow>


      </form>
      <p wrapperClass='mb-4' id='formControlLg' size="lg"> Uploading done {progress}% </p>
      <hr />
    </div>
  );
}

export default ImageUpload;
