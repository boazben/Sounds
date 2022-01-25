import React, { useContext, useEffect, useRef, useState } from 'react';
import Style from './Cursor.module.css'
import ChannelsStyle from '../Channels.module.css'
import { SoundsContext } from '../../App';

export default function Cursor({position, coordinatesState}) {
    const coordinates= coordinatesState
    

    const sounds = useContext(SoundsContext)
   
    const cursor = useRef(null)
   
    const [x, setOffset] = useState(position || 0);
    

    const[timePosition, setTimePosition] = useState(true)
   

    useEffect(() => {

        const mouseDown = () => {
            setTimePosition(false)


            const mouseMove = event => {
                    if(
                        event.clientY > coordinates.y && event.clientY < (coordinates.y + coordinates.height)
                        && event.clientX > coordinates.x && event.clientX < (coordinates.x + coordinates.width)
                    ) {
                        let newDx = event.pageX - coordinates.x;
                        setOffset(newDx);
                    }
               
                function mouseUp(e) {
                    sounds.forEach(sound => {
                        sound.audio.currentTime = sound.duration * ((e.clientX - coordinates.x) / coordinates.width) 
                    })
                    document.removeEventListener("mousemove", mouseMove);
                    document.removeEventListener("mouseup", mouseUp);
                    setTimePosition(true)
                }
    
                document.addEventListener("mouseup",mouseUp)
            };
      
            document.addEventListener("mousemove", mouseMove);
        }

        cursor.current.addEventListener("mousedown", mouseDown);
        
    
        return () => {
            cursor?.current?.removeEventListener("mousedown", mouseDown);
        };
      }, [coordinates]);

      useEffect(() => {
        if(timePosition) {
            setOffset(position)
        } 
      }, [position]);
 

  return (
       
        
      <div ref={cursor} className={`${ChannelsStyle.cursor} ${Style.cursor}`} style={{transform: `translate(${timePosition ? position : x}px)`}}>
      </div>
  )
}
