import React from 'react';
import avatar3 from "../../data/avatar3.png";
import { useStateContext } from '../../contexts/ContextProvider';

const Button = ({ icon, bgColor, color, bgHoverColor, size, text, borderRadius, width,height }) => {
  const { setIsClicked, initialState } = useStateContext();

  return (
    <button
      type="button"
      onClick={() => setIsClicked(initialState)}
      style={{ backgroundColor: bgColor, color, borderRadius,
      border: "0",
      padding:"6px",
      width:width,
      height:height
      
    //border:"0.5px rgb(48, 46, 46) solid"
  }}
     //style={{  
      //border: "0.5px rgb(48, 46, 46) solid",
      //backgroundImage: `url(${avatar3})` ,
      //backgroundPosition: 'center',
      //backgroundSize: 'cover',
      //backgroundRepeat: 'no-repeat',
    //} }
     > 
     {icon }{text}
    </button>
  );
};

export default Button;
