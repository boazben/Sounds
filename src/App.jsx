import { createContext, useContext, useEffect, useRef } from 'react';
import './App.css';
import Channels from './Channels/Channels';
import Controller from './Controller/Controller';
import Header from './Header/Header';


const soundsNames = [
  {path: "_tambourine_shake_higher.mp3", name: "Tambourine"},
  {path: "B_VOC.mp3", name: "Middle Voice"},
  {path: "DRUMS.mp3", name: "Drums"},
  {path: "HE_HE_VOC.mp3", name: "He Voice"}, 
  {path: "HIGH_VOC.mp3", name: "High Voice"},
  {path: "JIBRISH.mp3", name: "Jibrish"}, 
  {path: "LEAD_1.mp3", name: "Low Voice"}, 
  {path: "UUHO_VOC.mp3", name: "Ho Voice"}];
  
export const SoundsContext = createContext()

function App() {

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
      {/* <TimeSquare audio={soundsRef.current[0].audio} /> */}
      <Channels />
      <Controller />
    </SoundsContext.Provider>
  </div>
  )
}

export default App;
