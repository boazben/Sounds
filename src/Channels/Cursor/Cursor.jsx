import React, { useContext, useEffect, useRef, useState } from 'react';
import Style from './Cursor.module.css'
import ChannelsStyle from '../Channels.module.css'
import { SoundsContext } from '../../App';

export default function Cursor({position, coordinates}) {
    
    // The sounds of all channels:
    const sounds = useContext(SoundsContext)

    // The cursor element:
    const cursor = useRef(null)

    // The state of where the cursor coordinates on x axis:
    const [x, setOffset] = useState(position || 0);

    // Boolean state that shows whether to place the cursor-
    // by the current time song or by the location of the mouse:  
    const[timePosition, setTimePosition] = useState(true)
   
    useEffect(() => {

        // Define all the events listeners just after the client click on the cursor:
        const mouseDown = () => {

            // Now, after the client clicked on the cursor, 
            //the cursor position is where the mouse and not where the song time:
            setTimePosition(false)
            
            // When the mouse moved, the cursor position is where the mouse: 
            const mouseMove = event => {
                if(
                // The cursor position will change just if the client mouse in the container off all the channels:
                    event.clientY > coordinates.y && event.clientY < (coordinates.y + coordinates.height)
                    && event.clientX > coordinates.x && event.clientX < (coordinates.x + coordinates.width)
                ) { // The new cursor coordinates:
                    let newDx = event.pageX - coordinates.x;
                    setOffset(newDx);
                }
                
                // When the client will click on the second time, 
                //the song will change to where the mouse is:
                function mouseUp(e) {
                    sounds.forEach(sound => {
                        sound.audio.currentTime = sound.duration * ((e.clientX - coordinates.x) / coordinates.width) 
                    })

                    // After the song changed to the new time, remove the listeners:
                    document.removeEventListener("mousemove", mouseMove); document.removeEventListener("mouseup", mouseUp);
                    
                    // Now the cursor back to follow after the song time:
                    setTimePosition(true)
                    
                }; document.addEventListener("mouseup",mouseUp)
            }; document.addEventListener("mousemove", mouseMove);
        }; cursor.current.addEventListener("mousedown", mouseDown);
        
        return () => {
            // When the component will unmount, remove the event listener:
            cursor?.current?.removeEventListener("mousedown", mouseDown);
        };
    // This useEffect run every time when the "coordinates" changed otherwise the coordinates will be "undefined" :
      }, [coordinates]);

    // Every time the song time changed, check if need to change the cursor position,
    //or not because the client clicked on the cursor:
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
