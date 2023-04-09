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

  // upload files state
  const [file, setFile] = useState('');

  // using an AI prompt
  const [prompt, setPrompt] = useState('');

  // loading state of the image
  const [generatingImg, setGeneratingImg] = useState(false);

  // determines if the tabs are active
  const [activeEditorTab, setActiveEditorTab] = useState("");

  // determines if we are showing the logo or full texture
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  })

  // show tab content based on the active tab, this is now abled to be implemented after we created all of our use states
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />
      case "filepicker":
        return <FilePicker
          file={file}
          setFile={setFile}
          readFile={readFile}
        />
      case "aipicker":
        return <AIPicker
          prompt={prompt}
          setPrompt={setPrompt}
          generatingImg={generatingImg}
          handleSubmit={handleSubmit}
        />
      default:
        return null
    }
  }

  // do we want to create a logo or full texture
  const handleSubmit = async (type) => {
    if (!prompt) return alert("Please enter a prompt!!");

    try {

      // calling our backend to generate an AI image
      setGeneratingImg(true);

      const response = await fetch('http://localhost:8080/api/v1/dalle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt,
        })
      })

      const data = await response.json();
      handleDecals(type, `data:image/png;base64,${data.photo}`)

    } catch (error) {
      alert(error)
    } finally {
      setGeneratingImg(false);
      setActiveEditorTab("");
    }


  }

  // this is updating the store/index.js - logoDecal, fullDecal
  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];
    state[decalType.stateProperty] = result

    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab)
    }
  }

  // determines if the texture or logo is active, are we showing both? or only one?
  // comes from store/index.js
  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case "stylishShirt":
        state.isFullTexture = !activeFilterTab[tabName];
        break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
        break;
    }


    // after setting the state, we can update the active filter tab
    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName]
      }
    })

  }

  // adds decals to the shirt based on file uploaded
  const readFile = (type) => {
    reader(file).then((result) => {
      handleDecals(type, result);
      setActiveEditorTab("");
    })
  }

  // The handle click event now shows the name of the tab when its clicked
  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            key="custom"
            className="absolute top-0 left-0 z-10"
            {...slideAnimation('left')}
          >
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    handleClick={() => setActiveEditorTab(tab.name)}
                  />
                ))}

                {generateTabContent()}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute z-10 top-5 right-5"
            {...fadeAnimation}
          >
            <CustomButton
              type="filled"
              title="Go Back"
              handleClick={() => state.intro = true}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
            />
          </motion.div>

          <motion.div
            className='filtertabs-container'
            {...slideAnimation("up")}
          >
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab={activeFilterTab[tab.name]}
                handleClick={() => handleActiveFilterTab(tab.name)}
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Customizer