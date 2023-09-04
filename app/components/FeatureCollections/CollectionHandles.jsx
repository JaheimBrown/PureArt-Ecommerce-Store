import {useState} from 'react';
import {Link} from '@remix-run/react';

// IMAGES
import braceletBg from '../images/Collection/handleImages/braceleBG.jpg';

const CollectionHandles = ({collections}) => {
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  const handleMouseOver = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseOut = () => {
    setHoveredIndex(-1);
  };

  return (
    <div
      className="flex flex-col items-center justify-center gap-6 p-6 relative"
      style={{backgroundImage: `url(${braceletBg})`, backgroundSize: 'cover'}}
    >
      <div
        className="dark-overlay"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
        }}
      ></div>
      {collections?.map((data, index) => (
        <Link
          onMouseOver={() => handleMouseOver(index)}
          onMouseOut={handleMouseOut}
          to={`collections/${data.handle}`}
          className={`relative flex justify-center items-center ${
            hoveredIndex === index ? 'handle-text-filled' : 'handle-text'
          }`}
          key={index}
        >
          <span
            className={`relative ${
              hoveredIndex === index ? 'show rotate-animation' : 'hidden'
            }`}
          >
            *
          </span>
          {data.title}
        </Link>
      ))}
    </div>
  );
};

export default CollectionHandles;
