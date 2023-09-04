import Slider from './Custom/Slider';
import HomeCollectionComponent from './FeatureCollections/Collection';

const Hero = ({collections}) => {
  return (
    <>
      <Slider />
      <HomeCollectionComponent collections={collections.nodes} />
    </>
  );
};

export default Hero;
