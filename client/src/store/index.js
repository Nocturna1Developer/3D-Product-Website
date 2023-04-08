// This file is used in home.jsx

import { proxy } from 'valtio';

// Initialize the state, whatever is defined inhere you can utilize in the whole application
const state = proxy({
  intro: true, // currently on home page or not?
  color: '#EFBD48', 
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: './threejs.png',
  fullDecal: './threejs.png',
});

export default state;