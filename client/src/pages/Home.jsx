// Basically makes animations work, located in motion.js
import { motion, AnimatePresence } from 'framer-motion';
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation
} from '../config/motion';

import { useSnapshot } from 'valtio';
import state from '../store';
import { CustomButton } from '../components';

const Home = () => {
  const snap = useSnapshot(state);

  return (
    <AnimatePresence>
      {/* Checks if we are currently on the home page */}
      {snap.intro &&
        (<motion.section className="home" {...slideAnimation('left')}>

          <motion.header {...slideAnimation("down")}>
            <img src="./threejs.png" alt="logo" className="w-8 h-8 object-contain"></img>
          </motion.header>

          <motion.div className="home-content" {...headContentAnimation}>
            <motion.div {...headTextAnimation}>
              <h1 className="head-text">
                LET'S <br className="x1:block hidden" /> GET IT!
              </h1>
            </motion.div>

            <motion.div {...headContentAnimation} className='flex flex-col gap-5'>
              <p className="max-w-md font-normal text-grey-600 text-base">
                Simply type the object you desire, type the logo or style you want the object to have, and download the object and enjoy!
              </p>
              {/* Check tailwind for more options on customizing buttons "w-fit" etc */}
              <CustomButton
                type="filled"
                title="Customize It"
                handleClick={() => state.intro = false}
                customStyles={"w-fit px-4 py-2.5 font-bold text-sm"} />

            </motion.div>
          </motion.div>

        </motion.section>)
      }
    </AnimatePresence>
  )
}
export default Home