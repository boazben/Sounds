import React, { useContext } from 'react';
import { SoundsContext } from '../../App';
import Toggle from './Toggle/Toggle';
import Style from './Channel.module.css'

export default function Channel({sound, color}) {

   
  return (
    <div className={Style.container} style={{backgroundColor: color}}>
        <div>{sound.name}</div>
        <Toggle sound={sound}/>
    </div>
  );
}
