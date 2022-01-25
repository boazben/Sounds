import React, { useEffect, useState } from 'react';
import Style from './TimeSquare.module.css'

export default function TimeSquare({audio}) {
    const [time, setTime] = useState(audio.currentTime)
    

    useEffect(() => {

        const timeInterval = setInterval(() => {
            setTime(audio.currentTime.toFixed(1))
        }, 50)

        return () => {
            clearInterval(timeInterval)
        }
    }, [])
  return (
      
  <div>
      {time}
  </div>
  );
}
