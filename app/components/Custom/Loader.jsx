import {useEffect, useState} from 'react'
import { sliderData } from './SliderData';

const Loader = ({currentIndex}) => {
    const [expanded, setExpanded] = useState(false);

  // SWITCHING FUNCTIONALITY
  useEffect(() => {
    // Function to expand and reset the element
    const expandElement = () => {
      setExpanded(true);

      // Reset the element's expansion after the transition completes
      setTimeout(() => {
        setExpanded(false);
      }, 4950); // Total cycle time
    };

    // Start the first expansion after the component mounts
    expandElement();

    const intervalId = setInterval(expandElement, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []); // Empty dependency array ensures this runs only once after mounting


  return (
      <div className='expanding-container'>
        <div className={expanded ? 'expanding-element expanded' : 'expanding-element'}
        style={{backgroundColor: `${sliderData[currentIndex].subTextBg}`}} />
      </div>
  )
}

export default Loader