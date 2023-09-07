import {useLoaderData, Link} from '@remix-run/react';
import {json} from '@shopify/remix-oxygen';
import {Pagination, getPaginationVariables, Image} from '@shopify/hydrogen';
import {useState} from 'react';

export async function loader({context, request}) {
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 4,
  });

  const {collections} = await context.storefront.query(COLLECTIONS_QUERY, {
    variables: paginationVariables,
  });

  return json({collections});
}

export default function Collections() {
  const {collections} = useLoaderData();

  return (
    <div className="top-[64px]">
      <Pagination connection={collections}>
        {({nodes, isLoading, NextLink}) => (
          <div>
            <CollectionsGrid collections={nodes} />
            <NextLink>
              {isLoading ? (
                'Loading...'
              ) : (
                <span
                  className="primary-btn max-w-[200px] mx-auto mt-12"
                  style={{backgroundColor: '#000', color: '#fff'}}
                >
                  Load More
                </span>
              )}
            </NextLink>
          </div>
        )}
      </Pagination>
    </div>
  );
}

function CollectionsGrid({collections}) {
  return (
    <div className="collections-grid-container">
      {collections.map((collection, index) => (
        <CollectionItem
          key={collection.id}
          collection={collection}
          index={index}
        />
      ))}
    </div>
  );
}

function CollectionItem({collection, index}) {
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  const handleMouseOver = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseOut = () => {
    setHoveredIndex(-1);
  };
  return (
    <Link
      className={`flex justify-center items-center relative w-full h-full`}
      key={collection.id}
      to={`/collections/${collection.handle}`}
      prefetch="intent"
      onMouseOver={() => handleMouseOver(index)}
      onMouseOut={handleMouseOut}
    >
      {collection.image && (
        <Image
          alt={collection.image.altText || collection.title}
          aspectRatio="1/1"
          data={collection.image}
          loading={index < 3 ? 'eager' : undefined}
          className={
            hoveredIndex === index ? 'darken-image-sm' : 'darken-image'
          }
        />
      )}
      <div className="center-text flex justify-center items-center gap-2">
        <span
          className={`relative ${
            hoveredIndex === index ? 'show rotate-animation' : 'hidden'
          }`}
        >
          *
        </span>
        <h2
          className={hoveredIndex === index ? 'collection-text' : 'text-stroke'}
        >
          {collection.title}
        </h2>
      </div>
    </Link>
  );
}

const COLLECTIONS_QUERY = `#graphql
  fragment Collection on Collection {
    id
    title
    handle
    image {
      id
      url
      altText
      width
      height
    }
  }
  query StoreCollections(
    $country: CountryCode
    $endCursor: String
    $first: Int
    $language: LanguageCode
    $last: Int
    $startCursor: String
  ) @inContext(country: $country, language: $language) {
    collections(
      first: $first,
      last: $last,
      before: $startCursor,
      after: $endCursor
    ) {
      nodes {
        ...Collection
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;
