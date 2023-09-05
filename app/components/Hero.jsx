import Slider from './Custom/Slider';
import HomeCollectionComponent from './FeatureCollections/Collection';
import NewProducts from './NewProducts';

const Hero = ({collections, products}) => {
  return (
    <>
      <Slider />
      <HomeCollectionComponent collections={collections.nodes} />
      <NewProducts products={products} />
    </>
  );
};

export default Hero;
