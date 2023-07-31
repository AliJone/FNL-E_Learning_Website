import React from 'react';
import { MDBRadio } from 'mdb-react-ui-kit';

export default function RadioR({ onChange }) {
  const handleRoleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <div style={{ marginBottom: '40px' }}>
      <p wrapperClass='mb-4' id='formControlLg' size='lg'>
        Role*
      </p>
      <MDBRadio
        name='inlineRadio1'
        id='inlineRadio1'
        value='student'
        label='Student'
        inline
        onChange={handleRoleChange}
      />
      <MDBRadio
        name='inlineRadio1'
        id='inlineRadio2'
        value='teacher'
        label='Teacher'
        inline
        onChange={handleRoleChange}
      />
    </div>
  );
}
