import React, { useState, useEffect } from 'react';
import { useSnapshot } from 'valtio';
import { download } from '../assets'; // icon

import { downloadCanvasToImage, reader } from '../config/helpers';
import { AnimatePresence, motion } from 'framer-motion';
import { fadeAnimation, slideAnimation } from '../config/motion';
import { AIPicker, ColorPicker, CustomButton, FilePicker, Tab } from '../components';
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants';

// Sets up the url of the backend
import config from '../config/config';
import state from '../store';

const Customizer = () => {
  const snap = useSnapshot(state);

  return (
    <AnimatePresence>
      {snap.intro &&
        (<>
          <motion.div key="custom" className="absolute top-0 left-0 z-10" {...slideAnimation("left")}>
            <div className="flex items-center min-h-screen" {...slideAnimation("right")}>
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    handleClick={() => { }}
                  />
                ))}
              </div>
            </div>
          </motion.div>


          <motion.div className='absolute z-10 top-5 right-5' {...fadeAnimation}>
            <CustomButton
              type="filled"
              title="Go Back"
              handleClick={() => state.intro = true}
              customStyles={"w-fit px-4 py-2.5 font-bold text-sm"} />
          </motion.div>
        </>)
      }
    </AnimatePresence>
  )
}

export default Customizer