import React, { useContext } from 'react';
import { SoundsContext } from '../App';
import Style from './Controller.module.css'
import LoopToggle from './LoopToggle/LoopToggle';

export default function Controller() {
    const sounds = useContext(SoundsContext)

    // Start to play the audios:
    const start = () => {
        sounds[0].audio.play(); sounds[4].audio.play();
        sounds[1].audio.play(); sounds[5].audio.play();
        sounds[2].audio.play(); sounds[6].audio.play();
        sounds[3].audio.play(); sounds[7].audio.play();
      }

    // Stop the audios and back to the start of the song:
    const stop = () => {
      sounds.forEach(sound => {
        sound.audio.pause()
        sound.audio.currentTime = 0
      })
  
    }
  return (
    <div className={Style.container}>
        <button className={Style.btn} onClick={start}><i className="fas fa-play"></i></button>
        <button className={Style.btn} onClick={stop}><i className="fas fa-stop"></i></button>
        <div className={Style.toggleContainer}>
            <div><i className="fas fa-undo-alt"></i></div>
            <LoopToggle />
        </div>
    </div>
  );
}
