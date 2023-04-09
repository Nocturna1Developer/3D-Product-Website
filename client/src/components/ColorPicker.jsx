import React from 'react'

// Simply uses the react color package so we don't do any work here
import { SketchPicker } from 'react-color'
import { useSnapshot } from 'valtio'

import state from '../store';

const ColorPicker = () => {
  const snap = useSnapshot(state);

  // snap.color is coming from store/index.js
  return (
    <div className="absolute left-full ml-3">
      <SketchPicker
        color={snap.color}
        disableAlpha
        presetColors={[
          "#ccc",
          "#EFB",
          "#EFBD4E",
          "#726DE8",
          "#353934",
          "#2CCCE4",
          "#ff8a65",
          "#512314",
          "#5F123D",
          "#f0f0f0",
          "#000000",
          "#000080",
        ]}
        onChange={(color) => state.color = color.hex}
      />
    </div>
  )
}

export default ColorPicker