import Slider from './Custom/Slider';
import HomeCollectionComponent from './FeatureCollections/Collection';
import NewProducts from './NewProducts';
import Divider from './Divider';

const Hero = ({collections, products}) => {
  return (
    <>
      <Slider />
      <HomeCollectionComponent collections={collections.nodes} />
      <NewProducts products={products} />
      <Divider />
    </>
  );
};

export default Hero;
