// ASSET IMPORTS
import gift from './images/homeContactBg.png';
// PACKAGES
import {Link} from '@remix-run/react';

const HomeContact = () => {
  return (
    <section className="p-6">
      <section className="flex flex-col lg:flex-row gap-16 w-full max-w-[1200px] mx-auto">
        <div className="flex-1 flex flex-col gap-5 items-start justify-start">
          <h2 className="heading-2 text-black">What is PureArt?</h2>
          <p className="paragraph-text">
            We are a Gift Shop at heart, and we can assist you in creating a
            "CUSTOMIZABLE" gift for someone special. We craft GREETING CARDS,
            BRACELETS, various types of PORTRAITS, and offer SCREEN PRINTING,
            just to name a few.
          </p>
          <p className="paragraph-text text-black">
            We also offer graphic design assistance for the development of
            FLYERS, BUSINESS CARDS, LOGOS, POSTERS, and other graphics that can
            help showcase your business or organization, all at an affordable
            cost.
          </p>
          <Link
            to={`/contact`}
            className="primary-btn mt-8"
            style={{backgroundColor: '#000', color: '#fff'}}
          >
            Contact Us
          </Link>
        </div>
        <div className="flex-1 hidden lg:block">
          <img
            src={gift}
            alt="Gift Wrapping"
            className="w-full h-full object-cover"
          />
        </div>
      </section>
    </section>
  );
};

export default HomeContact;
