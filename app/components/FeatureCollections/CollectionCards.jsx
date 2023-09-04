import {Link} from '@remix-run/react';
import whatsappIcon from '../images/icons/whatsapp.svg';

const CollectionCards = ({card, version}) => {
  const {title, img, bgColour, highlight, price, id} = card;

  return (
    <>
      {version ? (
        <div
          className="flex flex-row text-white"
          key={id}
          style={{backgroundColor: `${bgColour}`}}
        >
          <div className="flex-1">
            <img className="" src={img} alt={`${title} Card`} />
          </div>
          <div className="flex-1 flex flex-col justify-end items-start">
            <div className="p-6 pb-12">
              <h2 className="text-stroke_card">{title}</h2>
              <Link
                to="/services"
                className={
                  id === 1
                    ? 'primary-btn shadow2 mt-5 max-w-[200px]'
                    : 'primary-btn mt-5 max-w-[200px]'
                }
                style={{backgroundColor: '#fff', color: '#000'}}
              >
                Checkout Services
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="flex flex-row text-white"
          key={id}
          style={{backgroundColor: `${bgColour}`}}
        >
          <div className="flex-1">
            <img className="" src={img} alt={`${title} Card`} />
          </div>
          <div className="flex-1 flex flex-col justify-end items-start">
            <div className="">
              <h2 className="text-stroke_card">{title}</h2>
            </div>

            <Link to="/services">Checkout Services</Link>
          </div>
        </div>
      )}
    </>
  );
};
export default CollectionCards;
