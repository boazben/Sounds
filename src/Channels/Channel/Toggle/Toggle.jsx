import React, { useState } from 'react';
import Style from './Toggle.module.css'

export default function Toggle({sound}) {
    
    // The sound state ,helpful to know if this channel is muted or not:
    const [muted, setMuted] = useState(sound.audio.muted)

    // Mute the sound, but not stopped it:
    const mute = () => {
        sound.audio.muted = !sound.audio.muted
        setMuted(sound.audio.muted)
    }

  return (
  <div onClick={mute} className={Style.container}>
      <div className={`${Style.text} ${!muted ? Style.textOn : Style.textOff}`}> {!muted? 'on' : 'off'}</div>
      <div className={`${Style.state} ${!muted ? Style.on : Style.off}`}></div>
  </div>
  );
}
