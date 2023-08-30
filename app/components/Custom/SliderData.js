import img1 from '../images/Slider/img1.png';
import img2 from '../images/Slider/img2.png';
import slideCart from '../images/icons/slide_cart.svg';

export const sliderData = [
  {
    id: 'slide01',
    subText: 'Visual Solutions Unleashed',
    subTextBg: '#0566E1',
    title: 'Transforming Design with Graphics',
    paragraph:
      'Where Imagination Transforms Design: Explore how innovation and aesthetics converge, yielding captivating results for all your products and events.',
    btnText: 'Checkout Services',
    btnLink: '/services',
    btnBg: 'bg-white',
    btnColor: 'text-black',
    img: img1,
    bgColour: '#1E80FA',
  },
  {
    id: 'slide03',
    subText: 'Connect with us today!',
    subTextBg: '#282D34',
    title: 'Connect with us on all platforms',
    paragraph:
      'To keep up-to-date with any deals and promotions, please follow us on.',
    btnText: '',
    btnLink: '/services',
    btnBg: 'bg-white',
    btnColor: 'text-black',
    img: img1,
    bgColour: '#20242A',
  },
  {
    id: 'slide02',
    subText: 'Beyond Ordinary',
    subTextBg: '#2A1318',
    title: 'Elevate Every Occasion with the Perfect Gift',
    paragraph:
      'Discover Ideal Gifts for Every Occasion. From birthdays to special moments, our guide provides inspiration to make every event unforgettable.',
    btnText: 'Shop Now',
    btnLink: '/collections',
    btnBg: 'bg-black',
    btnColor: 'text-white',
    icon: slideCart,
    img: img2,
    bgColour: '#421E26',
  },

];
