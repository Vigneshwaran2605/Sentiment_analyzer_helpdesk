import React, { useState } from 'react'
import { useStateContext } from '../contexts/ContextProvider';
const FeedbackNav = () => {
  const { currentColor } = useStateContext();
  const [isHovered, setIsHovered] = useState(false);
  const [isStyled, setIsStyled] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const defaultStyle = {
    padding: '10px',
    transition: 'color 0.3s ease',
    color: isHovered ? currentColor : '#FFFFFF',
  };

  const style = {
    padding: '10px',
    transition: 'color 0.3s ease',
    color: isStyled ? currentColor : '#FFFFFF',
  };

  const styling = {
    padding: '10px',
    transition: 'color 0.3s ease',
    color: isHover ? currentColor : '#FFFFFF',
  };
  return (
 
    <div>
      <ul className='flex pt-8 pl-8'>
        <li>
        <button
            type="button"
            className="text-xl"
            style={defaultStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Call Analysis
          </button>
        </li>
        <li>
        <button
            type="button"
            className="text-xl"
            style={style}
            onMouseEnter={() => setIsStyled(true)}
            onMouseLeave={() => setIsStyled(false)}
          >
            Customer
          </button>
        </li>
        <li>
        <button
            type="button"
            className="text-xl"
            style={styling}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            Manager
          </button>
        </li>
      </ul>
    </div>

  )
}

export default FeedbackNav