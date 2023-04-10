import React from 'react'
import { useSnapshot } from 'valtio';

import state from '../store';
import { getContrastingColor } from '../config/helpers';

// The things in the parentheses are props
const CustomButton = ({ type, title, customStyles, handleClick }) => {
  const snap = useSnapshot(state);

  // Creates two type of button variations
  // Color is defined in valtio state
  const generateStyle = (type) => {
    if (type === 'filled') {
      return {
        backgroundColor: snap.color,
        color: getContrastingColor(snap.color)
      }
    } else if (type === "outline") {
      return {
        borderWidth: '1px',
        borderColor: snap.color,
        color: snap.color
      }
    }
  }

  {/* references line 40 on home.jsx and it will be toggled to false after clicking on it*/ }
  return (
    <button
      className={`px-2 py-1.5 flex-1 rounded-md ${customStyles}`}
      style={generateStyle(type)}
      onClick={handleClick}
    >
      {title}
    </button>
  )
}

export default CustomButton