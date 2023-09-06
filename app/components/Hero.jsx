import Slider from './Custom/Slider';
import HomeCollectionComponent from './FeatureCollections/Collection';
import NewProducts from './NewProducts';
import Divider from './Divider';
import HomeContact from './HomeContact';

const Hero = ({collections, products}) => {
  return (
    <>
      <Slider />
      <HomeCollectionComponent collections={collections.nodes} />
      <NewProducts products={products} />
      <Divider />
      <HomeContact />
      <Divider />
    </>
  );
};

export default Hero;
