import {TailSpin} from 'react-loader-spinner';
import React from 'react';

// Spinner component with optional color prop
const Spinner = ({color}) => {
  return (
    <>
      {/* TailSpin loader with color and size props */}
      <TailSpin color={color ? color : '#fff'} height={20} width={20} />
    </>
  );
};

export default Spinner;
