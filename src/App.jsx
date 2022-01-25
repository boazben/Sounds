import { createContext, useRef } from 'react';
import './App.css';
import Channels from './Channels/Channels';
import Controller from './Controller/Controller';
import Header from './Header/Header';
import soundsNames from './soundsNames.json';
  
// All sounds have the ability to be changed directly from the whole app:
  export const SoundsContext = createContext()

function App() {

  // Create the "sound" object' with the audio element, name, index and duration:
  const soundsRef = useRef(
      soundsNames.map((sound, index) => {
      const audio = new Audio(`./Sounds/${sound.path}`)
      const res = {
        audio,
        name: sound.name,
        index: index
      }
      audio.addEventListener('loadedmetadata', (e) => {
        res.duration =  e.target.duration
      })
      return res
    })
  )

  return (
  <div className="GeneralContainer">
    <Header />
    <SoundsContext.Provider value={soundsRef.current}>
      <Channels />
      <Controller />
    </SoundsContext.Provider>
  </div>
  )
}

export default App;
