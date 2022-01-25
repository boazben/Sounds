import { useContext, useEffect, useRef, useState } from 'react';
import { SoundsContext } from '../App';
import Channel from './Channel/Channel';
import Style from './Channels.module.css';
import Cursor from './Cursor/Cursor';

// The colors to each channel:
const colors = ['#423733','#734536', '#BF4821', '#ED5A28','#C2755B' , '#F49373', '#C7A599', '#DBC3BB']

export default function Channels() {
    const sounds = useContext(SoundsContext)
    const container = useRef(null)
    
    // The current time of the song according to the first track:
        const [time, setTime] = useState(sounds[0]?.audio.currentTime / sounds[0]?.duration || 0)

    //When the component is mounting start check every 10 milliseconds 
    //the current time of the song:
        useEffect(() => {
            const timeInterval = setInterval(() => {
                setTime(sounds[0].audio.currentTime / sounds[0].duration)
            }, 10)

            return () => {
                clearInterval(timeInterval)
            }
        }, [])

  return (
    <div className={Style.container} ref={container}>
        {
            sounds.map(sound => {
                return <Channel sound={sound} color={colors[sound.index]} key={sound.index} />
            })
        }

        <Cursor coordinates={container?.current?.getBoundingClientRect()} position={container?.current?.offsetWidth * (time)} />
        {/* "coordinates": Location data for the container of all the channels.  */}

        {/* Indicates where the song is-
        The width of the div varies depending on the current time of the song:  */}
        <div className={Style.played} style={{width: `${container?.current?.offsetWidth * (time) || 0}px`}}>
        </div>
    </div>
  );
}
