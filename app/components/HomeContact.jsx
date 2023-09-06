// ASSET IMPORTS
import splash from './images/splash.jpg';
// MODULE & PACKAGE IMPORTS
import {Link} from '@remix-run/react';

const HomeContact = () => {
  return (
    <section className="px-6">
      <div
        className="flex flex-col items-center justify-start text-center px-8 py-12 rounded-xl w-full max-w-[1200px] mx-auto min-h-[250px] mt-8"
        style={{backgroundImage: `url(${splash})`, backgroundSize: 'cover'}}
      >
        <div className="flex-1">
          <h2 className="md:text-[48px] text-[32px] leading-[52.8px] text-white font-bold">
            In Search Of More?
          </h2>
          <p className="text-[20px] leading-[30px] text-white md:w-[60%] w-full  mx-auto">
            Feel free to check out our multitude of services catering to all
            your business and personal needs.
          </p>
        </div>
        <Link
          to={`/services`}
          className="primary-btn mt-8"
          style={{backgroundColor: '#fff', color: '#000'}}
        >
          Checkout Services
        </Link>
      </div>
    </section>
  );
};

export default HomeContact;
