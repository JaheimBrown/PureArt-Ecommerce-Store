import {homeCollections} from './ServiceCardData';
import CollectionHandles from './CollectionHandles';
import CollectionCards from './CollectionCards';

const HomeCollectionComponent = ({collections}) => {
  return (
    <section className="collection-grid">
      <CollectionHandles collections={collections} />
      {homeCollections?.map((card) => (
        <CollectionCards card={card} version={true} />
      ))}
    </section>
  );
};

export default HomeCollectionComponent;
