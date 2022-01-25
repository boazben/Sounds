import React, { useContext, useState } from 'react';
import { SoundsContext } from '../../App';
import Style from './LoopToggle.module.css'

export default function LoopToggle() {
    const sounds = useContext(SoundsContext)
  
    // A state that check if the songs defined to loop or not:
    const [onOff, setOnOff] = useState(sounds[0].audio.loop)

    // Change the loop state, and the toggle:
    const loop = () => {
        sounds.forEach(sound => {
          sound.audio.loop = !sound.audio.loop
          setOnOff(sounds[0].audio.loop)
        })
      }

  return (
  <div onClick={loop} className={Style.container}>
      <div className={`${Style.text} ${onOff ? Style.textOn : Style.textOff}`}> {onOff? 'on' : 'off'}</div>
      <div className={`${Style.state} ${onOff ? Style.on : Style.off}`}></div>

  </div>
  );
}
