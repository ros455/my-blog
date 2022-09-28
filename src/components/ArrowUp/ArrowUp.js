import React from 'react'
import {FaArrowAltCircleUp} from 'react-icons/fa'
import arrowup from './ArrowUp.css'
export const ArrowUp = () => {
    const [isBool, setIsBool] = React.useState(false);
    React.useEffect(
        (e) => {
          document.addEventListener("scroll", scrollHandller);
    
          return function () {
            document.removeEventListener("scroll", scrollHandller);
          };
        },
        []
      );

      const scrollHandller = (e) => {
        if(e.target.documentElement.scrollTop > 300) {
            setIsBool(true)
        }
        else{
            setIsBool(false)
        }
      };

      const scrollTop = (e) => {
        window.scrollTo( 0, 10 );
      }

      return (
        <>
        {isBool && <div className='arrow-up'>
            <button onClick={(e) => scrollTop(e)}>
            <FaArrowAltCircleUp className='FaArrowAltCircleUp'/>
            </button>
        </div>}
        </>
      )
}
