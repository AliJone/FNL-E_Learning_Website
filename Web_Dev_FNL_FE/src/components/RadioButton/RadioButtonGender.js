import React from 'react';
import { MDBRadio } from 'mdb-react-ui-kit';

export default function Radio({ onChange }) {
  const handleGenderChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <div style={{ marginBottom: '40px' }}>
      <p wrapperClass='mb-4' id='formControlLg' size='lg'>
        Gender*
      </p>
      <MDBRadio
        name='inlineRadio'
        id='inlineRadio1'
        value='Male'
        label='Male'
        inline
        onChange={handleGenderChange}
      />
      <MDBRadio
        name='inlineRadio'
        id='inlineRadio2'
        value='Female'
        label='Female'
        inline
        onChange={handleGenderChange}
      />
    </div>
  );
}
