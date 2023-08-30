import {useState, useEffect} from 'react';
import {Link} from '@remix-run/react';
import { sliderData } from './SliderData';
import Loader from './Loader';

// ASSETS
import arrow from '../images/arrow.svg'
import whatsapp from '../images/icons/whatsapp.svg'
import instagram from '../images/icons/instagram.svg'
import facebook from '../images/icons/facebook.svg'
import pinterest from '../images/icons/pinterest.svg'

const socials = [
  {
    link: "",
    img: whatsapp,
    name: "Whatsapp link"
  },
  {
    link: "",
    img: instagram,
    name: "Instagram link"
  },
  {
    link: "",
    img: facebook,
    name: "Facebook link"
  },
  {
    link: "",
    img: pinterest,
    name: "Pinterest link"
  },
];

const Slider =() => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % sliderData.length);
      }, 5000); // 5000 milliseconds = 5 seconds
  
    return () => {
      clearInterval(interval);
    };
  }, [currentIndex])

  return (
    <>
    <section
      className="min-h-[89vh] lg:max-h-[570px] w-full pt-12  relative overflow-hidden"
      style={{backgroundColor: `${sliderData[currentIndex].bgColour}`}}
    >

      {/* RESPONSIVE IMAGES */}
      {sliderData[currentIndex].id === 'slide01' && (
            <img
              src={sliderData[currentIndex].img}
              alt=""
              className="hidden lg:block absolute bottom-0 right-0 w-full h-full max-w-[508px] max-h-[597px] object-cover"
            />
          )}

          {/* SOCIAL LINKS */}
      {sliderData[currentIndex].id === 'slide03' && (
          <div className='flex items-center justify-center gap-6 py-6 px-12 custom-radius max-w-[340px] absolute bottom-0 md:left-[unset] md:right-[10%] left-12' style={{backgroundColor: `${sliderData[currentIndex].subTextBg}`}}>
            {socials?.map((link, index) => (
              <Link 
                key={index} to={link.link} target='_blank' className='flex jusitfy-center items-center'>
                    <img src={link.img} alt={link.name} className=' w-8 h-8 cursor-pointer'/>
              </Link>
            ))}
          </div>
        )}

      <div className='relative h-full lg:max-h-[570px] w-full max-w-[1300px] mx-auto'>
        {/* SECTION GRAPHICS */}
      {sliderData[currentIndex].id === 'slide01' && (
        <div className="slide_01-graphic" />
      )}

      <div className="flex lg:flex-row flex-col items-start justify-center gap-16 mt-20">
        {/* INFORMATION SIDE */}
        <div
          className={`flex-1 relative ${
            sliderData[currentIndex].id === 'slide01' || sliderData[currentIndex].id === 'slide03' ? 'px-12 lg:px-32' : 'px-16'
          } `}
        >

        {sliderData[currentIndex].id === 'slide03' && (
          <img src={arrow} alt='' className='hidden lg:block absolute top-[130%] lg:left-[33%]' />
        )}
          <div className="flex items-start justify-start flex-col gap-2">
            <p
              className="text-[14px] leading-[22px] py-1 px-2 rounded flex justify-center items-center"
              style={{
                backgroundColor: `${sliderData[currentIndex].id === "slide03" ? "#282D34" : sliderData[currentIndex].subTextBg}`,
                color: '#fff',
              }}
            >
              {sliderData[currentIndex].subText}
            </p>
            <h1 className="text-white font-bold text-5xl leading-[54px] w-full max-w-[580px]">
              {sliderData[currentIndex].title}
            </h1>
          </div>

          <div className="flex flex-col items-start justify-start gap-6 mt-5">
            <p
              className="text-lg leading-[30px] font-normal max-w-[500px]"
              style={{color: '#EDEDED'}}
            >
              {sliderData[currentIndex].paragraph}
            </p>
            {sliderData[currentIndex].btnText && (
              <Link
                className={`primary-btn text-lg leading-[30px] font-medium gap-3 ${sliderData[currentIndex].btnBg} ${sliderData[currentIndex].btnColor}`}
                to={`${sliderData[currentIndex].btnLink}`}
              >
                {sliderData[currentIndex].icon && (
                  <img
                    src={sliderData[currentIndex].icon}
                    alt={sliderData[currentIndex].title}
                  />
                )}{' '}
                {sliderData[currentIndex].btnText}
              </Link>
            )}
          </div>
        </div>

        {/* IMAGE COMPONENT SLIDE */}
        <div className={sliderData[currentIndex].id === 'slide03' ? "flex-1 self-stretch relative lg:pb-0 pb-16" : "flex-1 relative"}>
          {sliderData[currentIndex].id === 'slide02' && (
            <img
              src={sliderData[currentIndex].img}
              alt=""
              className="absolute top-[90%] -left-8 min-h-[400px] min-w-[580px]"
            />
          )}

        {sliderData[currentIndex].id === 'slide03' && (
          <div className='lg:flex flex-col items-start justify-start absolute top-0 right-12 pointer-events-none hidden'>
            <p className='text-style-big'>CONNECT</p>
            <p className='text-style-big'>WITH US!</p>
          </div>
        )}
        </div>
      </div>
      </div>
    </section>
    <Loader sliderData={sliderData} currentIndex={currentIndex} />
    </>
  );
};

export default Slider;
