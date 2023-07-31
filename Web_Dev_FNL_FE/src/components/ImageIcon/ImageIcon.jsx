import React from 'react';
import '../ImageIcon/ImageIcon.css';

export default function Image({props}) {
  return (
  <div className='d-inline-flex position-relative'>
    <img
      src={props}
      style={{ width: '150px', height: '150px' }}
    />
  </div>
  );
}